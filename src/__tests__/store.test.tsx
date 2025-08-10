import { store } from '../store/store';

describe('store', () => {
  test('store is created without errors and has basic methods', () => {
    expect(store).toBeDefined();
    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.getState).toBe('function');
    expect(typeof store.subscribe).toBe('function');
  });
});
