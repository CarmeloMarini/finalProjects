import 'chai'
import { expect } from 'chai'
import { Metric, MetricsHandler } from './metrics'
import { LevelDB } from "./leveldb"

const dbPath: string = 'db_test'
var dbMet: MetricsHandler




describe('Metrics', function () {
  before(function () {
    LevelDB.clear(dbPath)
    dbMet = new MetricsHandler(dbPath)
  })

  describe('#getAll', function () {
    it('should get empty array on non existing group', function () {
      dbMet.getTodos(function (err: Error | null, result?: Metric[]) {
        expect(err).to.be.null
        expect(result).to.not.be.undefined
        expect(result).to.be.empty
      })
    })
  })
  /*describe('#getOne', function () {
    it('should get empty array on non existing group', function () {
      dbMet.getOne( function (err: Error | null, result?: Metric[]) {
        expect(err).to.be.null
        expect(result).to.not.be.undefined
        expect(result).to.be.empty
      })
    })
  })*/

  after(function () {
    dbMet.db.close()
  })

  
})

describe('Save', function () {
  var metrics = new Array()

  before(function () {
    LevelDB.clear(dbPath)
    
    dbMet = new MetricsHandler(dbPath)
    var met1 : Metric
    var met2 : Metric
    var met3 : Metric
    met1 = new Metric("Alfred", "testAlfred1", 1),
    met2 =new Metric("Ming", "testMing1", 1),
    met3 =new Metric("Edgar", "testEdgar1", 1),
    metrics.push(met1)
    metrics.push(met2)
    metrics.push(met3)
  })

  describe('#save', function () {
    it('test Save', function (done) {
      dbMet.save(metrics, function (error: Error | null) {  
        expect(error).to.be.undefined
        done()
      })
    })
  })

  after(function () {
    dbMet.db.close()
  })

  
})
