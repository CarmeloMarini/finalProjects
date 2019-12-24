import 'chai'
import { expect } from 'chai'
import { User, UserHandler } from '../user'
import { LevelDB } from "../leveldb"

const dbPath: string = 'db_test'
var dbUser: UserHandler

describe('Users', function () {
    before(function () {
      LevelDB.clear(dbPath)
      dbUser = new UserHandler(dbPath)
    })
  
    describe('#getAll', function () {
      it('should get empty array on non existing group', function () {
        dbUser.getAll(function (err: Error | null, result?: User[]) {
          expect(err).to.be.null
          expect(result).to.not.be.undefined
          expect(result).to.be.empty
        })
      })
    })
  
    after(function () {
      dbUser.db.close()
    })
  
    
  })