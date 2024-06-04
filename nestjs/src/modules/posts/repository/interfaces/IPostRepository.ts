import { CreatePostDto } from '../../dto/create.post.dto';
import { GetPostByFollowers } from '../../dto/get.post.by.followers';
import { GetPostDto } from '../../dto/get.post.dto';

export interface IPostRepository {
	save(post: CreatePostDto);
	get(params: GetPostDto);
	getPostByFollowers(params: GetPostByFollowers);
}
