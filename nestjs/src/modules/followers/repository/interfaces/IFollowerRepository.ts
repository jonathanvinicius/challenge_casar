import { FollowerDto } from '../../dto/follower.dto';
import { GetOneResponseDto } from '../../dto/get.one.response.dto';
import { GetOneFollowerDto } from '../../dto/getOne.follower.dto';

export interface IFollowerRepository {
	save(follower: FollowerDto);
	delete(params: FollowerDto): Promise<void>;
	getOne(params: GetOneFollowerDto): Promise<GetOneResponseDto>;
	get(params: GetOneFollowerDto);
}
