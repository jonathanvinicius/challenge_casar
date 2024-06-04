import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CreateUserUseCase } from '../useCase/createUser/create.user.useCase';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetOneUserPostsUseCase } from '../useCase/getOneUserAndPosts/get.one.user.posts.useCase';

@Controller('user')
export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly getOneUserUseCase: GetOneUserPostsUseCase,
	) {}

	@Post()
	save(@Body() createUserDto: CreateUserDto) {
		return this.createUserUseCase.save(createUserDto);
	}

	@Get(':id')
	getOne(@Param('id') id: string, @Query('limit') limit: number, @Query('page') page: number) {
		return this.getOneUserUseCase.getOne({ id, limit, page });
	}
}
