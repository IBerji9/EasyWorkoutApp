import { Transform } from 'class-transformer';
import * as moment from 'moment';

export class Progress {
  id: string;
  value: number;

  @Transform(({ value }) => {
    return moment(value._seconds * 1000).format('YYYY-MM-DD HH:mm:ss');
  })
  date_recorded: string;

  user_id: string;

  constructor(partial: Partial<Progress>) {
    Object.assign(this, partial);
  }
}
