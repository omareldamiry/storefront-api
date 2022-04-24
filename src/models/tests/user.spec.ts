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
    });

    describe('Query execution', () => {
        it('should return a list when calling index', async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        });

        it('should add and return a new user', async () => {
            const newUser: User = {
                username: 'omar',
                firstname: 'Omar',
                lastname: 'Eldamiry',
                password: 'pass123'
            };

            const result = await store.create(newUser);
            expect(result.username).toBe('omar');
        });
    });
});