var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ObjectType, Field, Int } from "type-graphql";
import Company from "./company.model.js";
let Intern = class Intern {
};
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], Intern.prototype, "id", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], Intern.prototype, "name", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], Intern.prototype, "time_working", void 0);
__decorate([
    Field(() => Company),
    __metadata("design:type", Company)
], Intern.prototype, "company", void 0);
Intern = __decorate([
    ObjectType()
], Intern);
export default Intern;
//# sourceMappingURL=intern.model.js.map