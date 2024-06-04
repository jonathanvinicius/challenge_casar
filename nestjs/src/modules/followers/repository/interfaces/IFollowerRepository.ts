import { CreateFollowerDto } from '../../dto/create.follower.dto';
import { DeleteFollowerDto } from '../../dto/delete.follower.dto';
import { GetOneResponseDto } from '../../dto/get.one.response.dto';
import { GetOneFollowerDto } from '../../dto/getOne.follower.dto';

export interface IFollowerRepository {
	save(follower: CreateFollowerDto);
	delete(params: DeleteFollowerDto): Promise<void>;
	getOne(params: GetOneFollowerDto): Promise<GetOneResponseDto>;
	get(params: GetOneFollowerDto);
}
