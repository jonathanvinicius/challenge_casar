import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from './modules/user/useCase/createUser/create.user.useCase';
import { UserModule } from './modules/user/user.module';
import { SeedModule } from './modules/seeds/seeds.module';
import { PostModule } from './modules/posts/post.module';

@Module({
	imports: [UserModule, SeedModule, PostModule, MongooseModule.forRoot('mongodb://localhost:27017/casar')],
	controllers: [],
	providers: [CreateUserUseCase],
})
export class AppModule {}
