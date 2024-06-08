import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './entities/user.entity';
import { ResponseInterceptor } from '../response/response.interceptor';
import { Public } from 'src/auth/auth.decorator';
import { generate } from 'generate-password';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      let password = createUserDto.password;

      if (!password) {
        password = generate({
          length: 10,
          numbers: true,
        });
      }

      const id = await this.userService.create({
        ...createUserDto,
        password,
      });

      return {
        data: id,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async findAll(@Query() params: QueryUserDto) {
    try {
      const users = await this.userService.findAll(params);
      return {
        data: users.rows,
        total: users.count,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);

      if (!user) {
        throw new BadRequestException("Can't find user");
      }

      return {
        data: new User(user),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return {
        data: user,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(id);
      return {
        message: 'Removed completely',
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
