export class Exercise {
  id: string;
  content: string;

  constructor(partial: Partial<Exercise>) {
    Object.assign(this, partial);
  }
}
