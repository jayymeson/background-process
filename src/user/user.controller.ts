import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Log para depuração
    console.log('Recebendo requisição para criar usuário:', createUserDto);

    // Add user creation request to the queue
    await this.userService.addUserToQueue(createUserDto);

    // Log para depuração
    console.log('Requisição adicionada à fila');

    // Return in_progress message
    return { message: 'User creation in progress' };
  }
}
