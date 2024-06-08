import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 as uuidV4 } from 'uuid';
import { Routine } from './entities/routine.entity';
import { generateError } from 'src/utils/generate-error';
import { QueryRoutineDto } from './dto/query-routine.dto';

@Injectable()
export class RoutineService {
  constructor(private firebaseService: FirebaseService) {}

  async create(createDto: CreateRoutineDto): Promise<string> {
    try {
      const id = uuidV4();
      await this.firebaseService.routineCol.doc(id).set({ ...createDto });
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async findAll(params: QueryRoutineDto): Promise<Routine[]> {
    try {
      let query: any = this.firebaseService.routineCol.orderBy(
        'date_recorded',
        'asc',
      );

      if (params.category_id) {
        query = query.where('category_id', '==', params.category_id);
      }

      const document = await query.get();

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

      const datas = [];
      await document.forEach((doc) => {
        const workoutByRoutineId = workouts.filter(
          (it) => it.routine_id === doc.id,
        );
        datas.push({
          id: doc.id,
          ...doc.data(),
          workouts: workoutByRoutineId,
        });
      });

      return datas;
    } catch (error) {
      console.log('error', error);
      return [];
    }
  }

  async findOne(id: string): Promise<Routine> {
    try {
      const response = await this.firebaseService.routineCol.doc(id).get();
      const data = response.data() as Routine;

      return {
        ...data,
        id,
      };
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateDto: UpdateRoutineDto): Promise<string> {
    try {
      await this.firebaseService.routineCol.doc(id).update({ ...updateDto });

      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async remove(id: string): Promise<string> {
    try {
      await this.firebaseService.routineCol.doc(id).delete();
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }
}
