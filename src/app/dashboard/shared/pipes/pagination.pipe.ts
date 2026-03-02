import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginationPages'
})
export class PaginationPagesPipe implements PipeTransform {
  transform(total: number, pageSize: number): number {
    if (!total || !pageSize) return 0;
    return Math.ceil(total / pageSize);
  }
}