import { Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 as uuidV4 } from 'uuid';
import { Progress } from './entities/progress.entity';
import { generateError } from 'src/utils/generate-error';
import { QueryProgressDto } from './dto/query-progress.dto';

@Injectable()
export class ProgressService {
  constructor(private firebaseService: FirebaseService) {}

  async create(createDto: CreateProgressDto): Promise<string> {
    try {
      const id = uuidV4();
      await this.firebaseService.progressCol.doc(id).set({ ...createDto });
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async findAll(params: QueryProgressDto): Promise<Progress[]> {
    try {
      let query: any = this.firebaseService.progressCol;

      if (params?.user_id) {
        query = query
          .where('user_id', '==', params.user_id)
          .orderBy('date_recorded', 'desc');
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
      return [];
    }
  }

  async findOne(id: string): Promise<Progress> {
    try {
      const response = await this.firebaseService.progressCol.doc(id).get();
      const data = response.data() as Progress;

      return {
        ...data,
        id,
      };
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateDto: UpdateProgressDto): Promise<string> {
    try {
      await this.firebaseService.progressCol.doc(id).update({ ...updateDto });

      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async remove(id: string): Promise<string> {
    try {
      await this.firebaseService.progressCol.doc(id).delete();
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }
}
