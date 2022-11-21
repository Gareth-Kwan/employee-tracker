//Import and require express module and mySQL
const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
