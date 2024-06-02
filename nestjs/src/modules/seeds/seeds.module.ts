import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedUser } from './entities/user.seed';
import { InsertBatchUsersSeeder } from './services/insert.batch.user.seed';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/casar'),
		MongooseModule.forFeature([{ name: 'UserSeed', schema: SeedUser }]),
	],
	providers: [InsertBatchUsersSeeder],
	exports: [InsertBatchUsersSeeder],
})
export class SeedModule {}
