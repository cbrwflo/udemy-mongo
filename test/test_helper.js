const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test', {useMongoClient: true});
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Mongoose default connection error', error);
    });
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // ready to run the next test!
    done();
  });
});

// const users = [{
//   name: 'Joe',
//   }, {
//   name: 'Shandra',
// }];

// const seedUsers = (done) => {
//   User.remove({}).then(() => {
//     var userOne = new User(users[0]).save();
//     var userTwo = new User(users[1]).save();

//     return Promise.all([userOne, userTwo]);
//   }).then(() => done());
// };