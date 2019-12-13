import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, DbTransaction } from '@ionic-enterprise/offline-storage/ngx';
import { KeyStorageService } from '../key-storage/key-storage.service';

interface Column {
  name: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private handle: SQLiteObject;
  private readyPromise: Promise<boolean>;
  private isReady = false;

  constructor(private keyStorage: KeyStorageService, private sqlite: SQLite) {
    this.readyPromise = this.initializeSchema();
  }

  private async initializeSchema(): Promise<boolean> {
    await this.open();
    return this.handle
      .transaction(tx => {
        this.createTables(tx);
      })
      .then(() => {
        this.isReady = true;
        return true;
      });
  }

  private async open(): Promise<void> {
    const key = await this.keyStorage.get();
    this.handle = await this.sqlite.create({
      name: 'mytestdatabase.db',
      location: 'default',
      key
    });
  }

  private createTables(transaction: DbTransaction): void {
    const id = { name: 'id', type: 'TEXT PRIMARY KEY' };
    const name = { name: 'name', type: 'TEXT' };
    transaction.executeSql(
      this.createTableSQL('TestData', [id, name])
    );
  }

  private createTableSQL(name: string, columns: Array<Column>): string {
    let cols = '';
    columns.forEach((c, i) => {
      cols += `${i ? ', ' : ''}${c.name} ${c.type}`;
    });
    return `CREATE TABLE IF NOT EXISTS ${name} (${cols})`;
  }

  private async ready(): Promise<boolean> {
    if (!this.isReady) {
      await this.readyPromise;
    }
    return true;
  }
}
