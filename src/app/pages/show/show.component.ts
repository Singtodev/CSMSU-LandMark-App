import { LandMark } from './../../components/landmarks/landmarks.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GlobalService } from '../../services/global.service';
@Component({
  selector: 'app-show',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements OnInit {

  public landMark: LandMark = {};

  constructor(
    private readonly globalSrv: GlobalService
  ){
    
  }

  ngOnInit(): void {
    try {
      this.landMark = this.globalSrv.tv.getTravelTemp();
    } catch (error) {
      console.error(error);
    }
  }
  
}
