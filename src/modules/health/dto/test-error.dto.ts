import { IsNotEmpty, MinLength } from 'class-validator';

export class TestErrorDto {
  @MinLength(5, {
    message: 'The test field must be at least 5 characters long',
  })
  @IsNotEmpty({ message: 'The test field must not be empty' })
  test: string;
}
