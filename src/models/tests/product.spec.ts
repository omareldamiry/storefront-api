import { ProductStore, Product } from '../product';

const store = new ProductStore();

describe('Product model', () => {
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
    const product: Product = {
      name: 'Washing Machine',
      price: 700,
      category: 'Home Appliances'
    };

    describe('Index method', () => {
      it('should return an empty list', async () => {
        const products = await store.index();
        expect(products).toEqual([]);
      });
    });
    describe('Create method', () => {
      it('should create a new product', async () => {
        const newProduct = await store.create(product);
        product.id = newProduct.id;
        expect(newProduct.name).toEqual(product.name);
      });
    });
    describe('Show method', () => {
      it('should return an existing product', async () => {
        const fetchedProduct = await store.show(product.id || 1);
        expect(fetchedProduct.id).toEqual(product.id);
      });
    });
    describe('Update method', () => {
      it('should update an existing product', async () => {
        const updatedProduct = await store.update({
          id: product.id,
          name: 'Fridge',
          price: 700,
          category: 'Home Appliances'
        });
        expect(updatedProduct.name).toEqual('Fridge');
      });
    });
    describe('Delete method', () => {
      it('should delete and existing product', async () => {
        const deletedProduct = await store.delete(product.id || 1);
        expect(deletedProduct.id).toEqual(product.id);
      });
    });
  });
});
