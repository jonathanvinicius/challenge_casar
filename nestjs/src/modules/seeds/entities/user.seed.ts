import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Factory } from 'nestjs-seeder';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class UserSeed extends Document {
	@Factory((faker) => faker.internet.userName().substring(0, 14))
	@Prop({ required: true })
	username: string;

	@Prop({ required: false })
	createdAt: string;
}

export const SeedUser = SchemaFactory.createForClass(UserSeed);
