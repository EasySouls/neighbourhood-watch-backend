/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./civil-guards/dto/create-civil-guard.dto"), { "CreateCivilGuardDto": {} }], [import("./civil-guards/dto/update-civil-guard.dto"), { "UpdateCivilGuardDto": {} }], [import("./civil-guards/entities/civil-guard.entity"), { "CivilGuard": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./civil-guards/civil-guards.controller"), { "CivilGuardsController": { "create": {}, "findAll": {}, "findAllByDepartmentID": {}, "findAllOnActiveDutyByDepartmentID": {}, "findOne": {}, "update": {}, "remove": {} } }]] } };
};