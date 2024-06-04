import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostRepository } from './repository/post.repository';
import { PostSchema } from './entities/post.entity';
import { PostController } from './controller/post.controller';
import { CreatePostUseCase } from './useCase/createPost/create.post.useCase';
import { GetPostUseCase } from './useCase/getPost/get.post.useCase';
import { FollowerRepository } from '../followers/repository/follower.repository';
import { FollowerSchema } from '../followers/entities/follower.entity';
import { UserRepository } from '../user/repository/user.repository';
import { UserSchema } from '../user/entities/user.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Post', schema: PostSchema },
			{ name: 'Follower', schema: FollowerSchema },
			{ name: 'User', schema: UserSchema },
		]),
	],
	controllers: [PostController],
	providers: [
		CreatePostUseCase,
		GetPostUseCase,
		{
			provide: 'IPostRepository',
			useClass: PostRepository,
		},
		{
			provide: 'IFollowerRepository',
			useClass: FollowerRepository,
		},
		{
			provide: 'IUserRepository',
			useClass: UserRepository,
		},
	],
	exports: [CreatePostUseCase, 'IPostRepository'],
})
export class PostModule {}
