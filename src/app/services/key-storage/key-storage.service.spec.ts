import { TestBed } from '@angular/core/testing';

import { KeyStorageService } from './key-storage.service';

describe('VaultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeyStorageService = TestBed.get(KeyStorageService);
    expect(service).toBeTruthy();
  });
});
