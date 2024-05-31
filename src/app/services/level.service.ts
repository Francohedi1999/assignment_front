import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor() { }

  levels = [
    { option: "L1 Informatique" , value:"L1 Informatique" } ,
    { option: "L2 Informatique" , value:"L2 Informatique" } ,
    { option: "L3 Informatique" , value:"L3 Informatique" } ,
    { option: "M1 Informatique" , value:"M1 Informatique" } ,
    { option: "M2 MBDS" , value:"M2 MBDS" } ,
    { option: "M2 BIHAR" , value:"M2 BIHAR" } ,
    { option: "L1 Design" , value:"L1 Design" } ,
    { option: "L2 Design" , value:"L2 Design" } ,
    { option: "L1 Mathématiques" , value:"L1 Mathématiques" }
  ] ;
}
