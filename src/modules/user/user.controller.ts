import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ 
    description: 'User to register',
    examples: {
      example: {
        value:{
          username: 'username',
          email: 'email@gmail.com',
          password: 'password',
        }
      }
    }
   })
  /**
   * Register a new user.
   * @param createUserDto The user to register.
   * @returns The registered user.
   */
  async create(@Body() user:CreateUserDto) {
    return await this.userService.register(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  @ApiResponse({ status: 404, description: 'Users not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Returns the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id',description: 'User id', type: 'string' })
  async findOne(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
