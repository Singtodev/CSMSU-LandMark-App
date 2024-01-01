import { Injectable } from '@angular/core';
import { LandMark } from '../../components/landmarks/landmarks.component';
import jsonData from '../../../assets/landmarks.json';
@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor() { }

  public allLandMark = jsonData;
  public travelTemp: LandMark = {};

  public setTravelActive(index: number){
      console.log(index);
      this.travelTemp = this.allLandMark.filter((i) => i.idx === index)[0] || {};
  }
  
  public getTravelTemp(): LandMark {
    return this.travelTemp;
  }
  
}
