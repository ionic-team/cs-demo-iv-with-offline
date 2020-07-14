import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import {
  AuthMode,
  IonicIdentityVaultUser,
} from '@ionic-enterprise/identity-vault';
import { KeyService } from '../key/key.service';

@Injectable({
  providedIn: 'root',
})
export class KeyStorageService extends IonicIdentityVaultUser<any> {
  private key = 'encryption-key';

  constructor(platform: Platform, private keyService: KeyService) {
    super(
      platform,
      {
        restoreSessionOnReady: false,
        unlockOnReady: false,
        unlockOnAccess: true,
        lockAfter: 5000,
        hideScreenOnBackground: false,
        authMode: AuthMode.SecureStorage,
      },
      {
        username: 'MyDefaultUser',
        vaultId: 'dbEncryptionKeyVault',
      },
    );
  }

  async get(): Promise<string> {
    const vault = await this.getVault();
    let dbKey = await vault.getValue(this.key);
    if (!dbKey) {
      dbKey = await this.keyService.get();
      this.set(dbKey);
    }
    return dbKey;
  }

  async clear(): Promise<void> {
    const vault = await this.getVault();
    await vault.storeValue(this.key, undefined);
  }

  private async set(value: string): Promise<void> {
    const vault = await this.getVault();
    await vault.storeValue(this.key, value);
  }
}
