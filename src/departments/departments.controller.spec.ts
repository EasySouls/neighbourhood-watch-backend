import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { PrismaService } from 'nestjs-prisma';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('DepartmentsController', () => {
  let controller: DepartmentsController;
  let service: DepartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [DepartmentsService, PrismaService],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === DepartmentsService) {
          return {
            findAll: jest.fn().mockResolvedValue(results),
          };
        }
        if (token === PrismaService) {
          return {
            department: {
              findMany: jest.fn().mockResolvedValue(results),
            },
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = await module.resolve<DepartmentsController>(DepartmentsController);
    service = await module.resolve<DepartmentsService>(DepartmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all departments', async () => {
    const result = [];
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await controller.findAll()).toBe(result);
  });
});
