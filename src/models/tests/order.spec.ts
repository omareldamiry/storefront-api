import { Order, OrderStore } from '../order';
import { UserStore } from '../user';

const store = new OrderStore();
const userStore = new UserStore();

describe('Order model', () => {
  describe('Method definition', () => {
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
    const order: Order = {
      product_ids: [],
      product_quantities: [],
      status: 'active',
      user_id: 0
    };
    beforeAll(async () => {
      const newUser = await userStore.create({
        firstname: 'test',
        lastname: 'test',
        username: 'test',
        password: 'test'
      });
      /* eslint-disable */
      order.user_id = newUser.id!;
      /* eslint-enable */
    });
    describe('Show method', () => {
      it('should fetch orders by a specific user', async () => {
        const orders = await store.show(order.user_id);
        expect(orders).toEqual([]);
      });
    });
    describe('Create method', () => {
      it('should add and return a new order', async () => {
        const newOrder = await store.create(order);
        order.id = newOrder.id;
        expect(newOrder.status).toEqual(order.status);
      });
    });
    describe('Update method', () => {
      it('should update an existing order', async () => {
        const updatedOrder = await store.update({
          id: order.id,
          product_ids: order.product_ids,
          product_quantities: order.product_quantities,
          status: 'complete',
          user_id: 1
        });
        expect(updatedOrder.status).toEqual('complete');
      });
    });
    describe('Delete method', () => {
      it('should delete an existing order', async () => {
        /* eslint-disable */
        const deletedOrder = await store.delete(order.id!);
        /* eslint-enable */
        expect(deletedOrder.id).toEqual(order.id);
      });
    });
    afterAll(async () => {
      await userStore.delete(order.user_id);
    });
  });
});
