require('dotenv').config();
const fs = require('fs');
const { getToken } = require('sf-jwt-token');
const privateKey = fs.readFileSync('./jwt/server.key').toString('utf8');
var jsforce = require('jsforce');


async function main() {

    let tokenResponse = await getToken({
        iss: process.env.ISS,
        sub: process.env.SUB,
        aud: process.env.AUD,
        privateKey: privateKey
    });

    let connection = new jsforce.Connection({
        instanceUrl : tokenResponse.instance_url,
        accessToken: tokenResponse.access_token
    });

    let queryResponse = await connection.query("SELECT Id, Name From Account");
    console.log(queryResponse);

}

main();