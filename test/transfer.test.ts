import { Account } from "../src/account";
import * as core from '../src/core'
import {Transaction} from '../src/transaction/transaction'
import { makeTransferTransaction, buildRpcParam } from "../src/transaction/makeTransactions";
import TxSender from "../src/transaction/TxSender";
import axios from 'axios'
import { ab2hexstring } from "../src/utils";




var accountFrom = {
    address: '0144587c1094f6929ed7362d6328cffff4fb4da2',
    base58Address: 'TA5uYzLU2vBvvfCMxyV2sdzc9kPqJzGZWq',
    privateKey: '760bb46952845a4b91b1df447c2f2d15bb40ab1d9a368d9f0ee4bf0d67500160'
}

console.log('from base58: '+ core.addressFromBase58(accountFrom.base58Address))


var url = 'http://192.168.3.141',
    restPort = '20384',
    rpcPort = '20386',
    balanceApi = '/api/v1/balance'

const  testTransferTx = () => {
    var accountTo = ab2hexstring(core.generateRandomArray(20))
    console.log('account to: ' + accountTo)

    var tx = makeTransferTransaction('ONT',accountFrom.address, accountTo, '1000000000', accountFrom.privateKey)
    var param = buildRpcParam(tx)
    console.log('param : ' + JSON.stringify(param))

    var temp = Transaction.deserialize(tx.serialize())
    console.log('deserialzied: ' + JSON.stringify(temp))

    axios.post(`${url}:${rpcPort}`, param).then(res => {
        console.log('transfer response: ' + JSON.stringify(res.data))
    }).catch(err => {
        console.log(err)
    })
}

const testGetBalance = () => {
    var restUrl = `${url}:${restPort}${balanceApi}/${accountFrom.base58Address}`
    console.log('request: '+restUrl)
    axios.get(restUrl).then((res) => {
        console.log(res.data)
    }).catch(err => {
        console.log(err)
    })
}

// testTransferTx()

// testGetBalance()
