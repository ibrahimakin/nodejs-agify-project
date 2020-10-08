var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var apiRequest = require('../api');
var put = require('../database');

var urlEncodedParser = bodyParser.urlencoded({ extended: false });         // extended -> nested yapıda json vb göndermek için

/* GET  Kullanım addData. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Kullanım addData' });
});

/* POST addData. */
router.post('/', urlEncodedParser, function (request, response) {

    let { name } = request.body;                                           // parametre olarak gelen name

    if (name) {
        try {
            apiRequest(name, data => {                                     // api.agify.io 'dan ilgili ismin datası çekilir
                put(data, () => {                                          // data veritabanına gönderilir
                    response.send({ message: "Ekleme başarılı.", data });  // kullanıcıya döndürülür
                    console.log("API: ✔ - DB: ✔ - Response: ✔");
                });
            });
        } catch (error) {
            response.send(error.message);
        }
    }
    else {
        response.send("Error: name not found.");
    }
});

module.exports = router;