import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from './interfaces/IUser.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { GetOneUserPostsDto } from '../dto/get.one.user.posts.dto';
import { GetOneUserDto } from '../dto/get.one.user.dto';

export class UserRepository implements IUserRepository {
	constructor(@InjectModel(User.name) private readonly userRepository: Model<User>) {}

	async save(user: CreateUserDto) {
		const createUser = new this.userRepository(user);

		return createUser.save();
	}

	async getOneUserAndPosts(params: GetOneUserPostsDto) {
		const limitPage = +params.limit ? params.limit : 5;
		const currentPage = +params.page ? params.page : 1;

		const skip = limitPage * (currentPage - 1);

		const user = await this.userRepository
			.aggregate([
				{
					$match: { _id: new mongoose.Types.ObjectId(params.id.toString()) },
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
					$lookup: {
						from: 'followers',
						localField: '_id',
						foreignField: 'userId',
						as: 'following',
					},
				},
				{
					$lookup: {
						from: 'followers',
						localField: '_id',
						foreignField: 'follower',
						as: 'followers',
					},
				},

				{
					$skip: Number(skip),
				},
				{
					$limit: Number(limitPage),
				},
				{
					$project: {
						username: 1,
						createdAt: 1,
						posts: 1,
						following: { $size: '$following' },
						followers: { $size: '$followers' },
						postsCount: { $size: '$posts' },
					},
				},
			])
			.sort({ createdAt: -1 })
			.exec();
		return user;
	}

	async getOne(params: GetOneUserDto) {
		const id = new mongoose.Types.ObjectId(params.id.toString());
		return this.userRepository.findById(id);
	}
}
