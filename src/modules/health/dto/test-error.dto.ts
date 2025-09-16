import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class TestErrorDto {
  @Field(() => String, { description: 'Test string field' })
  @MinLength(5, {
    message: 'The test field must be at least 5 characters long',
  })
  @IsNotEmpty({ message: 'The test field must not be empty' })
  test: string;
}
