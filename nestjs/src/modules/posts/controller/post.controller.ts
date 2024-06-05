import { Controller, Post, Body, Param, Query, Get } from '@nestjs/common';
import { CreatePostDto } from '../dto/create.post.dto';
import { CreatePostUseCase } from '../useCase/createPost/create.post.useCase';
import { GetPostUseCase } from '../useCase/getPost/get.post.useCase';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
	constructor(
		private readonly createPostUseCase: CreatePostUseCase,
		private readonly getPostUseCase: GetPostUseCase,
	) {}

	@Post('/:author')
	@ApiOperation({ summary: 'Create new post' })
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		content: {
			'application/json': {
				examples: {
					enumValidationError: {
						summary: 'Invalid enum value',
						value: {
							statusCode: 400,
							message: 'type must be a valid enum value',
						},
					},
					postIdRequiredError: {
						summary: 'postId required',
						value: {
							statusCode: 400,
							message: 'postId is required for this type of post',
						},
					},
					repostCommentRequiredError: {
						summary: 'repostComment required',
						value: {
							statusCode: 400,
							message: 'repostComment is required for this type of post',
						},
					},
				},
			},
		},
	})
	@ApiBody({
		description: 'Create Follower Request Body',
		examples: {
			example1: {
				summary: 'RepostComment',
				description: 'create a repost type post',
				value: {
					content: 'Hello Comment',
					type: 'repostComment',
					postId: '665f929b8a281a9474b2d4af',
					repostComment: 'Repost comment',
				},
			},
			example2: {
				summary: 'Repost',
				description: 'create type repost',
				value: {
					content: 'Hello repost',
					type: 'repost',
					postId: '665f929b8a281a9474b2d4af',
				},
			},
			example3: {
				summary: 'Post',
				description: 'creatr post',
				value: {
					content: 'Hello post',
					type: 'post',
					postId: '665f929b8a281a9474b2d4af',
				},
			},
		},
	})
	async save(@Body() post: CreatePostDto, @Param('author') author: string) {
		return this.createPostUseCase.save({ ...post, author });
	}

	@Get()
	@ApiOperation({ summary: 'Get post' })
	@ApiOkResponse({
		content: {
			'application/json': {
				example: [
					{
						_id: '665f9f8879fa47498c1108de',
						content: 'Hello Comment',
						author: '665f89fcbf0a115d467b53c5',
						type: 'repostComment',
						postId: '665f929b8a281a9474b2d4af',
						repostComment: 'repost comment',
						createdAt: '2024-06-04T23:13:12.605Z',
						updatedAt: '2024-06-04T23:13:12.604Z',
					},
				],
			},
		},
	})
	@ApiQuery({ name: 'page', required: false, type: Number, description: 'number of the page being requested' })
	@ApiQuery({
		name: 'limit',
		required: false,
		type: Number,
		description: 'total number of records per pages (default value is 10)',
	})
	@ApiQuery({
		name: 'id',
		required: false,
		type: String,
		description: 'filter posts from past users followers',
	})
	async get(@Query('page') page: number, @Query('limit') limit: number, @Query('id') id: string) {
		return this.getPostUseCase.get({ page, limit, id });
	}
}
