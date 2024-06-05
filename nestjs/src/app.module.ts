import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from './modules/user/useCase/createUser/create.user.useCase';
import { UserModule } from './modules/user/user.module';
import { SeedModule } from './modules/seeds/seeds.module';
import { PostModule } from './modules/posts/post.module';
import { FollowerModule } from './modules/followers/follower.module';

@Module({
	imports: [UserModule, SeedModule, PostModule, FollowerModule, MongooseModule.forRoot(process.env.MONGODB_URL)],
	controllers: [],
	providers: [CreateUserUseCase],
})
export class AppModule {}
