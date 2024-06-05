import { DeleteFollowerDto } from '../../dto/delete.follower.dto';
import { IFollowerRepository } from '../../repository/interfaces/IFollowerRepository';
import { Inject, Injectable } from '@nestjs/common';
import { ValidateUser } from '../../util/validateUser';

@Injectable()
export class DeleteFollowerUseCase {
	constructor(
		@Inject('IFollowerRepository') private readonly followerRepository: IFollowerRepository,
		@Inject('ValidateUser') private readonly validateUser: ValidateUser,
	) {}

	async delete(params: DeleteFollowerDto): Promise<void> {
		await this.validateUser.validate(params);
		return this.followerRepository.delete(params);
	}
}
