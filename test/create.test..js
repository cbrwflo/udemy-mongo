const expect = require('expect');
const User = require('./../src/user');

describe('Create records', () => {
  it('saves a user', (done) => {
    const joe = new User({name: 'Joe'});
    
    joe.save()
      .then(() => {
        expect(joe.isNew).toBe(false);
        done();
      })
      .catch((e) => { done(e) });
  });
});