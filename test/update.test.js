const expect = require('expect');
const User = require('./../src/user');

describe('Updates user records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => done())
      .catch((e) => done(e));
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        expect(users.length).toBe(1);
        expect(users[0].name).toBe('Alex');
        done();
      })
      .catch((e) => { done(e); });
  }

  it('instance type can set n save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('model instance can update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('model class can update', (done) => {
    assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can find a findRecordByIdAndUpdate', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  it('A user can have their likes incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 }})
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.likes).toBe(1);
        done();
      }).catch((e) => done(e));
  });
});
