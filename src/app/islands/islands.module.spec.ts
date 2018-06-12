import { IslandsModule } from './islands.module';

describe('IslandsModule', () => {
  let islandsModule: IslandsModule;

  beforeEach(() => {
    islandsModule = new IslandsModule();
  });

  it('should create an instance', () => {
    expect(islandsModule).toBeTruthy();
  });
});
