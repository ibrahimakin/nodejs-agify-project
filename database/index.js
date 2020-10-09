var mysql = require('mysql');
var auth = require('./auth');

const put = ({ name, age, count, createdDate }, callback) => {

    let con = mysql.createConnection({
        host: "localhost",
        user: auth.user,                                // MySQL bağlantı bilgileri
        password: auth.password,
        database: auth.database
    });

    let sqlInsertQuery = `INSERT INTO person (Name, Age, Count, CreatedDate) VALUES ('${name}', ${age}, ${count}, '${createdDate}');`;  //NOW() | ${createdDate}
    con.connect(function (err) {
        if (err) throw err;
        con.query(sqlInsertQuery, function (err, result) {   // Sorgu işletilir.
            if (err) { throw err; }
            let { insertId } = result;                       // Veritabanında tutulduğu id
            console.log("DB  Connected!", insertId);
            callback();                                      // Veri kullanıcıya döndürülür.

            //getData(insertId);                             // Eğer veritabanından çekilip döndürülecekse
        });

    });

    const getData = (insertId) => {
        let sqlSelectQuery = `SELECT * FROM person WHERE idPerson=${insertId}`;
        con.query(sqlSelectQuery, (err, result) => {
            if (err) { throw err; }
            console.log(result[0]);
            //callback(result[0]);
        });
    }
}

module.exports = put;