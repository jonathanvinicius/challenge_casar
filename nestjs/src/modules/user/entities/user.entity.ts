import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ collection: 'users', versionKey: false })
export class User extends Document {
	@Prop({ required: true })
	username: string;

	@Prop({ required: false })
	createdAt: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
	posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
	this.createdAt = moment().format('DD/MM/YYYY');
	next();
});
