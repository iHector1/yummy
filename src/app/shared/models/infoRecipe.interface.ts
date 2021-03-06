import { Time } from "@angular/common";  //obvio aqui

export interface infoRecipe{
  uid?: string;
  title?: string;
  uidUser?: string;
  cookTime?:number;   //aqui
  uidsIngredients?: string[];
  principalPhoto?: string;
  uidUnit?: string[]; //aqui
  uidsCookWare?: string[];
  uidCategory?: string;
  uidRegion?: string;
  uidCollection?: string;
  uidSeason?: string;
  steps?: string[];
  kitchenArea?: string;
  count?: string[];
  stepsPhoto?: string[];
  video?: string[];
  uidsTechnique?: string[];
  portions?: number;
  portionCalories?: number; 
  urlVideo?: string;
  points?: number;
  timeStamp?: Date;  //aqui
  stars?: number;
  request?: string[];
  reports?: string[];
  recipePremium?: boolean;
}
 