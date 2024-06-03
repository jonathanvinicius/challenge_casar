import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
	@IsNotEmpty({ message: 'content is required' })
	content: string;
	media: string;
	author: string;
	createdAt: Date;
}
