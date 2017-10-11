const expect = require('expect');
const User = require('./../src/user');

describe('Reads user records', () => {
  let joe;

  beforeEach(() => {
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it('finds all users named joe', (done) => {  
    User.find({ name: 'Joe' })
      .then((users) => {
        console.log('Users: '+ users);
        // expect(users[0]._id.toString()).toBe(joe._id.toString());
        done();
      });
      // .catch((e) => { done(e) });
  });

  // it('finds a user with a particular id', (done) => {
  //   User.findOne({ _id: joe._id})
  //     .then((user) => {
  //       console.log('User: '+ users);
  //       expect(0).toEqual(0);
  //       // expect(user[0].name).toBe(joe.name);
  //       done();
  //     });
  //     // .catch((e) => { done(e) });
  // });
});