const expect = require('expect');
const User = require('./../src/user');

describe('Reads user records', () => {
  let joe, maria, alex, zach;

  beforeEach((done) => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe'});
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

    Promise
      .all([alex.save(), joe.save(), maria.save(), zach.save()])
      .then(() => done())
      .catch((e) => done(e));
  });

  it('find all users named joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        expect(users[0]._id.toString()).toBe(joe._id.toString());
        done();
      })
      .catch((e) => { done(e); });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id})
      .then((user) => {
        expect(user.name).toBe(joe.name);
        expect(user._id.toString()).toBe(joe._id.toString());
        done();
      })
      .catch((e) => { done(e); });
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(2)
      .limit(2)
      .then((users) => {
        expect(users.length).toBe(2);
        expect(users[0].name).toBe('Maria');
        expect(users[1].name).toBe('Zach');
        done();
      })
      .catch((e) => done(e));
  });
});
