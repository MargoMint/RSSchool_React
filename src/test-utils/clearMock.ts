export const setupLocalStorageMock = () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
};
