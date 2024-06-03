import { Controller, Post, Body, Param } from '@nestjs/common';
import { CreatePostUseCase } from '../useCase/create.post.useCase';
import { CreatePostDto } from '../dto/create.post.dto';

@Controller('post')
export class PostController {
	constructor(private readonly createPostUseCase: CreatePostUseCase) {}

	@Post('/:author')
	save(@Body() post: CreatePostDto, @Param('author') author: string) {
		return this.createPostUseCase.save({ ...post, author });
	}
}
