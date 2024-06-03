import { CreatePostDto } from '../dto/create.post.dto';
import { Post } from '../entities/post.entity';
import { IPostRepository } from './interfaces/IPostRepository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class PostRepository implements IPostRepository {
	constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

	save(post: CreatePostDto) {
		const createPost = new this.postModel(post);

		return createPost.save();
	}
}
