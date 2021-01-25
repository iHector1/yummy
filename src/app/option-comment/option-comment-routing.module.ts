import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionCommentComponent } from './option-comment.component';

const routes: Routes = [{ path: '', component: OptionCommentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionCommentRoutingModule { }
