import { Component, OnInit } from '@angular/core';
import { dataKeys } from '../models/data-keys';
import { DatabaseService } from '../services/database/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  keyList = dataKeys;
  dataKey: string;
  data: string;

  constructor(private database: DatabaseService) {}

  async ngOnInit() {}

  async save() {
    await this.database.set(this.dataKey, this.data);
    this.dataKey = undefined;
    this.data = undefined;
  }
}
