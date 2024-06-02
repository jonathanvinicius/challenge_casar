import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty({ message: 'username is required' })
	@Length(1, 14, { message: 'username must be between 1 and 14 characters' })
	username: string;

	createdAt: Date;
}
