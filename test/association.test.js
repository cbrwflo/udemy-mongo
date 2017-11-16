const expect = require('expect');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yes it is' });
    comment = new Comment({ content: 'Congrats on great post' });

    // implicit mongoose associations, using ES6 setters
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        expect(user.blogPosts[0].title).toBe('JS is Great');
        done();
      })
      .catch((e) => done(e));
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        expect(user.name).toBe('Joe');
        expect(user.blogPosts[0].title).toBe('JS is Great');
        expect(user.blogPosts[0].comments[0].content).toBe('Congrats on great post');
        expect(user.blogPosts[0].comments[0].user.name).toBe('Joe');
        done();
      })
      .catch((e) => done(e));
  });
});
