import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/interface.user';

const users: User[] = [];
let userIdCounter = 1;

@Injectable()
export class UserService {
  constructor(@InjectQueue('user-queue') private userQueue: Queue) {}

  async addUserToQueue(createUserDto: CreateUserDto) {
    await this.userQueue.add('create-user', createUserDto);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUserId = userIdCounter++;

    const newUser: User = {
      id: newUserId,
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password, // In a real application, the password should be hashed
    };

    users.push(newUser);

    return newUser;
  }
}
