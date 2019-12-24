import 'chai'
import { expect } from 'chai'
import { Metric, MetricsHandler } from '../metrics'
import { User, UserHandler } from '../user'
import { LevelDB } from "../leveldb"
import { doesNotReject } from 'assert'

const dbPath: string = 'db_test'
var dbMet: MetricsHandler
var dbUser: UserHandler



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

  after(function () {
    dbMet.db.close()
  })
})

describe("User", function() {   
  before(function () {
    LevelDB.clear(dbPath)
    dbUser = new UserHandler(dbPath)
  })               
  describe("#save", function() {
      it("should save without error", function(done) {
          const user = new User("Bob", "bob@gmail.com", "1234");
          dbUser.save(user, (err) => {
              if (err) done(err);
              else done();
          });
      });
      it("should return an error", function(done) {
        dbUser.get("BLABLA", (err) => {
            if (err) done();
            else done(err);
        });
    });
  });
});
  



