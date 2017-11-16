const expect = require('expect');
const User = require('./../src/user');

describe('Virtual types', () => {
  it('postCount returns number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'My Post Title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(joe.postCount).toBe(1);
        done();
      })
      .catch((e) => done(e));
  });
});
