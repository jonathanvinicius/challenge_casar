import { IsNotEmpty, Length, IsEnum, ValidateIf } from 'class-validator';
import { TypePost } from '../entities/post.entity';

export class CreatePostDto {
	@IsNotEmpty({ message: 'content is required' })
	@Length(1, 200, { message: 'content must be between 1 and 200 characters' })
	content: string;

	author: string;

	@IsNotEmpty({ message: 'type is required' })
	@IsEnum(TypePost, { message: 'type must be a valid enum value' })
	type: TypePost;

	@ValidateIf(
		(object) =>
			(object.type === TypePost.RepostComment && !object.postId) || (object.type === TypePost.Repost && !object.postId),
	)
	@IsNotEmpty({ message: 'postId is required for this type of post' })
	postId?: string;

	@ValidateIf((object) => object.type === 'repostComment')
	@IsNotEmpty({ message: 'repostComment is required for this type of post' })
	repostComment?: string;

	createdAt: Date;
}
