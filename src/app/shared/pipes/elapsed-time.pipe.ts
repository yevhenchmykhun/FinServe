import { Pipe, PipeTransform } from '@angular/core';
import { getElapsedTimeAsString } from 'src/app/core/util/util';

@Pipe({
  name: 'elapsedTime',
  pure: true
})
export class ElapsedTimePipe implements PipeTransform {

  transform(value: number): string {
    return getElapsedTimeAsString(value);
  }

}
