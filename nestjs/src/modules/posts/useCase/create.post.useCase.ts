import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create.post.dto';
import { IPostRepository } from '../repository/interfaces/IPostRepository';

@Injectable()
export class CreatePostUseCase {
	constructor(@Inject('IPostRepository') private readonly postRepository: IPostRepository) {}

	async save(post: CreatePostDto) {
		return await this.postRepository.save(post);
	}
}
