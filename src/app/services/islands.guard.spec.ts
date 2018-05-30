import { TestBed, async, inject } from '@angular/core/testing';

import { IslandsGuard } from './islands.guard';

describe('IslandsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IslandsGuard]
    });
  });

  it('should ...', inject([IslandsGuard], (guard: IslandsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
