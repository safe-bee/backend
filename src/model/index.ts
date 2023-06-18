import knex from "knex";
import User from "./User";
import configs from "../database/knexfile";

const database = knex(configs);

const user: User = new User(database);

const models = {
  user,
};

export default models;
