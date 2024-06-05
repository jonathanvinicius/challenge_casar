import { Inject, Injectable } from '@nestjs/common';
import { IFollowerRepository } from '../../repository/interfaces/IFollowerRepository';
import { ValidateUser } from '../../util/validateUser';
import { FollowerDto } from '../../dto/follower.dto';

@Injectable()
export class CreateFollowerUseCase {
	constructor(
		@Inject('IFollowerRepository') private readonly followerRepository: IFollowerRepository,
		@Inject('ValidateUser') private readonly validateUser: ValidateUser,
	) {}

	async execute(follower: FollowerDto) {
		await this.validateUser.validate(follower);
		return this.followerRepository.save(follower);
	}
}
