const contractAddress = '0xB9A6531a4D67C171D1ff0ddBB78C74977180e986'; // actual contract address
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_prizeDistribution",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "nextPrizeIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "prizeBonds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "redeemed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "prizeDistribution",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "remainingPrizeFund",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalPrizeBonds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalPrizes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "issuePrizeBond",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bondId",
        "type": "uint256"
      }
    ],
    "name": "checkPrizeBond",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bondId",
        "type": "uint256"
      }
    ],
    "name": "claimPrize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "distributeRemainingPrize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalPrizes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getPrizeDistribution",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getRemainingPrizeFund",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]; //  actual contract ABI

const web3 = new Web3('http://localhost:7545'); // Connect to local Ethereum node
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function issuePrizeBond() {
    // Issue a prize bond with value 1 Ether
    //await contract.methods.issuePrizeBond(web3.utils.toWei('1', 'ether')).send({from: '0x9db5d5b3F122D886c762F94488662D50062BF30B'});
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    const fromAddress = accounts[0]; // Assuming you want to use the third account
    console.log(fromAddress);
    const gasLimit = 3000000; // Specify a higher gas limit
    await contract.methods.issuePrizeBond(web3.utils.toWei('1', 'ether')).send({ from: fromAddress , gas: '5000000' });
    console.log('Prize bond issued');
  } 

async function claimPrize(bondId) {
    //await contract.methods.claimPrize(bondId).send({from: '0x9db5d5b3F122D886c762F94488662D50062BF30B'});
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const fromAddress = accounts[0]; // Assuming you want to use the first account
    await contract.methods.claimPrize(bondId).send({ from: fromAddress , gas: '5000000'});
    console.log('Prize claimed');
}

async function distributeRemainingPrize() {
    //await contract.methods.distributeRemainingPrize().send({from: '0x9db5d5b3F122D886c762F94488662D50062BF30B'});
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const fromAddress = accounts[0]; // Assuming you want to use the first account
    await contract.methods.distributeRemainingPrize().send({ from: fromAddress , gas: '5000000'});
    console.log('Remaining prize distributed');
}
