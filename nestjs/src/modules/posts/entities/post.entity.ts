import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import * as mongoose from 'mongoose';

@Schema({ collection: 'posts' })
export class Post extends Document {
	@Prop({ required: true })
	content: string;

	@Prop({ required: false })
	media: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	author: User;

	@Prop({ required: false })
	createdAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
