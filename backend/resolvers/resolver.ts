import { Resolver, Query, Arg, Int, Mutation } from "type-graphql"
import Intern from "../model/intern.model.js"
import Company from "../model/company.model.js"
import { client } from "../utils/db.js"

@Resolver()
export default class AllResolver {
  @Query(() => String)
  hello(): string {
    return "hello world"
  }

  @Query(() => [Company])
  async companies(): Promise<Company[] | undefined> {
    const result = await client.query("SELECT * from companies;")
    return result.rows
  }
  @Query(() => Intern)
  async internById(@Arg("id", () => Int) id: number): Promise<Intern | undefined> {
    const result = await client.query("SELECT * from interns where id=$1", [id])
    return result.rows[0]
  }

  @Query(() => [Intern])
  async interns(): Promise<Intern[] | undefined> {
    const result = await client.query("SELECT * from interns")
    return result.rows
  }

  @Query(() => [Intern])
  async internsByCompany(@Arg("companyName") companyName: string): Promise<Intern[] | undefined> {
    const result = await client.query("SELECT * from interns where company=$1", [companyName])
    return result.rows
  }

  @Mutation(() => [Intern])
  async changeCompanyIntern(
    @Arg("id", () => Int) id: number,
    @Arg("toCompany", () => Int) toCompany: number
  ): Promise<Intern[] | undefined> {
    //TODO- update in companies too.
    try {
      const result = await client.query("UPDATE interns SET company_id = $1 WHERE id = $2 RETURNING *", [toCompany, id])

      if (result.rows.length === 0) {
        return undefined // Intern with the given ID doesn't exist
      }

      return result.rows // Return the updated Intern
    } catch (error) {
      console.error("Error updating company:", error)
      return undefined // Return undefined if there's an error
    }
  }
}

// const typeDefs = gql`

//   type Query {
//     internById(id: Int!): Intern
//     companies: [Company!]!
//     interns: [Intern!]!
//     internsByCompany(companyName: String!): [Intern!]!
//   }

//   type mutation {
//     changeCompanyIntern(id: Int!, toCompany: String!): [Intern!]!
//   }
// `
