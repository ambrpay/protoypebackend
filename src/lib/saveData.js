import Web3 from 'web3';
import solc from 'solc';
import fs from 'fs';
import mceliece from 'mceliece';
let web3 = new Web3('http://localhost:8545');
let eth = web3.eth;
var cDef = require('../../../subscriptionApp/build/contracts/SubscriptionWallet.json');
//console.log(cDef);

let from = '0x3cb12c8a63376f7c3b1673e81854aeceea3998e2';


// let source = fs.readFileSync(__dirname + '/../../src/contracts/SaveData.sol').toString();
// console.log(source);
// let compiled = solc.compile(source);
// let contractCompiled = compiled.contracts[':SaveDataContract'];
// let abi = JSON.parse(contractCompiled.interface);
let contract = new eth.Contract(cDef.abi);




export default {
    getFunds,
    addCustomer,
    getCustomer,
    addActivity,
    getActivity,
    getSpecificFunds,
    getProviders
};

function getFunds(req, res) {
    console.log("hello");
    let customer = '0x47316df453e8c9f7c942f5dcbfdf66d518d61f2d';
    let address = customers[customer];
    console.log('address', address);
    contract.options.address = address;
    console.log("we retreive now!");
    //console.log(contract.methods.withdrawForSubscription(1));
    var amount = 100000000000000000;
    //var amount = 10000;
    contract.methods.withdrawForSubscription(amount).send({ from: from }, (e, o) => {
        if (o) {
            amount /= 1000000000000000000;
            logWithdraw(customer, from, amount);
        }
        console.log(e);
        console.log(o);
        return res.json({});
    });

}

function getSpecificFunds(req, res) {
    console.log("hello");
    let customer = req.params.customerId;
    let from = req.params.fromId;
    let address = customers[customer];
    console.log('address', address);
    contract.options.address = address;
    console.log("we retreive now!");
    //console.log(contract.methods.withdrawForSubscription(1));
    var amount = 100000000000000000;
    //var amount = 10000;
    contract.methods.withdrawForSubscription(amount).send({ from: from }, (e, o) => {
        if (o) {
            amount /= 1000000000000000000;
            logWithdraw(customer, from, amount);
        }
        console.log(e);
        console.log(o);
        return res.json({});
    });

}

function logWithdraw(customer, address, amount) {
    var text = providers[address].name + " withdrew funds";
    insertActivity(customer, text, 'fa-download', amount);
}

var customers = {
    //'0x47316df453e8c9f7c942f5dcbfdf66d518d61f2d': '0x72ae836a2094a728463d4b3f1698a887ba9baacc'
};


function addCustomer(req, res) {
    console.log('add addCustomer');
    var customerId = req.params.customerId;
    var contractId = req.params.contractId;
    customers[customerId] = contractId;
    console.log(customers);
    res.send({});

}

function getCustomer(req, res) {
    console.log('got getCustomer', req.params);
    var customerId = req.params.customerId;
    var contractId = customers[customerId];
    if (!contractId) contractId = undefined;

    res.send({ contractId: contractId });
}


var providers = {
    '0x33197591b6f07f247c6d18fef4144308023a99dd': {
        address: '0x33197591b6f07f247c6d18fef4144308023a99dd',
        name: 'Netflix',
        amount: 13,
        timeframe: 100,
        logoLarge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2000px-Netflix_2015_logo.svg.png',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Netflix-new-icon.png/480px-Netflix-new-icon.png',
    },
    '0x3cb12c8a63376f7c3b1673e81854aeceea3998e2': {
        address: '0x3cb12c8a63376f7c3b1673e81854aeceea3998e2',
        name: 'Zattoo',
        amount: 13,
        timeframe: 100,
        logoLarge: 'https://static.giga.de/wp-content/uploads/2017/04/Zattoo-Logo-Titelbild-rcm1200x627u.jpg',
        picture: 'https://lh4.ggpht.com/kuimgR_noIEJC52pH3dT5trviZ7gR4NZ2RSR8ern-vD6R1b70_CmZ8HG49m7IoeLp2c=w300',
    }
};

function getProviders(req, res) {
    console.log('got getProviders');
    res.send(providers);
}



var activity = {};

function getActivity(req, res) {
    console.log('add addCustomer');
    var customerId = req.params.customerId;
    var o = [];
    if (activity[customerId]) {
        o = activity[customerId];
    }
    res.send(o);
}

function addActivity(req, res) {
    var customerId = req.params.customerId;
    var data = req.body;

    insertActivity(customerId, data.text, data.img, data.amount);

    res.send({});
}


function insertActivity(customerId, text, img, amount) {
    if (!activity[customerId]) {
        activity[customerId] = [];
    }

    activity[customerId].push({
        date: Date.now(),
        text: text,
        img: img,
        amount: amount
    });
}