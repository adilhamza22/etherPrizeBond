// const { eth } = require("web3");

const contractAddress = '0x63737fAe144D2EeEEB2efaD9a30D1c63feB58Cd3'; // actual contract address
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
    "inputs": [],
    "name": "totalWinnersSelected",
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
    "name": "winners",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bondId",
        "type": "uint256"
      }
    ],
    "name": "getBondOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getWinners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
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
    "name": "getTotalPrizeBonds",
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
  if (prizeAmount <= 0 || prizeAmount == "" || prizeAmount ==NaN || prizeAmount == undefined){
    alert("Enter a valid amount !") ;
    return;
  }
  try {
    await contract.methods.issuePrizeBond(prizeAmount).send({ from: web3.eth.defaultAccount , gas: 3000000 });
    alert(`Prize Bond of value: ${prizeAmount} issued` );
  } catch (error) {
      alert(`Some error happened check console logs`);    
      console.error(error);
  } 

}

// Function to check a prize bond
async function checkPrizeBond() {
  const bondId = document.getElementById("bondId").value;
  if (bondId <= 0 || bondId == "" || bondId ==NaN || bondId == undefined){
    alert("Enter a valid bond ID !") ;
    return;
  }
  try {
    
    const isRedeemed = await contract.methods.checkPrizeBond(bondId).call();
    alert(`Prize bond ${bondId} is ${isRedeemed ? "redeemed" : "not redeemed"}`);
  } catch (error) {
    if(error.message.includes("revert")){
      alert("Error: The transaction was reverted. This may be due to an invalid bond ID or the bond has already been claimed.");
    }
    else{
      alert("Some error happened, check console logs");
    }

    console.error(error);
  }
}

// Function to claim a prize
async function claimPrize() {
  try {
    const bondId = document.getElementById("bondId").value;
    const bondOwnerAddr = await contract.methods.getBondOwner(bondId).call();
    console.log(`Bond Owner of Current Bond with id ${bondId} is ${bondOwnerAddr}`)
    const defaultAccAddr = await web3.eth.defaultAccount; 
    console.log("defaultAccAddr now: ",defaultAccAddr);
    //change this connect to default acc here rather than on window load;
    if (bondOwnerAddr != defaultAccAddr) {
      alert("You are not the owner of this bond");
      return;
    }
    await contract.methods.claimPrize(bondId).send({ from: web3.eth.defaultAccount , gas: 3000000});
  } catch (error) {
    if(error.message.includes("revert")){
      alert("Revert Happened, all Prizes might have been claimed or your details might be incorrect.")
    }else{
      alert("Some error happened, check console logs");

    }
    console.error(error)
  }
}

// Function to update the UI with contract data
async function updateUI() {
  const totalPrizes = await contract.methods.getTotalPrizes().call();
  document.getElementById("totalPrizes").textContent = totalPrizes;

  const prizeDistribution = await contract.methods.getPrizeDistribution().call();
  document.getElementById("prizeDistribution").textContent = JSON.stringify(prizeDistribution);

  const remainingPrizeFund = await contract.methods.getRemainingPrizeFund().call();
  document.getElementById("remainingPrizeFund").textContent = remainingPrizeFund;

  const winners = await contract.methods.getWinners().call();
  document.getElementById("firstPlace").textContent = winners[0];
  document.getElementById("secondPlace").textContent = winners[1];
  document.getElementById("thirdPlace").textContent = winners[2];
  console.log(winners)
}

// Load contract data when the page loads
window.addEventListener("load", async () => {
  // Request account access if needed
  await window.ethereum.enable();

  // Set default account
  web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
  console.log(`Default Account: ${web3.eth.defaultAccount}`)
  
  // Listen for account changes
  window.ethereum.on('accountsChanged', async function (accounts) {
    // Update default account
    web3.eth.defaultAccount = accounts[0];
    console.log(`Default Account changed: ${web3.eth.defaultAccount}`)

    
  });  
  // Update UI with contract data
  updateUI();

});