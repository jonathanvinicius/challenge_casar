import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import * as mongoose from 'mongoose';
import * as moment from 'moment';

export enum TypePost {
	Repost = 'repost',
	Post = 'post',
	RepostComment = 'repostComment',
}

@Schema({ collection: 'posts', versionKey: false, timestamps: true })
export class Post extends Document {
	@Prop({ required: true })
	content: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	author: User;

	@Prop({ required: true })
	type: TypePost;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
	postId: Post;

	@Prop({ required: false })
	repostComment: string;

	@Prop({ required: false })
	createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.pre('save', function (next) {
	this.createdAt = moment().toDate();
	next();
});
