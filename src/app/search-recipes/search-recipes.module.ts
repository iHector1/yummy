import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRecipesRoutingModule } from './search-recipes-routing.module';
import { SearchRecipesComponent } from './search-recipes.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';


@NgModule({
  declarations: [SearchRecipesComponent, SearchComponent, ResultsComponent],
  imports: [
    CommonModule,
    SearchRecipesRoutingModule,
    AngularMaterialModule
  ]
})
export class SearchRecipesModule { }
