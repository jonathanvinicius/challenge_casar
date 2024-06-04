import { Follower } from '../entities/follower.entity';
import { IFollowerRepository } from './interfaces/IFollowerRepository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFollowerDto } from '../dto/create.follower.dto';
import { DeleteFollowerDto } from '../dto/delete.follower.dto';
import { GetOneFollowerDto } from '../dto/getOne.follower.dto';
import { GetOneResponseDto } from '../dto/get.one.response.dto';

export class FollowerRepository implements IFollowerRepository {
	constructor(@InjectModel(Follower.name) private readonly followerModel: Model<Follower>) {}

	async save(follower: CreateFollowerDto) {
		return this.followerModel.create(follower);
	}

	async delete(params: DeleteFollowerDto): Promise<void> {
		await this.followerModel.deleteOne({ userId: params.userId, following: params.followerId });
	}

	async getOne(params: GetOneFollowerDto): Promise<GetOneResponseDto> {
		return this.followerModel.findOne({ userId: params.userId, following: params.following });
	}

	async get(params: GetOneFollowerDto) {
		const users = await this.followerModel.find({ userId: params.userId }).exec();
		return users;
	}
}
