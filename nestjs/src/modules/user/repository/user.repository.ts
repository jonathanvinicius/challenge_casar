import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from './interfaces/IUser.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class UserRepository implements IUserRepository {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	save(user: CreateUserDto) {
		const createUser = new this.userModel(user);

		return createUser.save();
	}
}
