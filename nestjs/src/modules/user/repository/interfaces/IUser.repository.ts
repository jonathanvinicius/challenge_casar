import { CreateUserDto } from '../../dto/create-user.dto';

export interface IUserRepository {
	save(user: CreateUserDto);
}
