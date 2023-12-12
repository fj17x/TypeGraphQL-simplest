var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import Intern from "../model/intern.model.js";
import Company from "../model/company.model.js";
import { client } from "../utils/db.js";
let AllResolver = class AllResolver {
    hello() {
        return "hello world";
    }
    async companies() {
        const result = await client.query("SELECT * from companies;");
        return result.rows;
    }
    async internById(id) {
        const result = await client.query("SELECT * from interns where id=$1", [id]);
        return result.rows[0];
    }
    async interns() {
        const result = await client.query("SELECT * from interns");
        return result.rows;
    }
    async internsByCompany(companyName) {
        const result = await client.query("SELECT * from interns where company=$1", [companyName]);
        return result.rows;
    }
    async changeCompanyIntern(id, toCompany) {
        try {
            const result = await client.query("UPDATE interns SET company_id = $1 WHERE id = $2 RETURNING *", [toCompany, id]);
            if (result.rows.length === 0) {
                return undefined;
            }
            return result.rows;
        }
        catch (error) {
            console.error("Error updating company:", error);
            return undefined;
        }
    }
};
__decorate([
    Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AllResolver.prototype, "hello", null);
__decorate([
    Query(() => [Company]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AllResolver.prototype, "companies", null);
__decorate([
    Query(() => Intern),
    __param(0, Arg("id", () => Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AllResolver.prototype, "internById", null);
__decorate([
    Query(() => [Intern]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AllResolver.prototype, "interns", null);
__decorate([
    Query(() => [Intern]),
    __param(0, Arg("companyName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AllResolver.prototype, "internsByCompany", null);
__decorate([
    Mutation(() => [Intern]),
    __param(0, Arg("id", () => Int)),
    __param(1, Arg("toCompany", () => Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AllResolver.prototype, "changeCompanyIntern", null);
AllResolver = __decorate([
    Resolver()
], AllResolver);
export default AllResolver;
//# sourceMappingURL=resolver.js.map