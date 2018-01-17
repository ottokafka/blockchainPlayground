/**
 * Created by automacair on 1/15/18.
 */
var Account = require('account');
var Neb = require('neb');
var neb = new Neb();
var from = "1a263547d167c74cf4b8f9166cfa244de0481c514a45aa2c"
var to = "333cb3ed8c417971845382ede3cf67a0a96270c05fe2f700";
var value = "100000";
var nonce = 1;
var gasPrice = "1000000";
var gasLimit = "2000000";
var password = "password";
var generatedAddressArray = [];


//----------------   Remote Procedure Calls (RPCs)--------



//------------------------  Management RPC -------------------




//------------------------  Web generated  -------------------



function createNewAccountFuncWeb() {

    var newAccount = Account.NewAccount(password);
    var savedGeneratedAccount = newAccount.getAddressString();

    generatedAddressArray.push(savedGeneratedAccount);

    document.getElementById("message").innerHTML = "<textarea>" + generatedAddressArray[0] + "</textarea>" + "<br>" + "<h5>" + "This is your new generated account address by the web"+ "</h5>"
    console.log(generatedAddressArray[0]);
}


function getAccountStateFuncWeb() {

    //var from = "1a263547d167c74cf4b8f9166cfa244de0481c514a45aa2c";
    var accountState = Account.getAccountState(from)
    console.log(JSON.stringify(accountState));
}




function accountTest() {
    var account = Account.NewAccount();
    console.log(account.getPrivateKeyString());
    console.log(account.getPublicKeyString());
    console.log(account.getAddressString());
}




//todo get account state
// todo: seperate Neb from Web






//-------------------  Neb generated Information here -----


function createNewAccountFuncNeb() {

    var newAccount = neb.admin.newAccount(password);
    var savedGeneratedAccount = newAccount.address;
    generatedAddressArray.push(savedGeneratedAccount);

    document.getElementById("message").innerHTML = "<textarea>" + generatedAddressArray[0] + "</textarea>" + "<br>" + "<h5>" + "This is your new generated account address"+ "</h5>";
    console.log(generatedAddressArray[0]);

}

function getAccountStateFuncNeb() {
    var accountState = neb.api.getAccountState(generatedAddressArray[0]);
    console.log(JSON.stringify(accountState));
}




function nebState() {

    var nebulasState = neb.api.getNebState();
    console.log(JSON.stringify(nebulasState))
    //document.getElementById("output").innerHTML = JSON.stringify(nebulasState)
}
//nebState()

function nodeInfomation() {
    var nodeinfoApi = neb.api.nodeInfo()
    console.log(JSON.stringify(nodeinfoApi))
}

function blockDumpFunc() {
    var accountState = neb.api.blockDump(1);
    console.log(JSON.stringify(accountState));
}


function accountsFunc() {

    var accounts = neb.api.accounts();
    console.log(JSON.stringify(accounts));
}



function transactionFunc() {

    var contract = {
        "source": "demo playground",
        "sourceType": "js",
        "args": "[\"0\",\"otto\"]"
    };

    var transaction = neb.api.sendTransaction(from,to,value,nonce,gasPrice,gasLimit,contract);
    console.log(JSON.stringify(transaction));
}

function gasPriceFunc() {

    var theGasPrices = neb.api.gasPrice();
    console.log(JSON.stringify(theGasPrices));
}







function accounts() {
    //var Neb = require('neb')
    //var neb = new Neb();
    var accounts = neb.api.accounts();

    console.log(JSON.stringify(accounts));

}
//accounts()












function unlockAccountFunc() {
    //curl -i -H Accept:application/json -X POST http://localhost:8685/v1/account/unlock -d '{"address":"8a209cec02cbeab7e2f74ad969d2dfe8dd24416aa65589bf", "passphrase":"passphrase"}'

    var unlockTheAccount = neb.admin.unlockAccount(from);

}





function sendTransaction() {
    //var from = "1a263547d167c74cf4b8f9166cfa244de0481c514a45aa2c";
    //var to = "333cb3ed8c417971845382ede3cf67a0a96270c05fe2f700";
    //var value = "100000";

    var allAccounts = neb.api.accounts();
    from = allAccounts[0];
    to = allAccounts[1];
    var state = neb.api.getAccountState(from);
    var contract = {
        "source": "demo playground",
        "sourceType": "js",
        "args": "[\"0\",\"otto\"]"
    };
    var resp = neb.api.estimateGas(from, to, value, parseInt(state.nonce)+1,"0", "0", contract);
    console.log(JSON.stringify(resp));
}


function estimateTheGasPrice() {
    var estimatedGasPrice = neb.api.estimateGas(from,to,value,nonce,gasPrice,gasLimit)
    console.log(JSON.stringify(estimatedGasPrice));


}