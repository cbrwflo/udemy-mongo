const mongoose = require('mongoose');
const expect = require('expect');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost, comment; 

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yes it is' });

    // implicit mongoose associations, using ES6 setters
    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('removing users removes blogposts', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        expect(count).toBe(0);
        done();
      })
      .catch((e) => done(e));
  });
});