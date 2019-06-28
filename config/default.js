const config = {
  user: 'sa',
  password: 'mssql',
  server: 'localhost',
  port: 6213,
  database: 'shenshuimingMIS21',
  pool: {
      max: 50,
      min: 0,
      idleTimeoutMillis: 30000
  }
}

module.exports=config