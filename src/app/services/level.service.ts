import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor() { }

  levels = [
    { option: "L1" , value:"L1" } ,
    { option: "L2" , value:"L2" } ,
    { option: "L3" , value:"L3" } ,
    { option: "M1" , value:"M1" } ,
    { option: "M2" , value:"M2" } ,
  ] ;
}
