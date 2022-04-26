import { UserStore, User } from '../user';

const store = new UserStore();

describe('User model', () => {
  describe('Method definition', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });

    it('should have an update method', () => {
      expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(store.delete).toBeDefined();
    });
  });

  describe('Method execution', () => {
    const user: User = {
      username: 'omar',
      firstname: 'Omar',
      lastname: 'Eldamiry',
      password: 'pass123'
    };

    describe('Index method', () => {
      it('should return an empty list', async () => {
        const users = await store.index();
        expect(users).toEqual([]);
      });
    });

    describe('Create method', () => {
      it('should create a new user with valid data', async () => {
        const newUser = await store.create(user);
        user.id = newUser.id;
        expect(newUser.username).toEqual(user.username);
      });
    });

    describe('Show method', () => {
      it('should fetch a user by username', async () => {
        const fetchedUser = await store.show(user.username);
        expect(fetchedUser.id).toEqual(user.id);
      });
    });

    describe('Update method', () => {
      it("should update a user's first and last name", async () => {
        const updatedUser = await store.update({
          id: user.id,
          username: user.username,
          firstname: 'John',
          lastname: 'Doe',
          password: user.password
        });
        expect(updatedUser.firstname).toEqual('John');
      });
    });

    describe('Delete method', () => {
      it('should delete an existing user', async () => {
        const deletedUser = await store.delete(user.id as number);
        expect(deletedUser.username).toEqual(user.username);
      });
    });
  });
});
