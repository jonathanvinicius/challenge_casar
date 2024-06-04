import { Controller, Post, Body, Param, Query, Get } from '@nestjs/common';
import { CreatePostDto } from '../dto/create.post.dto';
import { CreatePostUseCase } from '../useCase/createPost/create.post.useCase';
import { GetPostUseCase } from '../useCase/getPost/get.post.useCase';

@Controller('post')
export class PostController {
	constructor(
		private readonly createPostUseCase: CreatePostUseCase,
		private readonly getPostUseCase: GetPostUseCase,
	) {}

	@Post('/:author')
	async save(@Body() post: CreatePostDto, @Param('author') author: string) {
		return this.createPostUseCase.save({ ...post, author });
	}

	@Get()
	async get(@Query('page') page: number, @Query('limit') limit: number, @Query('id') id: string) {
		return this.getPostUseCase.get({ page, limit, id });
	}
}
