import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ClassSerializerInterceptor,
  UseInterceptors,
  Request,
  Query,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entities/workout.entity';
import { TokenPayload } from 'src/types';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { QueryWorkoutDto } from './dto/query-workout.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  async create(
    @Body() createDto: CreateWorkoutDto,
    @Request() request: { user: TokenPayload },
  ) {
    try {
      const id = await this.workoutService.create({
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
  async findAll(@Query() params: QueryWorkoutDto) {
    try {
      const response = await this.workoutService.findAll(params);

      return {
        data: response.map((item) => new Workout(item)),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.workoutService.findOne(id);

      return {
        data: new Workout(response),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateWorkoutDto) {
    try {
      const response = await this.workoutService.update(id, updateDto);

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
      const response = await this.workoutService.remove(id);

      return {
        data: response,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
