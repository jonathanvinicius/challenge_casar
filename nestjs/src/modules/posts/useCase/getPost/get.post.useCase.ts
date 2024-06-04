import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository } from '../../repository/interfaces/IPostRepository';
import { GetPostDto } from '../../dto/get.post.dto';
import { IFollowerRepository } from 'src/modules/followers/repository/interfaces/IFollowerRepository';

@Injectable()
export class GetPostUseCase {
	constructor(
		@Inject('IPostRepository') private readonly postRepository: IPostRepository,
		@Inject('IFollowerRepository') private readonly followerRepository: IFollowerRepository,
	) {}

	async get(params: GetPostDto) {
		if (params.id) {
			const followers = await this.followerRepository.get({ userId: params.id });

			const followerIds = followers.map((follower) => follower.following.toString());

			return await this.postRepository.getPostByFollowers({ ...params, followerIds });
		} else {
			return await this.postRepository.get(params);
		}
	}
}
