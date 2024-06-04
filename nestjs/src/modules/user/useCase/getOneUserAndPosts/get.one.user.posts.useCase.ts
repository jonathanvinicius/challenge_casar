import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repository/interfaces/IUser.repository';
import { GetOneUserPostsDto } from '../../dto/get.one.user.posts.dto';

@Injectable()
export class GetOneUserPostsUseCase {
	constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

	async getOne(params: GetOneUserPostsDto) {
		return this.userRepository.getOneUserAndPosts(params);
	}
}
