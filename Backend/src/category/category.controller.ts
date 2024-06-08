import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { TokenPayload } from 'src/types';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { QueryCategoryDto } from './dto/query-category.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createDto: CreateCategoryDto,
    @Request() request: { user: TokenPayload },
  ) {
    try {
      const id = await this.categoryService.create({
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
  async findAll(@Query() params: QueryCategoryDto) {
    try {
      const response = await this.categoryService.findAll(params);

      return {
        data: response.map((item) => new Category(item)),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.categoryService.findOne(id);

      return {
        data: new Category(response),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto) {
    try {
      const response = await this.categoryService.update(id, updateDto);

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
      const response = await this.categoryService.remove(id);

      return {
        data: response,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
