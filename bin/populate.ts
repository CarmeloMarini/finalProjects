import { Metric, MetricsHandler } from '../src/metrics'
import { User, UserHandler } from '../src/user'

// Metrics
const metrics = [
    new Metric("Alfred", "testAlfred1", 1),
    new Metric("Alfred", "testAlfred2", 2),
    new Metric("Ming", "testMing1", 1),
    new Metric("Ming", "testMing2", 2),
    new Metric("Jhon", "testJhon1", 1),
    new Metric("Jhon", "testJhon2", 2),
    new Metric("Edgar", "testEdgar1", 1),
    new Metric("Edgar", "testEdgar2", 2),
]

const db = new MetricsHandler('./db/metrics')

db.save(metrics, (err: Error | null) => {
  if (err) throw err
  console.log('Data populated')
})


// Users:
const Users = [
    new User("Alfred", "Alfred@gmail.com", "Apwd"),
    new User("Ming", "Ming@gmail.com", "Mpwd"),
    new User("Jhon", "Jhon@gmail.com", "Jpwd"),
    new User("Edgar", "Edgar@gmail.com", "Epwd"),

]

const db2 = new UserHandler('./db/users')
for (var i=0; i<4; i++){
    db2.save(Users[i], (err: Error | null) => {
        if (err) throw err
        console.log('User added')
      })
}
