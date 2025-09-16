import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HealthDto {
  @Field(() => String)
  message: string;
}
