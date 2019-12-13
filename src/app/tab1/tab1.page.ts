import { Component, OnInit } from '@angular/core';
import { KeyService } from '../services/key/key.service';
import { KeyStorageService } from '../services/key-storage/key-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  theKey: string;

  constructor(private keyStorage: KeyStorageService) {}

  async ngOnInit() {
    this.theKey = await this.keyStorage.get();
  }
}
