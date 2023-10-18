import { TestBed } from '@angular/core/testing';

import { ItemRepositoryLocal } from './item-repository.service';

describe('ItemRepositoryService', () => {
  let service: ItemRepositoryLocal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemRepositoryLocal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
