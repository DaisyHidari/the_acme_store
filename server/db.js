const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL || 'postgres://localhost/the_acme_store'
);

const uuid = require('uuid');
const bcrypt = require('bcrypt');

const createTables = async () => {
    const SQL = /* sql */ `
      DROP TABLE IF EXISTS favorites;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
  
      CREATE TABLE users(
        id uuid PRIMARY KEY,
        username VARCHAR(50),
        password VARCHAR(255)
      );
  
      CREATE TABLE products(
        id uuid PRIMARY KEY,
        name VARCHAR(50)
      );
  
      CREATE TABLE favorites(
        id uuid PRIMARY KEY,
        product_id UUID REFERENCES products(id) NOT NULL,
        user_id UUID REFERENCES users(id) NOT NULL,
        CONSTRAINT favorite UNIQUE(product_id, user_id)
      );
    `;
    await client.query(SQL);
  };