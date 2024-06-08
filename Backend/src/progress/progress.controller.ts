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
  Query,
  Request,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { Progress } from './entities/progress.entity';
import { QueryProgressDto } from './dto/query-progress.dto';
import { TokenPayload } from 'src/types';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async create(
    @Body() createDto: CreateProgressDto,
    @Request() request: { user: TokenPayload },
  ) {
    try {
      const id = await this.progressService.create({
        ...createDto,
        date_recorded: new Date(),
        user_id: request.user.id,
      });

      return {
        data: id,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async findAll(@Query() params: QueryProgressDto) {
    try {
      const response = await this.progressService.findAll(params);

      return {
        data: response.map((item) => new Progress(item)),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.progressService.findOne(id);

      return {
        data: new Progress(response),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateProgressDto) {
    try {
      const response = await this.progressService.update(id, updateDto);

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
      const response = await this.progressService.remove(id);

      return {
        data: response,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
