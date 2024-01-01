import { Injectable } from '@angular/core';
import { TravelService } from './shares/travel.service';
import { State, StateManagementService } from './shares/state-management.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(
    public tv: TravelService,
    public st: StateManagementService
  ) { }
  
  public savePrevState(state: State): void{
    this.st.setParams(state,"prev");
  }

  public saveCurrentState(state: State): void{
    this.st.setParams(state,"prev");
  }

}
