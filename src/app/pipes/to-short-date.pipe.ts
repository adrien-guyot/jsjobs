import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toShortDate'
})
export class ToShortDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    if(value.toLowerCase() === 'asap') {
      return 'dès que possible';
    } else if(value.indexOf('-') > -1) {
      let fullDate, rest;
      [fullDate, rest] = value.toLowerCase().split('t');   //2017-06-01T10:23:32Z

      let year, month, date;
      [year, month, date] = fullDate.split('-');          // ['2017', '06', '01']

      return `${date}/${month}/${year}`;
    } else {
      return '--';
    }
  }

}
