import { Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { CreateFollowerUseCase } from '../useCase/createFollower/create.follower.useCase';
import { Response } from 'express';
import { DeleteFollowerUseCase } from '../useCase/deleteFollower/delete.follower.useCase';

@Controller('followers')
export class FollowersController {
	constructor(
		private readonly createFollowerUseCase: CreateFollowerUseCase,
		private readonly deleteFollowerUseCase: DeleteFollowerUseCase,
	) {}

	@Post('/:userId/:followerId')
	async createFollower(@Param('userId') userId: string, @Param('followerId') followerId: string) {
		return this.createFollowerUseCase.execute({ userId, following: followerId });
	}

	@Delete('/:userId/:followerId')
	async deleteFollower(
		@Param('userId') userId: string,
		@Param('followerId') followerId: string,
		@Res() response: Response,
	): Promise<Response> {
		await this.deleteFollowerUseCase.delete({ userId, followerId });
		return response.status(204).send();
	}
}
