import { CreatePostDto } from '../../dto/create.post.dto';
import { GetPostByFollowers } from '../../dto/get.post.by.followers';
import { GetPostDto } from '../../dto/get.post.dto';
import { GetPostUserDto } from '../../dto/get.post.user.dto';

export interface IPostRepository {
	save(post: CreatePostDto);
	get(params: GetPostDto);
	getPostByFollowers(params: GetPostByFollowers);
	getPostUser(params: GetPostUserDto);
}
