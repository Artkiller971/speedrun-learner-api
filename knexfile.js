import { knexSnakeCaseMappers } from "objection";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrations = {
  directory: path.join(__dirname, 'migrations'),
};

export default() =>({
  client: 'sqlite3',
  connection: {
    filename: './db/dev.db',
  },
  migrations,
  useNullAsDefault: true,
  seeds: {
    directory: './seeds'
  },
  ...knexSnakeCaseMappers,
})
