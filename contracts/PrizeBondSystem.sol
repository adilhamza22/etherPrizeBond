// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PrizeBondSystem {
    struct PrizeBond {
        uint id;
        address owner;
        uint value;
        bool redeemed;
    }

    
    mapping(uint => PrizeBond) public prizeBonds;
    uint public totalPrizeBonds;
    uint public totalPrizes;

    uint[] public prizeDistribution;
    uint public nextPrizeIndex;
    uint public nextWinnerIndex;
    uint public remainingPrizeFund;

    uint public totalWinnersSelected;
    mapping(uint => address) public winners;
    mapping (address=>uint) public winnerBondIDs;
    uint[] public winnerPrizeAmounts;
    bool public winnersSelected;

    uint constant ETH_USD_EXCHANGE_RATE = 2000; // 1 ETH = 2000 USD

    constructor (uint[] memory _prizeDistribution) {
        totalPrizeBonds = 0;
        totalPrizes = 0;
        prizeDistribution = _prizeDistribution;
        nextPrizeIndex = 0;
        remainingPrizeFund = totalPrizes;
        totalWinnersSelected=0;
    }

    // function issuePrizeBond(uint _dollarAmount) public payable {
    //     //value is in dollars
    //     //conveting to wei 
    //     uint amountInWei = _dollarAmount * 1 ether / ETH_USD_EXCHANGE_RATE;
    //     totalPrizeBonds++;
    //     prizeBonds[totalPrizeBonds] = PrizeBond(totalPrizeBonds, msg.sender, amountInWei, false);
    //     totalPrizes += _dollarAmount;
    //     remainingPrizeFund += _dollarAmount;

    //     address payable contractAddress = payable(address(this));
    //     contractAddress.transfer(amountInWei); // Transfer Ether to the contract
    //     // if (totalPrizeBonds == 10) {
    //     //     selectWinners();
    //     // }
    // }
    function issuePrizeBond(uint _dollarAmount) public payable {
    //value is in dollars
    //converting to wei 
    uint amountInWei = _dollarAmount * 1 ether / ETH_USD_EXCHANGE_RATE;
    require(msg.value >= amountInWei, "Insufficient funds sent with transaction");
    
    totalPrizeBonds++;
    prizeBonds[totalPrizeBonds] = PrizeBond(totalPrizeBonds, msg.sender, amountInWei, false);
    totalPrizes += _dollarAmount;
    remainingPrizeFund += _dollarAmount;


        // Check if all prize bonds have been issued and start winner selection
    if (totalPrizeBonds == 10) {
            selectWinners();
        }
    }

    // function startWinnerSelection() public {
    //     require(totalPrizeBonds == 10, "Not all prize bonds have been issued yet");
    //     selectWinners();
    // }
    function checkPrizeBond(uint _bondId) public view returns (bool) {
        require(_bondId > 0 && _bondId <= totalPrizeBonds, "Invalid bond ID");
        require (_bondId == prizeBonds[_bondId].id, "Invalid bond ID");
        return prizeBonds[_bondId].redeemed;
    }

    function selectWinners() private {
        require(totalWinnersSelected < 3, "Winners already selected");
        uint[] memory selectedBondIds = new uint[](3);
        for (uint i = 0; i < 3; i++) {
            // uint rand = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, i))) % totalPrizeBonds + 1;
            uint rand;
            bool bondIdSelected;

            do {
                rand = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, i))) % totalPrizeBonds + 1;
                bondIdSelected = false;

                // Check if the bond ID has already been selected
                for (uint j = 0; j < i; j++) {
                    if (selectedBondIds[j] == rand) {
                        bondIdSelected = true;
                        break;
                    }
                }
            } while (bondIdSelected);
            winners[i] = prizeBonds[rand].owner;
            winnerBondIDs[winners[i]]=rand;
            winnerPrizeAmounts.push(calculatePrizeAmount());
            totalWinnersSelected++;

        }
    }
    
    function claimPrize(uint _bondId) public returns(uint) {
        require(_bondId > 0 && _bondId <= totalPrizeBonds, "Invalid bond ID");
        require(prizeBonds[_bondId].owner == msg.sender, "You are not the owner of this bond");
        require(!prizeBonds[_bondId].redeemed, "Prize already claimed");

        prizeBonds[_bondId].redeemed = true;
        uint prizeAmount = winnerPrizeAmounts[nextWinnerIndex++];
        uint contractBalance = address(this).balance; // Get the contract's balance
        require(prizeAmount <= contractBalance, "Not enough balance in the contract");
        totalPrizes -= prizeAmount;
        uint256 amountInWei = prizeAmount * 1 ether;
        payable(msg.sender).transfer(amountInWei);
        return prizeAmount;
    }
//     function claimPrize(uint _bondId) public returns (uint) {
//     require(_bondId > 0 && _bondId <= totalPrizeBonds, "Invalid bond ID");
//     require(prizeBonds[_bondId].owner == msg.sender, "You are not the owner of this bond");
//     require(!prizeBonds[_bondId].redeemed, "Prize already claimed");

//     prizeBonds[_bondId].redeemed = true;
//     uint prizeAmount = winnerPrizeAmounts[nextWinnerIndex++];
//     uint contractBalance = address(this).balance; // Get the contract's balance
//     require(prizeAmount <= contractBalance, "Not enough balance in the contract");

//     // Transfer the prize amount to the bond owner
//     uint256 amountInWei = prizeAmount * 1 ether;
//     (bool success, ) = payable(msg.sender).call{value: amountInWei}("");
//     require(success, "Transfer failed");

//     totalPrizes -= prizeAmount;
//     return prizeAmount;
// }

    
    function calculatePrizeAmount() private returns (uint) {
        require(nextPrizeIndex < prizeDistribution.length, "All prizes have been claimed");

        uint prizeAmount = totalPrizes * prizeDistribution[nextPrizeIndex] / 100;
        // winnerPrizeAmounts[nextPrizeIndex]=prizeAmount;
        nextPrizeIndex++;
        return prizeAmount;
    }
    function getBondOwner(uint _bondId) public view returns (address){
        return prizeBonds[_bondId].owner;
    }
    function getWinners() public view returns (address[] memory) {
        address[] memory selectedWinners = new address[](3);
        for (uint i = 0; i < 3; i++) {
            selectedWinners[i] = winners[i];
        }
        return selectedWinners;
    }
    function getWinnerBondIDs() public view returns(uint[] memory){
        uint[] memory winnerBondId=new uint[](3);
        for(uint i=0;i<3;i++){
            winnerBondId[i]=winnerBondIDs[winners[i]];
        }
        return winnerBondId;
        
    }
    // Function to check if winners have been selected
    function areWinnersSelected() public view returns (bool) {
        return winnersSelected;
    }
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    // function distributeRemainingPrize() public {
    //     require(nextPrizeIndex == prizeDistribution.length, "All prizes have not been claimed yet");
    //     require(remainingPrizeFund == 0, "Remaining prize fund has already been distributed");

    //     remainingPrizeFund = totalPrizes;
    //     uint numParticipants = totalPrizeBonds - nextPrizeIndex;
    //     uint prizePerParticipant = remainingPrizeFund / numParticipants;
    //     remainingPrizeFund = 0;

    //     for (uint i = nextPrizeIndex; i <= totalPrizeBonds; i++) {
    //         if (!prizeBonds[i].redeemed) {
    //             payable(prizeBonds[i].owner).transfer(prizePerParticipant);
    //         }
    //     }
    // }
    function getPrizeAmounts() public view returns(uint[] memory){
        return winnerPrizeAmounts;
    }
    function getTotalPrizes() public view returns (uint) {
        return totalPrizes;
    }
    function getTotalPrizeBonds() public view returns (uint) {
        return totalPrizeBonds;
    }
    function getPrizeDistribution() public view returns (uint[] memory) {
        return prizeDistribution;
    }

    function getRemainingPrizeFund() public view returns (uint) {
        return remainingPrizeFund;
    }
}
