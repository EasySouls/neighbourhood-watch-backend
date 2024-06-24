import { Test, TestingModule } from '@nestjs/testing';
import { CivilGuardsController } from './civil-guards.controller';
import { CivilGuardsService } from './civil-guards.service';

describe('CivilGuardsController', () => {
  let controller: CivilGuardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CivilGuardsController],
      providers: [CivilGuardsService],
    }).compile();

    controller = module.get<CivilGuardsController>(CivilGuardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
