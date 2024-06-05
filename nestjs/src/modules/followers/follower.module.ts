import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowerSchema } from './entities/follower.entity';
import { FollowersController } from './controller/follower.controller';
import { FollowerRepository } from './repository/follower.repository';
import { CreateFollowerUseCase } from './useCase/createFollower/create.follower.useCase';
import { DeleteFollowerUseCase } from './useCase/deleteFollower/delete.follower.useCase';
import { ValidateUser } from './util/validateUser';
import { UserRepository } from '../user/repository/user.repository';
import { UserSchema } from '../user/entities/user.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Follower', schema: FollowerSchema },
			{ name: 'User', schema: UserSchema },
		]),
	],
	controllers: [FollowersController],
	providers: [
		CreateFollowerUseCase,
		DeleteFollowerUseCase,
		{
			provide: 'IFollowerRepository',
			useClass: FollowerRepository,
		},
		{
			provide: 'IUserRepository',
			useClass: UserRepository,
		},
		{
			provide: 'ValidateUser',
			useClass: ValidateUser,
		},
	],
	exports: [CreateFollowerUseCase, 'IFollowerRepository', 'IUserRepository', 'ValidateUser'],
})
export class FollowerModule {}
