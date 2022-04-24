import { OrderStore } from '../order';

const store = new OrderStore();

describe('Order model', () => {
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
});