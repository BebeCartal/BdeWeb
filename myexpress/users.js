const express = require('express');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();

const checkTokenMiddleware = require('./utils');

// chargement du fichier d'env

// accès au variables
process.env.ACCESS_TOKEN_SECRET;


const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bde_bd'
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1y' });
}


connection.connect()

userRouter.route('/')
    .get(checkTokenMiddleware, function(req, res) {
    connection.query('SELECT * FROM utilisateur', (err, rows, fields) => {
      if (err) throw err
    
      res.send(rows)
    })
  })

    .post((req, res, next) => {
    connection.query('INSERT INTO utilisateur(idu, mail, mdp) VALUES (?,?,?)', [req.body.idU, req.body.mail, req.body.mdp], function (error, results, fields) {
      if (error) throw error;
      res.send('user add');
    })
    console.log(req.body)
    })


userRouter.route('/:id')
  .get(function(req, res){
    connection.query('Select * from utilisateur where idU = ?',[req.params.id], function(error,rows){
      if (error) throw error
      res.send(rows)
    })
  })

  .put(function(req, res) {
    connection.query('Update utilisateur SET mail = ?, mdp = ? WHERE idU = ?', [req.body.mail, req.body.mdp, req.params.id])
    res.send('Update article');
  })

  .delete((req, res) => {
    connection.query('DELETE FROM utilisateur WHERE idU = ?', [req.body.idU], function (error, results){
      if (error) throw error;
      res.send('users delete');
    })
    console.log(req.body)
  });

userRouter.route('/login')
  .post((req, res, next) => {
    connection.query('Select mail from utilisateur where mail = ? and mdp = ?', [req.body.mail, req.body.mdp], function (error, rows) {
      if (error) throw error;
      console.log(rows)
      if (rows.length === 0){
        res.send({
          error:'invalid user or password'
        })
        return;
      }
      else{
        const user = {
          mail: req.body.mail,
        }
        const accessToken = generateAccessToken(user);
        res.send({accessToken,});
            }
    })
    console.log(req.body)
    
    });

userRouter.route('/:id/favoris')
  .get(function(req, res){
    connection.query('SELECT article.idA, article.titre FROM favoris NATURAL JOIN article NATURAL JOIN utilisateur WHERE utilisateur.idU = ?',[req.params.id], function(error,rows){
      if (error) throw error
      res.send(rows)
    })
  })

module.exports = userRouter;