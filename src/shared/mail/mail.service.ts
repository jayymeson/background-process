import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserCreationSuccess(email: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Success create user',
        template: './success',
        context: {
          name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error sending success email to ${email}`,
      );
    }
  }

  async sendUserCreationError(email: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Error create user',
        template: './error',
        context: {
          name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error sending error email to ${email}`,
      );
    }
  }
}
