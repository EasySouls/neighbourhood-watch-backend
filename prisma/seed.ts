import { Department, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // Drop the tables before seeding the database
  await prisma.civilGuard.deleteMany();
  await prisma.account.deleteMany();
  await prisma.civilGuardsOnDuties.deleteMany();
  await prisma.department.deleteMany();

  // Departments
  const departments: Department[] = [];
  for (let i = 0; i < 10; ++i) {
    const department: Department = {
      id: faker.string.uuid(),
      name: faker.company.name(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    departments.push(department);
  }
  await prisma.department.createMany({ data: departments });

  // Accounts with Civil Guards, connected to departments
  for (let i = 0; i < 30; i++) {
    const email = faker.internet.email();
    const name = faker.person.fullName();
    await prisma.account.create({
      data: {
        id: faker.string.uuid(),
        name: name,
        email: email,
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        civilGuards: {
          create: [
            {
              name: name,
              Department: { connect: { id: departments[randomInt(9)].id } },
              id: faker.string.uuid(),
              createdAt: new Date(),
              authCode: randomInt(999999),
            },
          ],
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
