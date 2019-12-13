import { Component } from '@angular/core';
import { dataKeys } from '../models/data-keys';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  keyList = dataKeys;

  constructor() {}

}
