import { Test, TestingModule } from '@nestjs/testing';
import { DutiesController } from './duties.controller';
import { DutiesService } from './duties.service';

describe('DutiesController', () => {
  let controller: DutiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DutiesController],
      providers: [DutiesService],
    }).compile();

    controller = module.get<DutiesController>(DutiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
