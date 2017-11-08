const expect = require('expect');
const User = require('./../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync(); //synchronous
    expect(validationResult.errors.name.message).toBe('Name is required.');
 });

 it('requires a user name longer than 2 characters', () => {
  const user = new User({ name: 'Al' });
  const validationResult = user.validateSync(); //synchronous
  expect(validationResult.errors.name.message).toBe('Name must be longer than 2 characters.');
 });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
    .catch((validationResult) => {
      expect(validationResult.errors.name.message).toBe('Name must be longer than 2 characters.');
      done();
    });
  });
});