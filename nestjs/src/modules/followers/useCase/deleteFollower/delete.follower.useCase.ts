import { DeleteFollowerDto } from '../../dto/delete.follower.dto';
import { IFollowerRepository } from '../../repository/interfaces/IFollowerRepository';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class DeleteFollowerUseCase {
	constructor(@Inject('IFollowerRepository') private readonly followerRepository: IFollowerRepository) {}

	async delete(params: DeleteFollowerDto): Promise<void> {
		if (!mongoose.Types.ObjectId.isValid(params.followerId) || !mongoose.Types.ObjectId.isValid(params.userId)) {
			throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
		}

		const follower = await this.followerRepository.getOne({ userId: params.userId, following: params.followerId });

		if (!follower) {
			throw new HttpException('User or follower not found', HttpStatus.NOT_FOUND);
		}

		return this.followerRepository.delete(params);
	}
}
