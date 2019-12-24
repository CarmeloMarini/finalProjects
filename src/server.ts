import express = require('express')
import { MetricsHandler, Metric } from './metrics'
import { UserHandler, User } from './user'
//session
import session = require('express-session')
import levelSession = require('level-session-store')
import { endianness } from 'os'

//app
const app = express()
const port: string = process.env.PORT || '8081'
///path
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
//parser
var bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
//session
const LevelStore = levelSession(session)
const dbUser: UserHandler = new UserHandler('./db/users')


//session
app.use(session({
    secret: 'my very secret phrase',
    store: new LevelStore('./db/sessions'),
    resave: true,
    saveUninitialized: true
}))

//authCheck
const authCheck = function (req: any, res: any, next: any) {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/login')
    }
} 

///MAINPAGE
app.get('/', (req: any, res: any) => {
    res.render('mainpage.ejs')
})
app.get('/users.json', (req: any, res: any) => {
    dbUser.getAll((err: Error | null, result?: any) => {
        if (err) throw err
		res.json(result)
	})
})
app.get('/home', authCheck, (req: any, res: any) => {
    res.render('hello.ejs', { name: req.session.user.username })
})

//LOGIN & SIGNUP
const authRouter = express.Router()
authRouter
//login
.get('/login', (req: any, res: any) => {
    res.render('login.ejs')
})
.post('/login', (req: any, res: any, next: any) => {
    dbUser.get(req.body.username, (err: Error | null, result?: User) => {
        if (err) {
            res.redirect('/home')
        }
        else if (result === undefined || !result.validatePassword(req.body.password)) {
            delete req.session.loggedIn
            delete req.session.user
            res.redirect('/login')
        } else {
            req.session.loggedIn = true
            req.session.user = result
            res.redirect('/home')

        }
    })
})
//signup
.get(
    '/signup', 
    (req: any, res: any) => { res.render('signup.ejs')}
)
.post('/signup', (req: any, res: any, next: any) => {
    dbUser.save(new User(req.body.username, req.body.email, req.body.password), (err: Error | null, result?: User) => {
        if (err) next(err)
        if (result === undefined || !result.validatePassword(req.body.password)) {
            res.redirect('/login')
        } else {
            res.redirect('/signup')
        }
    })
})
//logout
.get('/logout', (req: any, res: any) => {
    delete req.session.loggedIn
    delete req.session.user
    res.redirect('/')
})
app.use(authRouter)




///METRICS
const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')
// post fct 
app.post('/metrics', authCheck, (req: any, res: any) => {
    var nw = new Metric(req.session.user.username, req.body.tag, req.body.value);
    var temp = new Array()
    temp.push(nw)
	dbMet.save(temp, (err: Error | null) => {
		if (err) throw err
		res.redirect('/home')
	})
})

// get fct by user (all)
app.get('/metrics', authCheck, (req: any, res: any) => {
	dbMet.getAll(req.session.user.username,(err: Error | null, result?: any) => {
        if (err) throw err
        console.log(req.params.usr)
		res.end(JSON.stringify(result))
	})
})
// get fct for targeted metrics (one)
app.get('/metrics/:tag',authCheck, (req: any, res: any) => {
	dbMet.getOne(req.session.user.username,req.params.tag, (err: Error | null, result?: any) => {
		if (err) throw err
		res.end(JSON.stringify(result))
	})
})

// delete fct (one)
app.delete('/metrics/delete/:username/:tag', (req: any, res: any) => {
	dbMet.delOne(req.params.username,req.params.tag, (err: Error | null, result?: any) => {
        if (err) throw err
        res.end(JSON.stringify(result))

	})
})

///display
app.get('/metrics.json', (req: any, res: any) => {
	dbMet.getAll(req.session.user.username,(err: Error | null, result?: any) => {
        if (err) throw err
        console.log(result)
		res.json(result)
	})
})
/*app.get('/Ametrics.json', (req: any, res: any) => {
    console.log(req.body)
	dbMet.getOne(req.session.user.username, req.ToGet, (err: Error | null, result?: any) => {
        if (err) throw err
        console.log(result)
		res.json(result)
	})
})*/


//userRouter
const userRouter = express.Router()
userRouter.post('/', (req: any, res: any, next: any) => {
    dbUser.get(req.body.username, function (err: Error | null, result?: User) {
        if (!err || result !== undefined) {
            res.status(409).send("user already exists")
        } else {
            dbUser.save(req.body, function (err: Error | null) {
                if (err) next(err)
                else res.status(201).send("user persisted")
            })
        }
    })
})
userRouter.get('/:username', (req: any, res: any, next: any) => {
    dbUser.get(req.params.username, function (err: Error | null, result?: User) {
        if (err || result === undefined) {
            res.status(404).send("user not found")
        } else res.status(200).json(result) 
    })
})
app.use('/user', userRouter)





//LISTEN
app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})