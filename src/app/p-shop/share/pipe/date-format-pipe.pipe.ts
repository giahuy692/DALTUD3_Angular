import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateFormatPipe',
})
export class DateFormatPipePipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month} ${year}`;
  }
}
