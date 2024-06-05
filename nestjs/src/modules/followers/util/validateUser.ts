import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { IFollowerRepository } from '../repository/interfaces/IFollowerRepository';
import { FollowerDto } from '../dto/follower.dto';
import { IUserRepository } from 'src/modules/user/repository/interfaces/IUser.repository';

@Injectable()
export class ValidateUser {
	constructor(
		@Inject('IFollowerRepository') private readonly followerRepository: IFollowerRepository,
		@Inject('IUserRepository') private readonly userRepository: IUserRepository,
	) {}

	async validate(follower: FollowerDto) {
		if (!mongoose.Types.ObjectId.isValid(follower.userId) || !mongoose.Types.ObjectId.isValid(follower.followerId)) {
			throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
		}

		if (follower.userId === follower.followerId) {
			throw new HttpException('you cant do an action for your own id', HttpStatus.BAD_REQUEST);
		}

		const user = await this.userRepository.getOne({ id: follower.userId });
		const followerUser = await this.userRepository.getOne({ id: follower.followerId });

		if (!user || !followerUser) {
			throw new HttpException('User or follower not found', HttpStatus.NOT_FOUND);
		}

		const userFollower = await this.followerRepository.getOne({
			userId: follower.userId,
			following: follower.followerId,
		});

		if (!userFollower) {
			throw new HttpException('follower not found', HttpStatus.NOT_FOUND);
		}
	}
}
