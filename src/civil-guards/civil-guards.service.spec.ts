import { Test, TestingModule } from '@nestjs/testing';
import { CivilGuardsService } from './civil-guards.service';

describe('CivilGuardsService', () => {
  let service: CivilGuardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CivilGuardsService],
    }).compile();

    service = module.get<CivilGuardsService>(CivilGuardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
