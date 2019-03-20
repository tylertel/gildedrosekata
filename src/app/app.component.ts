import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { GildedRoseService } from './gilded-rose.service';
import { Day } from './day';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items:Item[] = [];
  dayLog: Day[];
  days: number = 2;
  
constructor(private _gildedRoseSvc: GildedRoseService){

}

  ngOnInit(): void {
    this.dayLog = this._gildedRoseSvc.dayLog;
  }

  clearLog(){
    this._gildedRoseSvc.clearMessages();
    this.updateGildedRose();
  }

  initGR(){
    this._gildedRoseSvc.initiateGildedRose(this.days);
    this.updateGildedRose();
  }

  updateGildedRose(){
    this.dayLog = this._gildedRoseSvc.dayLog;
  }

}
