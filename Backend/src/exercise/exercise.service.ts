import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { generateError } from 'src/utils/generate-error';
import { v4 as uuidV4 } from 'uuid';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(private firebaseService: FirebaseService) {}

  async create(createDto: CreateExerciseDto): Promise<string> {
    try {
      const id = uuidV4();
      await this.firebaseService.exerciseCol.doc(id).set({ ...createDto });
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async findAll(): Promise<Exercise[]> {
    try {
      const document = await this.firebaseService.exerciseCol.get();

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
      return [];
    }
  }

  async findOne(id: string): Promise<Exercise> {
    try {
      const response = await this.firebaseService.exerciseCol.doc(id).get();
      const data = response.data() as Exercise;

      return {
        ...data,
        id,
      };
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateDto: UpdateExerciseDto): Promise<string> {
    try {
      await this.firebaseService.exerciseCol.doc(id).update({ ...updateDto });

      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async remove(id: string): Promise<string> {
    try {
      await this.firebaseService.exerciseCol.doc(id).delete();
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }
}
