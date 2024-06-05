import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seeds.module';
import { InsertBatchUsersSeeder } from './services/insert.batch.user.seed';

async function bootstrap() {
	const appContext = await NestFactory.createApplicationContext(SeedModule);
	const usersSeeder = appContext.get(InsertBatchUsersSeeder);

	await usersSeeder.seed();

	await appContext.close();
}

bootstrap().catch((err) => {
	console.error('Error while seeding database:', err);
	process.exit(1);
});
