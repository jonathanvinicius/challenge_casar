import { Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { CreateFollowerUseCase } from '../useCase/createFollower/create.follower.useCase';
import { Response } from 'express';
import { DeleteFollowerUseCase } from '../useCase/deleteFollower/delete.follower.useCase';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Follower')
@Controller('followers')
export class FollowersController {
	constructor(
		private readonly createFollowerUseCase: CreateFollowerUseCase,
		private readonly deleteFollowerUseCase: DeleteFollowerUseCase,
	) {}

	@Post('/:userId/:followerId')
	@ApiOperation({ summary: 'Create new follower' })
	@ApiCreatedResponse({
		description: 'The follower has been successfully created.',
		content: {
			'application/json': {
				example: {
					status: 201,
					userId: '665f94878a281a9474b2d4b2',
					following: '665f89fcbf0a115d467b53c5',
					_id: '665f95658a281a9474b2d4be',
					createdAt: '2024-06-04T22:29:57.378Z',
				},
			},
		},
	})
	async createFollower(@Param('userId') userId: string, @Param('followerId') followerId: string) {
		return this.createFollowerUseCase.execute({ userId, following: followerId });
	}

	@Delete('/:userId/:followerId')
	@ApiOperation({ summary: 'Delete follower' })
	@ApiResponse({ status: 204 })
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		content: {
			'application/json': {
				examples: {
					userNotFound: {
						summary: 'Invalid user id',
						value: {
							statusCode: 400,
							message: 'Invalid user id',
						},
					},
				},
			},
		},
	})
	@ApiResponse({
		status: 404,
		description: 'Not Found',
		content: {
			'application/json': {
				examples: {
					userNotFound: {
						summary: 'User Not Found',
						value: {
							statusCode: 404,
							message: 'User or follower not found.',
						},
					},
				},
			},
		},
	})
	async deleteFollower(
		@Param('userId') userId: string,
		@Param('followerId') followerId: string,
		@Res() response: Response,
	): Promise<Response> {
		await this.deleteFollowerUseCase.delete({ userId, followerId });
		return response.status(204).send();
	}
}
