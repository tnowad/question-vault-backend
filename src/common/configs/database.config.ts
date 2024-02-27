const databaseConfig = () => ({
  database: {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
  },
});

export default databaseConfig;
