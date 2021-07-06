var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'articlesdb'
});

connection.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Conexion exitosa: ');
    }
});

app.get('/', function (req, res) {
    res.send('Inicio');
});

//LISTAR TODOS LOS  ARTICULOS
app.get('/api/articulos', (req, res) => {
    connection.query('SELECT * FROM articles', (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    })
});
//LISTAR UN ARTICULO
app.get('/api/articulos/:id', (req, res) => {
    connection.query('SELECT * FROM articles WHERE id = ?', [req.params.id], (error, row) => {
        if (error) {
            throw error;
        } else {
            res.send(row);
        }
    })
});

//CREAR UN ARTICULO
app.post('/api/articulos', (req, res) => {
    let data = { description: req.body.description, price: req.body.price, stock: req.body.stock };
    let sql = "INSERT INTO articles SET ?";
    connection.query(sql, data, function (error, results) {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});

//MODIFICAR UN ARTICULO
app.put('/api/articulos/:id', (req, res) => {
    let id = req.params.id;
    let description = req.body.description;
    let price = req.body.price;
    let stock = req.body.stock;

    let sql = "UPDATE articles SET description = ?, price = ?, stock = ? WHERE id = ?";
    connection.query(sql, [description, price, stock, id], function (error, results) {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});

//ELIMINAR UN ARTICULO
app.delete('/api/articulos/:id', (req, res) => {
    connection.query('DELETE FROM articles WHERE id = ?', [req.params.id], (error, rows) => {
        if (error) {
            throw error;
        } else {
            res.send(rows);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Corriendo Servidor en puerto: " + port);
});
