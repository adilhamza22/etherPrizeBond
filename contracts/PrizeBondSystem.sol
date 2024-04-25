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
    uint public remainingPrizeFund;

    constructor (uint[] memory _prizeDistribution) {
        totalPrizeBonds = 0;
        totalPrizes = 0;
        prizeDistribution = _prizeDistribution;
        nextPrizeIndex = 0;
        remainingPrizeFund = 0;
    }

    function issuePrizeBond(uint _value) public {
        totalPrizeBonds++;
        prizeBonds[totalPrizeBonds] = PrizeBond(totalPrizeBonds, msg.sender, _value, false);
        totalPrizes += _value;
    }

    function checkPrizeBond(uint _bondId) public view returns (bool) {
        require(_bondId > 0 && _bondId <= totalPrizeBonds, "Invalid bond ID");
        require (_bondId == prizeBonds[_bondId].id, "Invalid bond ID");
        return prizeBonds[_bondId].redeemed;
    }

    function claimPrize(uint _bondId) public {
        require(_bondId > 0 && _bondId <= totalPrizeBonds, "Invalid bond ID");
        require(prizeBonds[_bondId].owner == msg.sender, "You are not the owner of this bond");
        require(!prizeBonds[_bondId].redeemed, "Prize already claimed");

        prizeBonds[_bondId].redeemed = true;
        uint prizeAmount = calculatePrizeAmount();
        if (prizeAmount > remainingPrizeFund) {
            prizeAmount = remainingPrizeFund;
        }
        remainingPrizeFund -= prizeAmount;
        payable(msg.sender).transfer(prizeAmount);
    }

    function calculatePrizeAmount() private returns (uint) {
        require(nextPrizeIndex < prizeDistribution.length, "All prizes have been claimed");

        uint prizeAmount = totalPrizes * prizeDistribution[nextPrizeIndex] / 100;
        nextPrizeIndex++;
        return prizeAmount;
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

    function getTotalPrizes() public view returns (uint) {
        return totalPrizes;
    }

    function getPrizeDistribution() public view returns (uint[] memory) {
        return prizeDistribution;
    }

    function getRemainingPrizeFund() public view returns (uint) {
        return remainingPrizeFund;
    }
}
