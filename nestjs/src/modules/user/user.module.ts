import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { CreateUserUseCase } from './useCase/createUser/create.user.useCase';
import { UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { GetOneUserUseCase } from './useCase/getOne/get.one.user.useCase';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
	controllers: [UserController],
	providers: [
		CreateUserUseCase,
		GetOneUserUseCase,
		{
			provide: 'IUserRepository',
			useClass: UserRepository,
		},
	],
	exports: [CreateUserUseCase, 'IUserRepository'],
})
export class UserModule {}
