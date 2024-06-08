import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 as uuidV4 } from 'uuid';
import { Workout } from './entities/workout.entity';
import { generateError } from 'src/utils/generate-error';
import { QueryWorkoutDto } from './dto/query-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private firebaseService: FirebaseService) {}

  async create(createDto: CreateWorkoutDto): Promise<string> {
    try {
      const id = uuidV4();
      await this.firebaseService.workoutCol.doc(id).set({ ...createDto });
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async findAll(params: QueryWorkoutDto): Promise<Workout[]> {
    try {
      let query: any = this.firebaseService.workoutCol.orderBy(
        'date_recorded',
        'asc',
      );

      if (params?.routine_id) {
        query = query.where('routine_id', '==', params.routine_id);
      }

      const document = await query.get();

      if (!document.size) {
        throw new Error('No data');
      }

      const datas = [];
      await document.forEach((doc) => {
        datas.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return datas;
    } catch (error) {
      console.log('error', error);
      return [];
    }
  }

  async findOne(id: string): Promise<Workout> {
    try {
      const response = await this.firebaseService.workoutCol.doc(id).get();
      const data = response.data() as Workout;

      return {
        ...data,
        id,
      };
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateDto: UpdateWorkoutDto): Promise<string> {
    try {
      await this.firebaseService.workoutCol.doc(id).update({ ...updateDto });

      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async remove(id: string): Promise<string> {
    try {
      await this.firebaseService.workoutCol.doc(id).delete();
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }
}
