import { ObjectType, Field, Int } from "type-graphql"
import Company from "./company.model.js"

@ObjectType()
export default class Intern {
  @Field(() => Int)
  id: number
  @Field(() => String)
  name: string
  @Field(() => Int)
  time_working: number
  @Field(() => Company)
  company: Company
}
