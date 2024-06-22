import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('Receiving request to create user:', createUserDto);

    // Add user creation request to the queue
    await this.userService.addUserToQueue(createUserDto);

    console.log('Request added to the queue');

    // Return in_progress message
    return { message: 'User creation in progress' };
  }
}
