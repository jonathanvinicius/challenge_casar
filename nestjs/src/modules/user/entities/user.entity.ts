import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';

@Schema({ collection: 'users' })
export class User {
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
