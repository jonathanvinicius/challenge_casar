import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataFactory } from 'nestjs-seeder';
import { UserSeed } from '../entities/user.seed';
import * as moment from 'moment';

@Injectable()
export class InsertBatchUsersSeeder {
	constructor(@InjectModel(UserSeed.name) private readonly userModel: Model<UserSeed>) {}

	async seed(): Promise<any> {
		const users = DataFactory.createForClass(UserSeed).generate(10);

		for (const user of users) {
			user.createdAt = moment().format('DD/MM/YYYY');
		}

		return this.userModel.insertMany(users);
	}

	async drop(): Promise<any> {
		return this.userModel.deleteMany({});
	}
}
