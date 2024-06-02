import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IUserRepository } from '../../repository/interfaces/IUser.repository';

@Injectable()
export class CreateUserUseCase {
	constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

	async save(user: CreateUserDto) {
		return await this.userRepository.save(user);
	}
}
