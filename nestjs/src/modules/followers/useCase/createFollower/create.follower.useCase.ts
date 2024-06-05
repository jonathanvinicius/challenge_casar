import { Inject, Injectable } from '@nestjs/common';
import { IFollowerRepository } from '../../repository/interfaces/IFollowerRepository';
import { CreateFollowerDto } from '../../dto/create.follower.dto';

@Injectable()
export class CreateFollowerUseCase {
	constructor(@Inject('IFollowerRepository') private readonly followerRepository: IFollowerRepository) {}

	async execute(follower: CreateFollowerDto) {
		return this.followerRepository.save(follower);
	}
}
