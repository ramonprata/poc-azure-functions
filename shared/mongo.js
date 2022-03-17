/**
 * Arquivo: mongo.js
 * Data: 01/25/2021
 * Descrição: file responsible for handling the database connection locally
 * Author: Glaucia Lemos – (Twitter: @glaucia_lemos86)
 */

const { MongoClient } = require('mongodb');
const { MONGO_DB_CONNECTION_STRING, MONGO_DB_NAME } = require('./constants');

const config = {
  url: MONGO_DB_CONNECTION_STRING,
  dbName: MONGO_DB_NAME,
};

async function createConnection() {
  const connection = await MongoClient.connect(config.url, {
    useNewUrlParser: true,
    tlsInsecure: true,
    retryWrites: false,
  });
  const db = connection.db(config.dbName);
  return {
    connection,
    db,
  };
}

module.exports = {
  createConnection,
};

// Microsoft.Azure.Cosmos.Emulator.exe /EnableMongoDbEndpoint=3.6
