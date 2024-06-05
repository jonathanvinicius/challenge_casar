import { CreatePostDto } from '../dto/create.post.dto';
import { Post } from '../entities/post.entity';
import { IPostRepository } from './interfaces/IPostRepository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetPostDto } from '../dto/get.post.dto';
import { GetPostByFollowers } from '../dto/get.post.by.followers';
import { GetPostUserDto } from '../dto/get.post.user.dto';
import * as moment from 'moment';

export class PostRepository implements IPostRepository {
	constructor(@InjectModel(Post.name) private readonly postRepository: Model<Post>) {}

	async save(post: CreatePostDto) {
		const createPost = new this.postRepository(post);

		return createPost.save();
	}

	async get(params: GetPostDto) {
		const limitPage = +params.limit ? params.limit : 10;
		const currentPage = +params.page ? params.page : 1;

		const skip = limitPage * (currentPage - 1);

		const posts = await this.postRepository.find().sort({ createdAt: -1 }).skip(skip).limit(limitPage).exec();

		return posts;
	}

	async getPostByFollowers(params: GetPostByFollowers) {
		const limitPage = +params.limit ? params.limit : 10;
		const currentPage = +params.page ? params.page : 1;

		const skip = limitPage * (currentPage - 1);

		const posts = await this.postRepository
			.aggregate([
				{
					$match: {
						author: { $in: params.followerIds },
					},
				},
				{
					$lookup: {
						from: 'users',
						localField: 'author',
						foreignField: '_id',
						as: 'user',
					},
				},
				{
					$lookup: {
						from: 'followers',
						localField: '_id',
						foreignField: 'following',
						as: 'following',
					},
				},
				{
					$project: {
						following: 0,
						user: 0,
					},
				},
				{
					$skip: Number(skip),
				},
				{
					$limit: Number(limitPage),
				},
			])
			.exec();

		return posts;
	}

	async getPostUser(params: GetPostUserDto) {
		const startOfDay = moment().tz('America/Sao_Paulo').startOf('day').toDate();
		const endOfDay = moment().tz('America/Sao_Paulo').endOf('day').toDate();

		return this.postRepository
			.countDocuments({
				author: params.userId,
				createdAt: {
					$gte: startOfDay,
					$lte: endOfDay,
				},
			})
			.exec();
	}
}
