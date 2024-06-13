import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MailModule } from './shared/mail/mail.module';
import { QueueModule } from './shared/queues/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          maxRetriesPerRequest: null,
          connectTimeout: 10000,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MailModule,
    QueueModule,
  ],
})
export class AppModule {}
