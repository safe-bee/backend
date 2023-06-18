import Model from "./Model";

export default class User extends Model {
  constructor(database) {
    super(database, "users");
  }
}
