import { Component, OnInit } from '@angular/core';
import { dataKeys } from '../models/data-keys';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  keyList = dataKeys;
  dataKey: string;
  data: string;

  constructor() {}

  async ngOnInit() {}

  save() {
    console.log('key:', this.dataKey);
    console.log('data:', this.data);
  }
}
