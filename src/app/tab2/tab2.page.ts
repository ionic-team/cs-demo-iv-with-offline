import { Component } from '@angular/core';
import { dataKeys } from '../models/data-keys';
import { DatabaseService } from '../services/database/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  info: Array<{ label: string; data: string }>;

  constructor(private database: DatabaseService) {}

  async ionViewDidEnter() {
    this.info = [];
    dataKeys.forEach(async key => {
      this.info.push({
        label: key.label,
        data: await this.database.get(key.key),
      });
    });
  }
}
