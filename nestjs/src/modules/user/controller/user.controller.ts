import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CreateUserUseCase } from '../useCase/createUser/create.user.useCase';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetOneUserPostsUseCase } from '../useCase/getOneUserAndPosts/get.one.user.posts.useCase';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly getOneUserUseCase: GetOneUserPostsUseCase,
	) {}

	@Post()
	@ApiOperation({ summary: 'Create new user' })
	@ApiBody({
		description: 'Create User Request Body',
		examples: {
			example1: {
				summary: 'Create user',
				description: 'create user',
				value: {
					username: 'jonathanvini',
				},
			},
		},
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		content: {
			'application/json': {
				examples: {
					invalidSizeCharacters: {
						summary: 'Invalid lenght caracter',
						value: {
							statusCode: 400,
							message: 'username must be between 1 and 14 characters',
						},
					},
					userNameIsRequired: {
						summary: 'username is required',
						value: {
							statusCode: 400,
							message: 'username is required',
						},
					},
				},
			},
		},
	})
	@ApiCreatedResponse({
		content: {
			'application/json': {
				example: {
					username: 'Reina_Zieme67',
					_id: '665fbd5ccfb6030a6c07951c',
					createdAt: '04/06/2024',
				},
			},
		},
	})
	save(@Body() createUserDto: CreateUserDto) {
		return this.createUserUseCase.save(createUserDto);
	}

	@Get(':id')
	@ApiOperation({ summary: 'List user' })
	@ApiOkResponse({
		content: {
			'application/json': {
				example: [
					{
						_id: '665f94878a281a9474b2d4b2',
						username: 'Art.Schmeler',
						createdAt: '04/06/2024',
						posts: [
							{
								_id: '665f94918a281a9474b2d4b5',
								content: 'Hello',
								author: '665f94878a281a9474b2d4b2',
								type: 'post',
								createdAt: '2024-06-04T22:26:25.932Z',
								updatedAt: '2024-06-04T22:26:25.931Z',
							},
							{
								_id: '665f950e8a281a9474b2d4b8',
								content: 'Hello',
								author: '665f94878a281a9474b2d4b2',
								type: 'repost',
								postId: '665f929b8a281a9474b2d4af',
								createdAt: '2024-06-04T22:28:30.133Z',
								updatedAt: '2024-06-04T22:28:30.133Z',
							},
							{
								_id: '665f953c8a281a9474b2d4bb',
								content: 'Hello',
								author: '665f94878a281a9474b2d4b2',
								type: 'repostComment',
								postId: '665f929b8a281a9474b2d4af',
								repostComment: 'repost comment',
								createdAt: '2024-06-04T22:29:16.946Z',
								updatedAt: '2024-06-04T22:29:16.945Z',
							},
						],
						following: 1,
						followers: 0,
						postsCount: 3,
					},
				],
			},
		},
	})
	getOne(@Param('id') id: string, @Query('limit') limit: number, @Query('page') page: number) {
		return this.getOneUserUseCase.getOne({ id, limit, page });
	}
}
