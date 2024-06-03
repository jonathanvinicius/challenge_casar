import { CreateUserDto } from '../../dto/create-user.dto';
import { GetOneUserDto } from '../../dto/get.one.user.dto';

export interface IUserRepository {
	save(user: CreateUserDto);
	getOne(param: GetOneUserDto);
}
