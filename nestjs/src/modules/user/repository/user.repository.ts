import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from './interfaces/IUser.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetOneUserDto } from '../dto/get.one.user.dto';
import * as mongoose from 'mongoose';

export class UserRepository implements IUserRepository {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async save(user: CreateUserDto) {
		const createUser = new this.userModel(user);

		return createUser.save();
	}

	async getOne(id: GetOneUserDto) {
		const user = await this.userModel
			.aggregate([
				{
					$match: { _id: new mongoose.Types.ObjectId(id.toString()) },
				},
				{
					$lookup: {
						from: 'posts',
						localField: '_id',
						foreignField: 'author',
						as: 'posts',
					},
				},
				{
					$project: {
						username: 1,
						createdAt: 1,
						posts: 1,
						postsCount: { $size: '$posts' },
					},
				},
			])
			.exec();
		return user;
	}
}
