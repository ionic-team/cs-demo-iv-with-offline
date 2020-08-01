import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    if (this.platform.is('hybrid')) {
      StatusBar.setStyle({ style: StatusBarStyle.Light });
      SplashScreen.hide();
    }
  }
}
