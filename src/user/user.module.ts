import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProcessor } from './user.processor';
import { QueueModule } from '../shared/queues/queue.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'user-queue',
    }),
    QueueModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserProcessor],
})
export class UserModule {}
