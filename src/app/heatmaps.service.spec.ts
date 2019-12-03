import { TestBed } from '@angular/core/testing';

import { HeatmapsService } from './heatmaps.service';

describe('HeatmapsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeatmapsService = TestBed.get(HeatmapsService);
    expect(service).toBeTruthy();
  });
});
