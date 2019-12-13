import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthMode, IonicIdentityVaultUser } from '@ionic-enterprise/identity-vault';

@Injectable({
  providedIn: 'root'
})
export class KeyStorageService extends IonicIdentityVaultUser<any> {
  private key = 'encryption-key';

  constructor(platform: Platform) {
    super(platform, {
      restoreSessionOnReady: false,
      unlockOnReady: false,
      unlockOnAccess: false,
      lockAfter: 5000,
      hideScreenOnBackground: false,
      authMode: AuthMode.SecureStorage
    });
  }

  async set(value: string): Promise<void> {
    const vault = await this.getVault();
    await vault.storeValue(this.key, value);
  }

  async get(): Promise<string> {
    const vault = await this.getVault();
    return vault.getValue(this.key);
  }
}
