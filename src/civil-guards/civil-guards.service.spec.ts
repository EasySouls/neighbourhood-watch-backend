// import { Test, TestingModule } from '@nestjs/testing';
// import { mockDeep } from 'jest-mock-extended';
// import { PrismaService } from 'nestjs-prisma';
// import { CivilGuardsService } from './civil-guards.service';
// import { Prisma } from '@prisma/client';

// describe('CivilGuardsService', () => {
//   let service: CivilGuardsService;
//   const mockPrismaService = mockDeep<PrismaService>();

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       // TODO - Need to mock the PrismaService
//       providers: [
//         CivilGuardsService,
//         {
//           provide: PrismaService,
//           useValue: mockPrismaService,
//         },
//       ],
//       //controllers: [UsersController],
//     }).compile();

//     service = module.get<CivilGuardsService>(CivilGuardsService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should find all users', async () => {
//     mockPrismaService.civilGuard.findMany.mockReturnValueOnce();
//     const result = await service.findAll();
//     expect(result).toEqual([]);
//   });

//   it('should create a user', async () => {
//     const civilGuard: Prisma.CivilGuardCreateInput = {};

//     const result = await service.create(civilGuard);
//     expect(result).toEqual(civilGuard);
//   });
// });
