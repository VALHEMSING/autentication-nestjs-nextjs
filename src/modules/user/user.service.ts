import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name)private userModel: Model<User>) {}
  async register(user: CreateUserDto): Promise<User> {

    const { username, email, password } = user;
    const userExists = await this.userModel.findOne({ $or:[{username}, {email}] }).exec();

    try {

      if (userExists) 
        throw new ConflictException(`El ${userExists.username === username ? 'username' : 'email'} en uso `);

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({ 
        ...user,
        password: hashPassword
       });
      return newUser.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al registrar el user.');
    }
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    try {
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los users.');
    }
  }

  async findUserById(userId: string): Promise<User> {
    const userExists = await this.userModel.findById(userId).exec();
    try {
      if (!userExists) 
        throw new ConflictException(`El user no existe.`);
      return userExists;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener el user.');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async removeUser(id: string): Promise<void> {
    try {
      
     await this.userModel.findByIdAndDelete(id).exec();
      if (!id) 
        throw new ConflictException(`El user no existe.`);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el user.');
    }
  }
}
