import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true
		})
	],
	providers: [DatabaseConfigService],
	exports: [DatabaseConfigService]
})
export class DatabaseConfigModule {}
