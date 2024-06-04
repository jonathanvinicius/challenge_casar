import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowerSchema } from './entities/follower.entity';
import { FollowersController } from './controller/follower.controller';
import { FollowerRepository } from './repository/follower.repository';
import { CreateFollowerUseCase } from './useCase/createFollower/create.follower.useCase';
import { DeleteFollowerUseCase } from './useCase/deleteFollower/delete.follower.useCase';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Follower', schema: FollowerSchema }])],
	controllers: [FollowersController],
	providers: [
		CreateFollowerUseCase,
		DeleteFollowerUseCase,
		{
			provide: 'IFollowerRepository',
			useClass: FollowerRepository,
		},
	],
	exports: [CreateFollowerUseCase, 'IFollowerRepository'],
})
export class FollowerModule {}
