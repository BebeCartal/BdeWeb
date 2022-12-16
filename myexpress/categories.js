const express = require('express');
const jwt = require('jsonwebtoken');
const catRouter = express.Router();

const checkTokenMiddleware = require('./utils');
process.env.ACCESS_TOKEN_SECRET;

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bde_bd'
})

connection.connect()

catRouter.route('/')
  .get(function (req, res) {
    connection.query('SELECT * FROM categorie', (err, rows, fields) => {
      if (err) throw err

      res.send(rows)
    })
  })

  .post(checkTokenMiddleware, (req, res, next) => {
    connection.query('INSERT INTO categorie(idC, nomC) VALUES (?,?)', [req.body.idC, req.body.nomC], function (error, results, fields) {
      if (error) throw error;
      res.send('categorie add');
    })
  })


catRouter.route('/:id')
  .get(function (req, res) {
    connection.query('SELECT idA, titre, texte FROM `tager` NATURAL JOIN article NATURAL JOIN categorie WHERE categorie.idC = ?', [req.params.id], function (error, rows) {
      if (error) throw error
      res.send(rows)
    })
  })

  .put(checkTokenMiddleware, function (req, res) {
    connection.query('Update categorie SET nom = ? WHERE idU = ?', [req.body.nomC, req.params.id])
    res.send('Update categorie');
  })

  .delete(checkTokenMiddleware, (req, res) => {
    connection.query('DELETE FROM categorie WHERE idC = ?', [req.params.idC], function (error, results) {
      if (error) throw error;
      res.send('categorie delete');
    })
  });

module.exports = catRouter;