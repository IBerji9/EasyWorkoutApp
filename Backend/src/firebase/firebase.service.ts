import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  userCol: FirebaseFirestore.CollectionReference;
  categoryCol: FirebaseFirestore.CollectionReference;
  routineCol: FirebaseFirestore.CollectionReference;
  workoutCol: FirebaseFirestore.CollectionReference;
  progressCol: FirebaseFirestore.CollectionReference;
  exerciseCol: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.userCol = firebaseApp.firestore().collection('user');
    this.categoryCol = firebaseApp.firestore().collection('category');
    this.routineCol = firebaseApp.firestore().collection('routine');
    this.workoutCol = firebaseApp.firestore().collection('workout');
    this.progressCol = firebaseApp.firestore().collection('progress');
    this.exerciseCol = firebaseApp.firestore().collection('exercise');
  }
}
