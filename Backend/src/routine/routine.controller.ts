import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  BadRequestException,
  Request,
  Query,
} from '@nestjs/common';
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './entities/routine.entity';
import { TokenPayload } from 'src/types';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { QueryRoutineDto } from './dto/query-routine.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post()
  async create(
    @Body() createDto: CreateRoutineDto,
    @Request() request: { user: TokenPayload },
  ) {
    try {
      const id = await this.routineService.create({
        ...createDto,
        user_id: request.user.id,
        date_recorded: new Date(),
      });

      return {
        data: id,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async findAll(@Query() params: QueryRoutineDto) {
    try {
      const response = await this.routineService.findAll(params);

      return {
        data: response.map((item) => new Routine(item)),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.routineService.findOne(id);

      return {
        data: new Routine(response),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateRoutineDto) {
    try {
      const response = await this.routineService.update(id, updateDto);

      return {
        data: response,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const response = await this.routineService.remove(id);

      return {
        data: response,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
