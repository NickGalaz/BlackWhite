const Jimp = require('jimp');
const http = require('http');
const fs = require('fs');
const url = require('url');
let superfecha = new Date();

http
    .createServer((req, res) => {
        if (req.url == '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            fs.readFile('./public/index.html', 'utf8', (err, html) => {
                res.write(html)
                res.end()
            })
        } 
        else if (req.url.startsWith('/estilos') ) {
            res.writeHead(200, { 'Content-Type': 'text/css' })
            fs.readFile('./public/assets/css/estilos.css', (err, css) => {
                res.write(css)
                res.end()
            });
        } 
        else if (req.url.startsWith('/convertir')) {
            const params = url.parse(req.url, true).query;
            const imagen = params.imagen;
                Jimp.read(imagen, (err, imagen) => {
                        imagen
                            .resize(350, Jimp.AUTO)
                            .greyscale()
                            .quality(60)
                            .writeAsync('./public/assets/img/newImg.jpg')
                            .then(() => {
                                fs.readFile('./public/assets/img/newImg.jpg', (err, Imagen) => {
                                    res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                                    res.end(Imagen)
                                });
                            });
                    });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
            res.end('Recurso no encontrado');
        }
    })
    .listen(3000, () => console.log('Credenciales correctas'))

