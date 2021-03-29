import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type recipeSearchT = {
  q: string;
  from: number;
  to: number;
  more: boolean;
  count: number;
  hits: recipeSearchHitT[];
};

export type recipeSearchHitT = {
  recipe: recipeT;
  bookmarked: false;
  bought: false;
};

export type ingredientT = {
  text: string;
  weight: number;
  image: string | null;
};

export type nutritientT = {
  label: string;
  quantity: number;
  unit: string;
};

export type totalNutrientT = {
  ENERC_KCAL: nutritientT;
  FAT: nutritientT;
  FASAT: nutritientT;
  FATRN: nutritientT;
  FAMS: nutritientT;
  FAPU: nutritientT;
  CHOCDF: nutritientT;
  FIBTG: nutritientT;
  SUGAR: nutritientT;
  PROCNT: nutritientT;
  CHOLE: nutritientT;
  NA: nutritientT;
  CA: nutritientT;
  MG: nutritientT;
  K: nutritientT;
  FE: nutritientT;
  ZN: nutritientT;
  P: nutritientT;
  VITA_RAE: nutritientT;
  VITC: nutritientT;
  THIA: nutritientT;
  RIBF: nutritientT;
  NIA: nutritientT;
  VITB6A: nutritientT;
  FOLDFE: nutritientT;
  FOLFD: nutritientT;
  FOLAC: nutritientT;
  VITB12: nutritientT;
  VITD: nutritientT;
  TOCPHA: nutritientT;
  VITK1: nutritientT;
  WATER: nutritientT;
};

export type totalDailyT = {
  ENERC_KCAL: nutritientT;
  FAT: nutritientT;
  FASAT: nutritientT;
  CHOCDF: nutritientT;
  FIBTG: nutritientT;
  PROCNT: nutritientT;
  CHOLE: nutritientT;
  NA: nutritientT;
  CA: nutritientT;
  MG: nutritientT;
  K: nutritientT;
  FE: nutritientT;
  ZN: nutritientT;
  P: nutritientT;
  VITA_RAE: nutritientT;
  VITC: nutritientT;
  THIA: nutritientT;
  RIBF: nutritientT;
  NIA: nutritientT;
  VITB6A: nutritientT;
  FOLDFE: nutritientT;
  VITB12: nutritientT;
  VITD: nutritientT;
  TOCPHA: nutritientT;
  VITK1: nutritientT;
};

export type digestT = {
  label: string;
  tag: string;
  schemaOrgTag: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
  sub?: subDigestT[];
};

export type subDigestT = {
  label: string;
  tag: string;
  schemaOrgTag: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
};

export type recipeT = {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: ingredientT[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  totalNutrients: totalNutrientT;
  totalDaily: totalDailyT;
  digest: digestT[];
  isFavorite?: boolean;
  dishType: string[];
  mealType: string[];
};

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getRecipeSearch(query: string): Observable<recipeSearchT> {
    return this.http.get<recipeSearchT>(
      `https://api.edamam.com/search?q=${query}&app_id=${environment.app_id}&app_key=${environment.app_key}`
    );
  }
}
