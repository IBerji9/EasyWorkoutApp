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
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { Exercise } from './entities/exercise.entity';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  async create(@Body() createDto: CreateExerciseDto) {
    try {
      const id = await this.exerciseService.create(createDto);

      return {
        data: id,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const response = await this.exerciseService.findAll();

      return {
        data: response.map((item) => new Exercise(item)),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.exerciseService.findOne(id);

      return {
        data: new Exercise(response),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateExerciseDto) {
    try {
      const response = await this.exerciseService.update(id, updateDto);

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
      const response = await this.exerciseService.remove(id);

      return {
        data: response,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
