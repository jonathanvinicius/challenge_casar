import { Inject, Injectable } from '@nestjs/common';
import { CreateFollowerDto } from '../../dto/create.follower.dto';
import { IFollowerRepository } from '../../repository/interfaces/IFollowerRepository';

@Injectable()
export class CreateFollowerUseCase {
	constructor(@Inject('IFollowerRepository') private readonly createFollowerRepository: IFollowerRepository) {}

	async execute(follower: CreateFollowerDto) {
		return this.createFollowerRepository.save(follower);
	}
}
