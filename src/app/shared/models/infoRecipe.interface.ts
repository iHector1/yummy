import { Time } from "@angular/common";  //obvio aqui

export interface infoRecipe{
  uid?: string;
  title?: string;
  cookTime?:Time;   //aqui
  uidsIngredients?: string[];
  uidUnit?: string[]; //aqui
  uidsCookWare?: string[];
  uidCategory?: string;
  uidRegion?: string;
  uidCollection?: string;
  uidSeason?: string;
  steps?: string[];
  stepsPhoto?: string[];
  uidsTechnique?: string[];
  portions?: number;
  portionCalories?: boolean;
  urlVideo?: string;
  timeStamp?: Date;  //aqui
  stars?: number;
}
