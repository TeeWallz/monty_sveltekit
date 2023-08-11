import { Sequelize } from 'sequelize-typescript';
import sqlite3 from 'sqlite3';
import path from 'path'; // Import the 'path' module

const sequelize = new Sequelize({
  dialect: "sqlite",
  dialectModule: sqlite3,
  storage: 'data/monty.db',
  models: ['../models/**/*.model.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});
