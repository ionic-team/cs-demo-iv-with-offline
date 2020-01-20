# Ionic Customer Success Demo - Offline with Identity Vault

The scenario being modeled here is one where the user has an encrypted database. The encryption key for the database is initially obtained from a backend API (simulated). At that time it is stored in Identity Vault using "Secure Storage" mode. The application only tries to obtain the encryption key from the API if it cannot be found in the vault.

The application itself allows the user to enter data on the first page. It can then be displayed on the second page.

## Getting Started

Follow all the normal steps:

1. clone the repo
1. install your own `.npmrc` file from one of your production projects
1. `npm i`
1. `ionic cordova run android` etc.

This application takes advantage of a couple of `@ionic-enterprise` solutions. Thus you need to have purchased access to those solutions and have a valid enterprise key in order to try this application.

## Setup

Have a look at the `app.module.ts` file and note that the `SQLite` service needed to be provided. That is the only setup required.

## Services

### KeyService

This service simply simulates getting an encryption key from an API. In a real application this would likely hit some HTTP endpoint.

### KeyStorageService

This service is used to get the encryption key for the database. It will first query the vault to see if the key exists. If it does not, it will obtain the key from the API and store it in the vault for the next time.

```TypeScript
  async get(): Promise<string> {
    const vault = await this.getVault();
    let dbKey = await vault.getValue(this.key);
    if (!dbKey) {
      dbKey = await this.keyService.get();
      this.set(dbKey);
    }
    return dbKey;
  }
```

### Database

The database service in this case provides a simple `get()` and `set()` interface to store key-value pairs. All data is stored in a single table called `TestTable`.

#### Startup Code

When the database service is created, the schema must be initialized. As you can see from the code, the is basically a two step process. First the database is openned, next the tables are created if they do not exist.

```TypeScript
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
```

##### Open the Database

First we call the `KeyStorageService` to get the key, then we pass that to the SQLite `create()` method so our database is encrypted.

```TypeScript
  private async open(): Promise<void> {
    const key = await this.keyStorage.get();
    this.handle = await this.sqlite.create({
      name: 'mytestdatabase.db',
      location: 'default',
      key
    });
  }
```

This application keeps the database open throughtout its whole lifetime.

##### Create the Table(s)

This app currently only has one table. Obviously this could be expanded to include multiple tables if need be, but that is not the case when doing simple `get()` and `set()` of key-value pairs like this application is doing.

This may be a bit overly-abstracted out, but if you end up adding extra tables it makes that much nicer.

```TypeScript
  private createTables(transaction: DbTransaction): void {
    const id = { name: 'id', type: 'TEXT PRIMARY KEY' };
    const name = { name: 'name', type: 'TEXT' };
    transaction.executeSql(this.createTableSQL('TestData', [id, name]));
  }

  private createTableSQL(name: string, columns: Array<Column>): string {
    let cols = '';
    columns.forEach((c, i) => {
      cols += `${i ? ', ' : ''}${c.name} ${c.type}`;
    });
    return `CREATE TABLE IF NOT EXISTS ${name} (${cols})`;

```

#### Setting the Data

This code will wait for the database to be ready, remove any data currently stored with the specified `key` and save the current data with that `key':

```TypeScript
  async set(key: string, value: string): Promise<void> {
    await this.ready();
    this.handle.transaction(tx => {
      tx.executeSql('DELETE from TestData WHERE id = ?', [key]);
      tx.executeSql('INSERT INTO TestData (id, name) values (?, ?)', [key, value]);
    });
  }
```

#### Getting the Data

This code will wait for the database to be ready, query the database for the specified key, and return the stored value if any.

```TypeScript
  async get(key: string): Promise<string> {
    await this.ready();
    const data = await this.handle.executeSql('SELECT name from TestData WHERE id = ?', [key]);
    return data.rows.length ? data.rows.item(0).name : undefined;
  }
```

## Using the Offline-Storage Database

A couple of pages in the application consume the database service that wraps up Offline-Storage.

### Tab1Page

The Tab1Page saves the data that the user enters.

```TypeScript
  async save() {
    await this.database.set(this.dataKey, this.data);
    this.dataKey = undefined;
    this.data= undefined;
  }
```

### Tab2Page

The Tab2Page displays the data that the user has entered.

```TypeScript
  async ionViewDidEnter() {
    this.info = [];
    dataKeys.forEach(async key => {
      this.info.push({
        label: key.label,
        data: await this.database.get(key.key)
      });
    });
  }
```

## Conslusion

That is pretty much all there is to it. Happy Coding!!
