import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserUseCase } from '../useCase/createUser/create.user.useCase';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetOneUserUseCase } from '../useCase/getOne/get.one.user.useCase';
import { GetOneUserDto } from '../dto/get.one.user.dto';

@Controller('user')
export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly getOneUserUseCase: GetOneUserUseCase,
	) {}

	@Post()
	save(@Body() createUserDto: CreateUserDto) {
		return this.createUserUseCase.save(createUserDto);
	}

	@Get(':id')
	getOne(@Param('id') id: GetOneUserDto) {
		return this.getOneUserUseCase.getOne(id);
	}
}
