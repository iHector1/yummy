import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(value: any,arg: any):any{
    if (arg === '') return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.uidCategory == arg) {
        console.log(post.uidCategory)
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
