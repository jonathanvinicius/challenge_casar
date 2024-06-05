import { Follower } from '../entities/follower.entity';
import { IFollowerRepository } from './interfaces/IFollowerRepository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetOneFollowerDto } from '../dto/getOne.follower.dto';
import { GetOneResponseDto } from '../dto/get.one.response.dto';
import { FollowerDto } from '../dto/follower.dto';

export class FollowerRepository implements IFollowerRepository {
	constructor(@InjectModel(Follower.name) private readonly followerRepository: Model<Follower>) {}

	async save(follower: FollowerDto) {
		return this.followerRepository.create(follower);
	}

	async delete(params: FollowerDto): Promise<void> {
		await this.followerRepository.deleteOne({ userId: params.userId, following: params.followerId });
	}

	async getOne(params: GetOneFollowerDto): Promise<GetOneResponseDto> {
		return this.followerRepository.findOne({ userId: params.userId, following: params.following });
	}

	async get(params: GetOneFollowerDto) {
		const followers = await this.followerRepository.find({ userId: params.userId }).exec();

		return followers;
	}
}
