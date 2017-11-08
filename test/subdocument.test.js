const expect = require('expect');
const User = require('./../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe', 
      posts: [{ title: 'myPostTitle' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.posts[0].title).toBe('myPostTitle');
        done();
      }).catch((e) => done(e));
  });

  it('Can add documents to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' })) // same as .then(() => { return User.findOne() }), which returns a Promise
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() =>  User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.posts[0].title).toBe('New Post');
        done();
      })
      .catch((e) => done(e));
  });

  it('Can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        const post = user.posts[0];
        post.remove(); //mongoose syntactic sugar; only acts on local (must call save())
        return user.save();
      })
      .then(() =>  User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.posts.length).toBe(0);
        done();
      })
      .catch((e) => done(e));
  });
});