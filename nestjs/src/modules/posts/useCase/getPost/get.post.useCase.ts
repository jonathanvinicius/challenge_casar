import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository } from '../../repository/interfaces/IPostRepository';
import { GetPostDto } from '../../dto/get.post.dto';
import { IFollowerRepository } from 'src/modules/followers/repository/interfaces/IFollowerRepository';
import * as mongoose from 'mongoose';
import * as moment from 'moment-timezone';

@Injectable()
export class GetPostUseCase {
	constructor(
		@Inject('IPostRepository') private readonly postRepository: IPostRepository,
		@Inject('IFollowerRepository') private readonly followerRepository: IFollowerRepository,
	) {}

	async get(params: GetPostDto) {
		if (params.id) {
			const followers = await this.followerRepository.get({ userId: params.id });

			const ids = followers.map((follower) => new mongoose.Types.ObjectId(follower.following.toString()));

			const posts = await this.postRepository.getPostByFollowers({ ...params, followerIds: ids });
			return posts.map((post) => ({
				...post,
				createdAt: moment(post.createdAt).tz('America/Sao_Paulo').format(),
			}));
		} else {
			const posts = await this.postRepository.get(params);

			return posts.map((post) => ({
				...post.toObject(),
				createdAt: moment(post.createdAt).tz('America/Sao_Paulo').format(),
			}));
		}
	}
}
