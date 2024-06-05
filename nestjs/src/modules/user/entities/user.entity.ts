import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Document } from 'mongoose';

@Schema({ collection: 'users', versionKey: false })
export class User extends Document {
	@Prop({ required: true })
	username: string;

	@Prop({ required: false })
	createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
	this.createdAt = moment().format('DD/MM/YYYY');
	next();
});
