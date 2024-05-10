// const { eth } = require("web3");

const contractAddress = '0xFa806722f6F6831C4d12EDDbe69C33BDb7A54e65'; // actual contract address
const contractABI =[
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
    "inputs": [],
    "name": "nextWinnerIndex",
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
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "winnerBondIDs",
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
    "name": "winnerPrizeAmounts",
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
    "inputs": [],
    "name": "winnersSelected",
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
        "name": "_dollarAmount",
        "type": "uint256"
      }
    ],
    "name": "issuePrizeBond",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
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
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
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
    "name": "getWinnerBondIDs",
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
    "name": "areWinnersSelected",
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
    "inputs": [],
    "name": "getContractBalance",
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
    "name": "getPrizeAmounts",
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
];   //  actual contract ABI

const web3 = new Web3('http://localhost:7545'); // Connect to local Ethereum node
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to issue a prize bond
async function issuePrizeBond() {
  const prizeAmount = document.getElementById("prizeAmount").value;
  
  if (prizeAmount <= 0 || prizeAmount == "" || prizeAmount == NaN || prizeAmount == undefined){
    alert("Enter a valid amount !") ;
    return;
  }
  const totalPrizeBondsIssued = await contract.methods.getTotalPrizeBonds().call();
  console.log("totalPrizeBondsIssued",totalPrizeBondsIssued);
  if (totalPrizeBondsIssued){
    if(totalPrizeBondsIssued >9){
      alert("Winners have already been selected, no more prize bonds can be issued");
      return;
    }
  }
  try {
   await contract.methods.issuePrizeBond(prizeAmount).send({
      from: web3.eth.defaultAccount,
      value: web3.utils.toWei(prizeAmount, 'ether'),
      gas: 4000000 // Adjust gas limit as needed
    });
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
  
  const getPrizeAmounts = await contract.methods.getPrizeAmounts().call();
  const getWinnerBondIDs = await contract.methods.getWinnerBondIDs().call();

  try {

    const bondId = document.getElementById("bondId").value;
    if (bondId <= 0 || bondId == "" || bondId == NaN || bondId == undefined){
      alert("Enter a valid bond ID !") ;
      return;
    }
    const bondOwnerAddr = await contract.methods.getBondOwner(bondId).call();
    console.log(`Bond Owner of Current Bond with id ${bondId} is ${bondOwnerAddr}`)
    const defaultAccAddr = await web3.eth.defaultAccount; 
    console.log("defaultAccAddr now: ",defaultAccAddr);

    if (bondOwnerAddr != defaultAccAddr) {
      alert("You are not the owner of this bond");
      return;
    }
    console.log("BONDId:",bondId);
    //find bond ids index in winnerBondIDs array
    const index = getWinnerBondIDs.indexOf(bondId);
    if (index === -1) {
      alert("This bond is not a winning bond");
      return;
    }
    //convert this into tranferable amount
    const prizeAmount = getPrizeAmounts[index];
    console.log("Prize Amount in Ether:",prizeAmount);
   
    const prizeAmountInWei = web3.utils.toWei(prizeAmount.toString(), 'ether');
    
    console.log("Prize Amount in Wei:",prizeAmountInWei);
    console.log("Index:",index);
    const TX_receipt= await contract.methods.claimPrize(bondId).send({ 
      from: web3.eth.defaultAccount,
      gas: 4000000,
    });
    alert(`Prize Claimed for bond ${bondId} by account ${defaultAccAddr}`);
    console.log(`Prize Claimed for bond ${bondId} with amount ${TX_receipt}`);
    console.log("TX Receipt:",TX_receipt);
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
  const contractBalance = await contract.methods.getContractBalance().call();
  //convert to ether
  const contractBalanceInEther = web3.utils.fromWei(contractBalance, 'ether');
  const totalPrizes = await contract.methods.getTotalPrizes().call();
  document.getElementById("totalBondsIssued").textContent = await contract.methods.getTotalPrizeBonds().call();
  document.getElementById("contractBalance").textContent = contractBalanceInEther + " ETH";

  document.getElementById("totalPrizes").textContent = totalPrizes;

  const prizeDistribution = await contract.methods.getPrizeDistribution().call();
  document.getElementById("prizeDistribution").textContent = JSON.stringify(prizeDistribution);

  const remainingPrizeFund = await contract.methods.getRemainingPrizeFund().call();
  document.getElementById("remainingPrizeFund").textContent = remainingPrizeFund;

  const winners = await contract.methods.getWinners().call();
  const winnerBonds = await contract.methods.getWinnerBondIDs().call();
  document.getElementById("firstPlace").textContent = winners[0];
  document.getElementById("firstPlaceBondId").textContent = winnerBonds[0];
  document.getElementById("secondPlace").textContent = winners[1];
  document.getElementById("secondPlaceBondId").textContent = winnerBonds[1];
  document.getElementById("thirdPlace").textContent = winners[2];
  document.getElementById("thirdPlaceBondId").textContent = winnerBonds[2];
  
  console.log(winners);
  // const prizeAmounts = await contract.methods.getPrizeAmounts().call();
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