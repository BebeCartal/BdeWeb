const express = require('express');
const jwt = require('jsonwebtoken');
const articleRouter = express.Router();

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

articleRouter.route('/')
  .get(function (req, res) {
    connection.query('SELECT * FROM article', (err, rows, fields) => {
      if (err) throw err

      res.send(rows)
    })
  })

  .post(checkTokenMiddleware, function (req, res) {
    connection.query('INSERT INTO article(titre, texte) VALUES (?,?)', [req.body.titre, req.body.texte], function (error, results, fields) {
      if (error) throw error;
      connection.query('INSERT INTO tager(idA, idC) VALUES ((SELECT idA FROM article WHERE article.titre=? AND article.texte=?),(SELECT idC FROM categorie WHERE categorie.nomC=?))', [req.body.titre, req.body.texte, req.body.categorie], function (error, results, fields) {
        if (error) throw error;
        res.send('article add');
      })
    })
  });

articleRouter.route('/:id')
  .get(function (req, res) {
    connection.query('Select * from article where idA = ?', [req.params.id], function (error, rows) {
      if (error) throw error
      res.send(rows)
    })
  })

  .post(checkTokenMiddleware, function (req, res) {
    connection.query('INSERT INTO tager(idA, idC) VALUES (?, (SELECT idC FROM categorie WHERE categorie.nomC LIKE "%?%"))', [req.body.idA, req.body.nomC], function (error, rows) {
      if (error) throw error;
      res.send("Add to the categorie")
    })
  })

  .put(checkTokenMiddleware, function (req, res) {
    connection.query('Update article SET titre = ?, texte = ? WHERE idA = ?', [req.body.titre, req.body.texte, req.params.id])
    res.send('Update article');
  })

  .delete(checkTokenMiddleware, (req, res) => {
    connection.query('DELETE FROM article WHERE idA = ?', [req.params.id], function (error, results) {
      if (error) throw error;
      res.send('article delete');
    })
  });

module.exports = articleRouter;