import 'dotenv/config';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_PG_HOST,
	port: Number(process.env.DB_PG_PORT),
	username: process.env.DB_PG_USERNAME,
	password: process.env.DB_PG_PASSWORD,
	database: process.env.DB_PG_DATABASE,
	schema: process.env.DB_SCHEMA,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	migrations: [__dirname + '/migrations/*{.ts,.js}'],
	synchronize: process.env.NODE_ENV === 'development',
});

export default dataSource;
