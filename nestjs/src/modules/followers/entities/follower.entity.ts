import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import * as moment from 'moment-timezone';

@Schema({ collection: 'followers', versionKey: false })
export class Follower extends Document {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	userId: User;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	following: User;

	@Prop({ required: false })
	createdAt: Date;
}

export const FollowerSchema = SchemaFactory.createForClass(Follower);

FollowerSchema.pre('save', function (next) {
	this.createdAt = moment().tz('America/Sao_Paulo').toDate();
	next();
});
