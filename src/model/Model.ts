export default class Model {
  database: (table: string) => any;

  table: string;

  constructor(database: any, table: string) {
    this.database = database;
    this.table = table;
  }

  all(): Object {
    return this.database(this.table).select();
  }

  find(conditions: string): Object {
    return this.database(this.table).where(conditions).select();
  }

  findOne(conditions: string): Object {
    return this.database(this.table).where(conditions).first();
  }

  findById(id: string): Object {
    return this.database(this.table).where({ id }).select().first();
  }

  insert(values): Object {
    return this.database(this.table).insert(values);
  }
}
