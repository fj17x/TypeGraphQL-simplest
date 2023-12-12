import { ObjectType, Field, Int } from "type-graphql"
import Intern from "./intern.model.js"

@ObjectType()
export default class Company {
  @Field(() => Int)
  id: number
  @Field(() => String)
  name: string
  @Field(() => [Intern])
  interns: Intern[] //this is typescript
}

// const typeDefs = gql`
//   type Intern {
//     id: Int!
//     name: String!
//     timeWorking: Int!
//     company: Company!
//   }

//   type Company {
//     name: String!
//     interns: [Intern!]
//   }

//   type Query {
//     internByID(id: Int!): Intern
//     companies: [Company!]!
//     interns: [Intern!]!
//     internsByCompany(companyName: String!): [Intern!]!
//   }

//   type mutation {
//     changeCompanyIntern(id: Int!, toCompany: String!): [Intern!]!
//   }
// `
