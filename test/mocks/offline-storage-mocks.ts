export function createSQLiteMock() {
  return jasmine.createSpyObj('SQLite', {
    create: Promise.resolve(),
  });
}

export function createSQLiteObjectMock() {
  return jasmine.createSpyObj('SQLiteObject', {
    transaction: Promise.resolve(),
  });
}

export function createSQLiteTransactionMock() {
  return jasmine.createSpyObj('SQLiteTransaction', {
    executeSql: Promise.resolve(),
  });
}
