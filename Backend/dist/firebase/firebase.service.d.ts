import { app } from 'firebase-admin';
export declare class FirebaseService {
    private firebaseApp;
    userCol: FirebaseFirestore.CollectionReference;
    categoryCol: FirebaseFirestore.CollectionReference;
    routineCol: FirebaseFirestore.CollectionReference;
    workoutCol: FirebaseFirestore.CollectionReference;
    progressCol: FirebaseFirestore.CollectionReference;
    exerciseCol: FirebaseFirestore.CollectionReference;
    constructor(firebaseApp: app.App);
}
