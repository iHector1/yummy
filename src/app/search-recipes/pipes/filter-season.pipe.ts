import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSeason'
})
export class FilterSeasonPipe implements PipeTransform {

  transform(value: any,arg: any):any{
    if (arg === '') return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.uidSeason == arg) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
