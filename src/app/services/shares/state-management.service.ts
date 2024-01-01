import { Injectable } from '@angular/core';
import { LandMark } from '../../components/landmarks/landmarks.component';



interface SearchParams {
  index?: number
  keyword?: string
  country?: string
}

export interface State {
  searchParams?: SearchParams,
  fiterLandMark: LandMark[]
}

@Injectable({
  providedIn: 'root'
})

export class StateManagementService {

  public searchParamsPrev = {}
  public searchParamsCurrent = {}
  public fiterLandMarkPrev: LandMark[] = [];
  public fiterLandMarkCurrent: LandMark[] = [];
  constructor() { }

  public setParams(state: State , type: string){
    switch(type){
      case "prev":
        this.searchParamsPrev = { ...this.searchParamsPrev , ...state.searchParams};
        this.fiterLandMarkPrev = state.fiterLandMark;
        break;
      case "current":
        this.searchParamsCurrent = {...this.searchParamsCurrent, ...state.searchParams};
        this.fiterLandMarkPrev = state.fiterLandMark;
        break;
      default:
        break;
    }
  }

  public getPreviousState(): State {
    return {
      searchParams: this.searchParamsPrev,
      fiterLandMark: this.fiterLandMarkPrev
    }
  }

  public getCurrentState(): State {
    return {
      searchParams: this.searchParamsCurrent,
      fiterLandMark: this.fiterLandMarkCurrent
    }
  } 
}
