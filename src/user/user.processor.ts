import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { UserService } from './user.service';
import { MailService } from 'src/shared/mail/mail.service';

@Processor('user-queue')
export class UserProcessor {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Process('create-user')
  async handleCreateUser(job: Job) {
    try {
      // Create the user
      const user = await this.userService.createUser(job.data);

      // Notify user on success
      await this.mailService.sendUserCreationSuccess(user.email, user.name);
    } catch (error) {
      // Notify user on failure
      await this.mailService.sendUserCreationError(
        job.data.email,
        job.data.name,
      );
    }
  }
}
