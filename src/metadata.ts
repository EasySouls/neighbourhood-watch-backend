/* eslint-disable */
export default async () => {
  const t = {
    ['./accounts/entity/account.entity']: await import('./accounts/entity/account.entity'),
    ['./departments/entities/department.entity']: await import('./departments/entities/department.entity'),
    ['./duties/entities/duty.entity']: await import('./duties/entities/duty.entity'),
    ['./civil-guards/entities/civil-guard.entity']: await import('./civil-guards/entities/civil-guard.entity'),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./civil-guards/entities/civil-guard.entity'),
          {
            CivilGuard: {
              id: { required: true, type: () => String },
              name: { required: true, type: () => String },
              roles: { required: true, type: () => [Object] },
              accountId: { required: false, type: () => String },
              departmentId: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [import('./civil-guards/dto/create-civil-guard.dto'), { CreateCivilGuardDto: {} }],
        [import('./civil-guards/dto/update-civil-guard.dto'), { UpdateCivilGuardDto: {} }],
        [
          import('./departments/entities/department.entity'),
          {
            Department: {
              id: { required: true, type: () => String },
              name: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: false, type: () => Date },
            },
          },
        ],
        [import('./departments/dto/create-department.dto'), { CreateDepartmentDto: {} }],
        [import('./departments/dto/update-department.dto'), { UpdateDepartmentDto: {} }],
        [
          import('./duties/entities/duty.entity'),
          {
            Duty: {
              id: { required: true, type: () => String },
              name: { required: true, type: () => String },
              description: { required: true, type: () => String },
              startDate: { required: true, type: () => Date },
              endDate: { required: false, type: () => Date },
              type: { required: true, type: () => Object },
              plateNumber: { required: false, type: () => String },
              departmentId: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: false, type: () => Date },
            },
          },
        ],
        [import('./duties/dto/create-duty.dto'), { CreateDutyDto: {} }],
        [import('./duties/dto/update-duty.dto'), { UpdateDutyDto: {} }],
        [
          import('./accounts/entity/account.entity'),
          {
            Account: {
              id: { required: true, type: () => String },
              name: { required: true, type: () => String },
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: false, type: () => Date },
            },
          },
        ],
        [
          import('./accounts/dto/create-account.dto'),
          { CreateAccountDto: { civilGuardId: { required: true, type: () => String } } },
        ],
        [
          import('./auth/dto/login.dto'),
          {
            LoginDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./auth/dto/validateCode.dto'),
          {
            ValidateCodeDto: {
              code: { required: true, type: () => Number },
              email: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./auth/dto/signup.dto'),
          {
            SignUpDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
              authCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./civil-guards/entities/civil-guard-complete.entity'),
          {
            CivilGuardComplete: {
              account: { required: true, type: () => t['./accounts/entity/account.entity'].Account },
              department: { required: true, type: () => t['./departments/entities/department.entity'].Department },
              duties: { required: true, type: () => [t['./duties/entities/duty.entity'].Duty] },
            },
          },
        ],
      ],
      controllers: [
        [import('./app.controller'), { AppController: { getHello: { type: String } } }],
        [
          import('./civil-guards/civil-guards.controller'),
          {
            CivilGuardsController: {
              create: { type: t['./civil-guards/entities/civil-guard.entity'].CivilGuard },
              findAll: { type: [t['./civil-guards/entities/civil-guard.entity'].CivilGuard] },
              findAllByDepartmentID: { type: [t['./civil-guards/entities/civil-guard.entity'].CivilGuard] },
              findAllOnActiveDutyByDepartmentID: { type: [t['./civil-guards/entities/civil-guard.entity'].CivilGuard] },
              findOne: { type: t['./civil-guards/entities/civil-guard.entity'].CivilGuard },
              update: { type: t['./civil-guards/entities/civil-guard.entity'].CivilGuard },
              remove: { type: t['./civil-guards/entities/civil-guard.entity'].CivilGuard },
            },
          },
        ],
        [
          import('./departments/departments.controller'),
          {
            DepartmentsController: {
              create: { type: t['./departments/entities/department.entity'].Department },
              findAll: { type: [t['./departments/entities/department.entity'].Department] },
              findOne: { type: t['./departments/entities/department.entity'].Department },
              update: { type: t['./departments/entities/department.entity'].Department },
              remove: { type: t['./departments/entities/department.entity'].Department },
            },
          },
        ],
        [
          import('./duties/duties.controller'),
          {
            DutiesController: {
              startDuty: { type: t['./duties/entities/duty.entity'].Duty },
              stopDuty: { type: t['./duties/entities/duty.entity'].Duty },
              findAll: { type: [t['./duties/entities/duty.entity'].Duty] },
              findAllByDepartmentId: { type: [t['./duties/entities/duty.entity'].Duty] },
              findAllActiveByDepartmentId: { type: [t['./duties/entities/duty.entity'].Duty] },
              findOne: { type: t['./duties/entities/duty.entity'].Duty },
              update: { type: t['./duties/entities/duty.entity'].Duty },
              remove: { type: t['./duties/entities/duty.entity'].Duty },
              findAllByCivilGuardId: { type: [t['./duties/entities/duty.entity'].Duty] },
              findOwnActive: { type: t['./duties/entities/duty.entity'].Duty },
            },
          },
        ],
        [
          import('./auth/auth.controller'),
          {
            AuthController: {
              login: {},
              signUp: {},
              validateCode: {},
              getProfile: { type: t['./civil-guards/entities/civil-guard.entity'].CivilGuard },
            },
          },
        ],
      ],
    },
  };
};
