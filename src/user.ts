import { LevelDB } from "./leveldb"
import WriteStream from 'level-ws'
import { callbackify } from "util"

export class User {
    public username: string
    public email: string
    private password: string 
    public active : boolean
  
    constructor(username: string, email: string, password: string) {
        this.username = username
        this.email = email
        this.password = password
        this.active = false
    }

    //find a user
    static fromDb(username: string, value: any): User {
        const [password, email] = value.split(":")
        return new User(username, email, password)
    }
    
    //Get & Set
    public setPassword(toSet: string): void {
        this.password=toSet
    }
    
    public getPassword(): string {
        return this.password
    }
    
    public validatePassword(toValidate: String): boolean {
        // return comparison with hashed password
        return this.password == toValidate
    }

}

export class UserHandler {
    public db: any
  
    public get(username: string, callback: (err: Error | null, result?: User) => void) {
        this.db.get(`user:${username}`, function (err: Error, data: any) {
            if (err) {
                callback(err)
            }
            else if (data === undefined) {
                callback(null, data)
            }
            else {
                callback(null, User.fromDb(username, data))
            }
        })
    }
    public getAll(callback: (err: Error | null, result?: User[]) => void) {
        var result = new Array();
		console.log("lelele")
		const rs = this.db.createReadStream()
			.on('data', function (data) {
				result.push(data)
			})
			.on('error', function (err) {
				console.log('Oh my!', err)
			})
			.on('close', function () {
				console.log('Stream closed')
			})
			.on('end', function () {
				console.log('Stream ended')
				callback(null, result);

			})
    }
    /*public getActive(callback: (err: Error | null, result?: User) => void) {
        this.db.get(`active:true`, function (err: Error, data: any) {
            if (err) {
                callback(err)
            }
            else if (data === undefined) {
                callback(null, data)
            }
            else {
                callback(null, User.fromDb(username, data))
            }
        })
    }*/
  
    public save(user: User, callback: (err: Error | null) => void) {
        this.db.put(`user:${user.username}`, `${user.getPassword()}:${user.email}`, (err: Error | null) => {
            callback(err)
        })
    }
  
    /*public delete(username: string, callback: (err: Error | null) => void) {
        // TODO
    }*/
  
    //open the DB
    constructor(path: string) {
        this.db = LevelDB.open(path)
    }
  }