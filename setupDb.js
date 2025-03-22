import knex from "knex";
import { Model } from "objection";
import dev from './knexfile.js';

export default async () => {
  const db = knex(dev());
  Model.knex(db);
}