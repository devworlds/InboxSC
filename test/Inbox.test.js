const assert = require('assert');
const ganache = require('ganache-cli');
const { beforeEach } = require('mocha');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

// instanciando a Web3 e passando o provider para se conectar
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_STRING = "Hello SmartContract";
const TEST_UPDATE = "Hello update Contract";

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of those accounts to deploy 
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments:[INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () =>{
    // teste para saber se deu tudo certo no deploy e gerou o endereço.
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    })

    it('has message uptaded', async () =>{
        await inbox.methods.setMessage(TEST_UPDATE).send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, TEST_UPDATE);
    });
});