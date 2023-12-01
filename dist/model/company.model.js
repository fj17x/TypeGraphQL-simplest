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
import Intern from "./intern.model.js";
let Company = class Company {
};
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    Field(() => [Intern]),
    __metadata("design:type", Array)
], Company.prototype, "interns", void 0);
Company = __decorate([
    ObjectType()
], Company);
export default Company;
//# sourceMappingURL=company.model.js.map