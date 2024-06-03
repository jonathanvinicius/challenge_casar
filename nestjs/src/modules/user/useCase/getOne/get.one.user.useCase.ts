import { Inject, Injectable } from '@nestjs/common';
import { GetOneUserDto } from '../../dto/get.one.user.dto';
import { IUserRepository } from '../../repository/interfaces/IUser.repository';

@Injectable()
export class GetOneUserUseCase {
	constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

	async getOne(id: GetOneUserDto) {
		return this.userRepository.getOne(id);
	}
}
