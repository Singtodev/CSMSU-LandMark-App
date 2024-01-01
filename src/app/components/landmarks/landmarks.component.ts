import { Component, OnInit } from '@angular/core';
import jsonData from '../../../assets/landmarks.json';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { FormsModule } from '@angular/forms';


export interface LandMark {
  idx?:     number;
  name?:    string;
  country?: String;
  detail?:  string;
  url?:     string;
}

@Component({
  selector: 'app-landmarks',
  standalone: true,
  imports: [CommonModule , RouterModule , FormsModule],
  templateUrl: './landmarks.component.html',
  styleUrl: './landmarks.component.scss'
})
export class LandmarksComponent implements OnInit {

  public allLandMarks: LandMark[] = jsonData;
  public filterLandMark: LandMark[] = jsonData;
  public filterTemp: LandMark[] = jsonData;
  public message: string = "ข้อมูลเริ่มต้น";
  public activateIndex: number | any;
  public keyword: string | any;
  public country: string | any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly globalSrv: GlobalService
  ){
    // when component did mount
  }

  ngOnInit(): void {
    this.retriveState();
  }


  public retriveState(): void {
    let preState = this.globalSrv.st.getPreviousState();
    if(preState && preState.searchParams){
        this.activateIndex = preState.searchParams.index;
        this.keyword = preState.searchParams.keyword;
        this.country = preState.searchParams.country;
        this.filterLandMark = preState.fiterLandMark.length > 0 ? preState.fiterLandMark : this.allLandMarks
    }
  }

  // function find land mark by id
  public findLandMarkOne(landmark: HTMLInputElement| any): void{
    // init array
    this.filterLandMark = [];
    // check empty string
    if(landmark.value.length == 0) {
      this.filterLandMark = this.allLandMarks;
      this.message ="ข้อมูลเริ่มต้น"
      return;
    }
    // parse string to number
    let landMarkId = Number(landmark.value || landmark);
    // validation code this is number
    if(typeof(landMarkId) === "number" && landMarkId >= 0){
      // find landmark by array filter and get current one index
      let findLandMark = this.allLandMarks.filter((landmark: LandMark) => landmark.idx === landMarkId);
      // is found or not found section
      if(findLandMark.length > 0){
        this.filterLandMark = [findLandMark[0]];
           // save previous state when you call back get this
          this.globalSrv.savePrevState({
            searchParams: {
              index: findLandMark[0].idx,
            },
            fiterLandMark: this.filterLandMark
          })
        this.message ="พบข้อมูล"
      }else{
        this.message ="ไม่พบข้อมูลขอแนะนำลองใหม่อีกครั้ง"
        this.filterLandMark = [];
      }
    }
  }

  public findLandMarkByName(search: HTMLInputElement | any){
      let keyword = search.value;
      this.keyword = keyword;
      if(keyword.length == 0) {
        this.filterLandMark = this.allLandMarks;
        this.message ="ข้อมูลเริ่มต้น"
        return;
      }
      let landmarks: LandMark[] = [];
      this.allLandMarks.map((landmark: LandMark) => {
          if(landmark?.name?.match(keyword)){
            landmarks.push(landmark);
          }
          return;
      })
      if(landmarks != null){
          this.filterLandMark = landmarks;
          if(landmarks.length > 0 ){
            this.message ="พบข้อมูล"
          }else{
            this.message ="ไม่พบข้อมูล"
          }
      }else{
        this.message ="ไม่พบข้อมูลขอแนะนำลองใหม่อีกครั้ง"
        this.filterLandMark = [];
      }
      this.globalSrv.savePrevState({
        searchParams: {
          keyword: this.keyword,
        },
        fiterLandMark: this.filterLandMark
      })
  }

  // function find by category
  public findLandMarkByCategory(keyword: HTMLSelectElement | any){
      this.country = keyword.value;
      let landmarks: LandMark[] = [];
      this.allLandMarks.map((landmark: LandMark)=> {
          if(landmark.country === keyword.value){
            landmarks.push(landmark);
          }
      })
      this.filterLandMark = landmarks;
      this.globalSrv.savePrevState({
        searchParams: {
          country: this.country
        },
        fiterLandMark: this.filterLandMark
      })
  }


  // function get current data json to string
  public getLandMarkJSONString(): string{
    return JSON.stringify(this.filterLandMark);
  }


  // function for get all country in landmarks
  public getLandMarkCountry(): String[]{
    let country: any = {};
    this.allLandMarks.map((landmark: LandMark)=> {
        if(!country[String(landmark.country)]){
            country[String(landmark.country)] = {};
        }
    })
    return Object.keys(country);
  }

/**
 * Opens the detail page for a specific landmark.
 * @param id - The ID of the landmark.
 */

  public openLandMarkDetail(id: number): void {
    this.globalSrv.tv.setTravelActive(id);
    this.router.navigate(['/','show']);
  }
}
