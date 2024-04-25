const contractAddress = '0xe3AC4590a723D39CbC2Bcb49B9693B8B75559b35'; // actual contract address
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

// Function to issue a prize bond
async function issuePrizeBond() {
  const prizeAmount = document.getElementById("prizeAmount").value;
  await contract.methods.issuePrizeBond(prizeAmount).send({ from: web3.eth.defaultAccount , gas: 3000000});
}

// Function to check a prize bond
async function checkPrizeBond() {
  const bondId = document.getElementById("bondId").value;
  const isRedeemed = await contract.methods.checkPrizeBond(bondId).call();
  alert(`Prize bond ${bondId} is ${isRedeemed ? "redeemed" : "not redeemed"}`);
}

// Function to claim a prize
async function claimPrize() {
  const bondId = document.getElementById("bondId").value;
  await contract.methods.claimPrize(bondId).send({ from: web3.eth.defaultAccount , gas: 3000000});
}

// Function to update the UI with contract data
async function updateUI() {
  const totalPrizes = await contract.methods.getTotalPrizes().call();
  document.getElementById("totalPrizes").textContent = totalPrizes;

  const prizeDistribution = await contract.methods.getPrizeDistribution().call();
  document.getElementById("prizeDistribution").textContent = JSON.stringify(prizeDistribution);

  const remainingPrizeFund = await contract.methods.getRemainingPrizeFund().call();
  document.getElementById("remainingPrizeFund").textContent = remainingPrizeFund;
}

// Load contract data when the page loads
window.addEventListener("load", async () => {
  // Request account access if needed
  await window.ethereum.enable();

  // Set default account
  web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];

  // Update UI with contract data
  updateUI();
});