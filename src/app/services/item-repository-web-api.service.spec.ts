import { TestBed } from '@angular/core/testing';

import { ItemRepositoryWebApiService } from './item-repository-web-api.service';

describe('ItemRepositoryWebApiService', () => {
  let service: ItemRepositoryWebApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemRepositoryWebApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
