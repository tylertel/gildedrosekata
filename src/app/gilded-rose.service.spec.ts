import { TestBed } from '@angular/core/testing';
import { GildedRoseService} from './gilded-rose.service';

describe('GildedRoseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GildedRoseService = TestBed.get(GildedRoseService);
    expect(service).toBeTruthy();
  });
});
