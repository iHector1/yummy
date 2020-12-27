import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRegion'
})
export class FilterRegionPipe implements PipeTransform {

  transform(value: any,arg: any):any{
    if (arg === '') return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.uidRegion == arg) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
