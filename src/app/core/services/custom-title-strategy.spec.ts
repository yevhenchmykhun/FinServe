import { TestBed } from '@angular/core/testing';

import { CustomTitleStrategy } from './custom-title-strategy';

describe('CustomTitleStrategy', () => {
  let strategy: CustomTitleStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    strategy = TestBed.inject(CustomTitleStrategy);
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });
});
