import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../dto/create.post.dto';
import { IPostRepository } from '../../repository/interfaces/IPostRepository';
import { IUserRepository } from 'src/modules/user/repository/interfaces/IUser.repository';
import * as mongoose from 'mongoose';

@Injectable()
export class CreatePostUseCase {
	constructor(
		@Inject('IPostRepository') private readonly postRepository: IPostRepository,
		@Inject('IUserRepository') private readonly userRepository: IUserRepository,
	) {}

	async save(post: CreatePostDto) {
		if (!mongoose.Types.ObjectId.isValid(post.author)) {
			throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
		}

		const user = await this.userRepository.getOne({ id: post.author });

		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		const postUser = await this.postRepository.getPostUser({ userId: post.author });

		if (postUser >= 5) {
			throw new HttpException('User has reached the limit of 5 posts for day.', HttpStatus.UNPROCESSABLE_ENTITY);
		}

		return await this.postRepository.save(post);
	}
}
