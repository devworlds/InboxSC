const path = require('path');
const fs = require('fs');
const solc = require('solc')


//acessando o PATH do arquivo de forma UNIX.
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');


//passando o arquivo e o numero de contratos a serem compilado
module.exports = solc.compile(source, 1).contracts[':Inbox']; 