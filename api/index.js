const https = require('https');

const apiRequest = (name, callback) => {
    let data = '';
    https.get('https://api.agify.io/?name=' + name, ((resp) => {

        // Veri alınır.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // Verinin tamamı alındığında callback fonksiyonuna gönderilir.
        resp.on('end', () => {
            let result = JSON.parse(data);
            let date = new Date();
            result.createdDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();

            console.log("API Connected!");

            callback(result);
        });

    })).on("error", (err) => {
        throw err;
    });
}

module.exports = apiRequest;
