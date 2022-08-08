/*Required SQL File*/
// CREATE DATABASE lottle;
// USE lottle;
// CREATE TABLE draw (
// user_id VARCHAR(36),
// draw VARCHAR(17)
// );

const http = require('http');
const hostname = 'localhost';
const port = 3000;
const server = http.createServer((requestReceived, responseToReturn) => {
    var queryParameters = require('url').parse(requestReceived.url, true).query;
    const { createPool } = require('mysql')
    const pool = createPool({
        host: "localhost",
        user: "root",
        /*Required SQL Password*/
        password: "password"
    });
    responseToReturn.statusCode = 200;
    responseToReturn.setHeader('Content-Type', 'text/json');
    responseToReturn.setHeader('Access-Control-Allow-Origin', '*');

    if (requestReceived.url.startsWith("/selectDraws")) {
        pool.query(`SELECT draw FROM lottle.draw WHERE user_id = '${queryParameters.userID}'`, (err, databaseResponse) => {
            responseToReturn.end(JSON.stringify(databaseResponse));
        });
    }
    else if (requestReceived.url.startsWith("/insertDraws")) {
        pool.query(`INSERT INTO lottle.draw (user_id, draw) VALUES('${queryParameters.userID}', '${queryParameters.draw}')`, (err, databaseResponse) => {
            responseToReturn.end("");
        });
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});