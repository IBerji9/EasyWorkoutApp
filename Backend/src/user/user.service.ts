import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from '../config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { generateError } from 'src/utils/generate-error';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 as uuidV4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private firebaseService: FirebaseService) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
    }
    const id = uuidV4();
    try {
      await this.firebaseService.userCol.doc(id).set({ ...createUserDto });
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async findAll(
    params: QueryUserDto,
  ): Promise<{ rows: User[]; count: number }> {
    try {
      // const res = await this.userModel.findAndCountAll({
      //   ...query,
      //   order,
      // });
      return {
        rows: [],
        count: 0,
      };
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const userData = await this.firebaseService.userCol.doc(id).get();
      const user = userData.data() as User;

      return {
        ...user,
        id,
      };
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
    }

    try {
      await this.firebaseService.userCol.doc(id).update({ ...updateUserDto });

      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async remove(id: string): Promise<string> {
    try {
      await this.firebaseService.userCol.doc(id).delete();
      return id;
    } catch (error) {
      throw new Error(generateError(error));
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const document = await this.firebaseService.userCol
        .where(`email`, '==', email)
        .get();

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

      return datas[0];
    } catch (error) {
      return null;
    }
  }
}
