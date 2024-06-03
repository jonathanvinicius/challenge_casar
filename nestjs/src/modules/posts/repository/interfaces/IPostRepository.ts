import { CreatePostDto } from '../../dto/create.post.dto';

export interface IPostRepository {
	save(post: CreatePostDto);
}
