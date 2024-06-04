import { CreateUserDto } from '../../dto/create-user.dto';
import { GetOneUserDto } from '../../dto/get.one.user.dto';
import { GetOneUserPostsDto } from '../../dto/get.one.user.posts.dto';

export interface IUserRepository {
	save(user: CreateUserDto);
	getOneUserAndPosts(params: GetOneUserPostsDto);
	getOne(params: GetOneUserDto);
}
