var mysql = require('mysql');
var auth = require('./auth');

const put = ({ name, age, count, createdDate }, callback) => {

    let con = mysql.createConnection({
        host: "localhost",
        user: auth.user,                                // MySQL bağlantı bilgileri
        password: auth.password,
        database: auth.database
    });

    let sqlQuery = `INSERT INTO person (Name, Age, Count, CreatedDate) VALUES ('${name}', ${age}, ${count}, '${createdDate}');`;  //NOW() | ${createdDate}
    con.connect(function (err) {
        if (err) throw err;
        con.query(sqlQuery, function (err, result) {   // Sorgu işletilir.
            if (err) { throw err; }
            console.log("DB  Connected!");
            callback();                                // Kullanıcıya döndürülür.
        });
    });
}

module.exports = put;