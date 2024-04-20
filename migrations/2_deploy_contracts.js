const PrizeBondSystem = artifacts.require("PrizeBondSystem");

module.exports = function(deployer) {
  const prizeDistribution = [50, 30, 20]; // prize distribution percentages
  deployer.deploy(PrizeBondSystem, prizeDistribution);
};
