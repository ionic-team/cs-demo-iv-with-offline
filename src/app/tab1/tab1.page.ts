import { Component, OnInit } from '@angular/core';
import { KeyService } from '../services/key/key.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  theKey: string;

  constructor(private key: KeyService) {}

  async ngOnInit() {
    this.theKey = await this.key.get();
  }
}
