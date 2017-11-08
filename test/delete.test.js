const expect = require('expect');
const User = require('./../src/user');

describe('Deletes records', () => {
  let joe;
  
  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(() => done())
      .catch((e) => done(e));
  });
    
  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user).toBe(null);
        done();
      })
      .catch((e) => done(e))
  });

  it('class method remove', (done) => {
    User.remove({ name: 'Joe' })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      expect(user).toBe(null)
      done();
    })
    .catch((e) => done(e));
  });
  
  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      expect(user).toBe(null)
      done();
    })
    .catch((e) => done(e));
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove({ _id: joe._id })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user).toBe(null)
        done();
      })
      .catch((e) => { done(e) });
  });
});