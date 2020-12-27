import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRecipesRoutingModule } from './search-recipes-routing.module';
import { SearchRecipesComponent } from './search-recipes.component';
import { SearchComponent } from './search/search.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { FilterSeasonPipe } from './pipes/filter-season.pipe';
import { FilterRegionPipe } from './pipes/filter-region.pipe';
import { FilterCollectionPipe } from './pipes/filter-collection.pipe';

@NgModule({
  declarations: [SearchRecipesComponent, SearchComponent, FilterPipe,  FilterCategoryPipe, FilterSeasonPipe, FilterRegionPipe, FilterCollectionPipe],
  imports: [
    CommonModule,
    SearchRecipesRoutingModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class SearchRecipesModule { }
 