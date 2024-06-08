import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { generateError } from 'src/utils/generate-error';
import { v4 as uuidV4 } from 'uuid';
import { Category } from './entities/category.entity';
import { QueryCategoryDto } from './dto/query-category.dto';
import { Type } from './entities/category.enum';

@Injectable()
export class CategoryService {
  constructor(private firebaseService: FirebaseService) {}

  async create(createDto: CreateCategoryDto): Promise<string> {
    try {
      const id = uuidV4();
      await this.firebaseService.categoryCol.doc(id).set(createDto);
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async findAll(params?: QueryCategoryDto): Promise<Category[]> {
    try {
      // category
      let query: any = this.firebaseService.categoryCol;

      if (params?.type) {
        query = query.where('type', '==', params.type);

        if (params.type === Type.CREATED) {
          if (params?.user_id) {
            query = query.where('user_id', '==', params.user_id);
          }
        }
      } else {
        if (params?.user_id) {
          query = query.where('user_id', '==', params.user_id);
        }
      }

      const document = await query.orderBy('date_recorded', 'asc').get();

      if (!document.size) {
        throw new Error('No data');
      }

      // workout
      const workoutData = await this.firebaseService.workoutCol.get();

      const workouts = [];
      await workoutData.forEach((doc) => {
        workouts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // routine
      const routineData = await this.firebaseService.routineCol.get();

      const routines = [];
      await routineData.forEach((doc) => {
        const workoutByRoutineId = workouts.filter(
          (it) => it.routine_id === doc.id,
        );
        routines.push({
          id: doc.id,
          ...doc.data(),
          workouts: workoutByRoutineId,
        });
      });

      const datas = [];
      await document.forEach((doc) => {
        const routineByCategoryId = routines.filter(
          (it) => it.category_id === doc.id,
        );
        datas.push({
          id: doc.id,
          ...doc.data(),
          routines: routineByCategoryId,
        });
      });

      return datas;
    } catch (error) {
      console.log('error', error);
      return [];
    }
  }

  async findOne(id: string): Promise<Category> {
    try {
      const response = await this.firebaseService.categoryCol.doc(id).get();
      const data = response.data() as Category;

      return {
        ...data,
        id,
      };
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateDto: UpdateCategoryDto): Promise<string> {
    try {
      await this.firebaseService.categoryCol.doc(id).update({ ...updateDto });

      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async remove(id: string): Promise<string> {
    try {
      await this.firebaseService.categoryCol.doc(id).delete();
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }
}
