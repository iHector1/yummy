import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCollection'
})
export class FilterCollectionPipe implements PipeTransform {

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
