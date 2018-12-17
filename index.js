const util = require('ethereumjs-util');
var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const msg = new Buffer('hello');
console.log(web3.eth.accounts[0])
const sig = web3.eth.sign(web3.eth.accounts[0], '0x' + msg.toString('hex'));
const res = util.fromRpcSig(sig);

const prefix = new Buffer("\x19Ethereum Signed Message:\n");
const prefixedMsg = util.keccak256(
    Buffer.concat([prefix, new Buffer(String(msg.length)), msg])
);

const pubKey  = util.ecrecover(prefixedMsg, res.v, res.r, res.s);
const addrBuf = util.pubToAddress(pubKey);
const addr    = util.bufferToHex(addrBuf);

console.log(web3.eth.accounts[0],  addr);
