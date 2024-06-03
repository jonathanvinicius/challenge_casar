import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostRepository } from './repository/post.repository';
import { CreatePostUseCase } from './useCase/create.post.useCase';
import { PostSchema } from './entities/post.entity';
import { PostController } from './controller/post.controller';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
	controllers: [PostController],
	providers: [
		CreatePostUseCase,
		{
			provide: 'IPostRepository',
			useClass: PostRepository,
		},
	],
	exports: [CreatePostUseCase, 'IPostRepository'],
})
export class PostModule {}
