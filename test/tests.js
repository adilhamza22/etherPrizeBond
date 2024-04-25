const PrizeBondSystem = artifacts.require("PrizeBondSystem");

contract("PrizeBondSystem", (accounts) => {
  let prizeBondSystem;
  const owner = accounts[0];
  const participant1 = accounts[1];
  const participant2 = accounts[2];

  beforeEach(async () => {
    prizeBondSystem = await PrizeBondSystem.new([10, 20, 30]);
  });

  it("should issue a prize bond", async () => {
    await prizeBondSystem.issuePrizeBond(100, { from: participant1 });
    const totalPrizeBonds = await prizeBondSystem.totalPrizeBonds();
    assert.equal(totalPrizeBonds, 1);
  });

  it("should not allow claiming a prize for an invalid bond ID", async () => {
    try {
      await prizeBondSystem.claimPrize(0, { from: participant1 });
    } catch (error) {
      assert(error.message.includes("Invalid bond ID"));
      return;
    }
    assert(false, "Expected an error but did not get one");
  });

  it("should not allow claiming a prize for a bond not owned", async () => {
    await prizeBondSystem.issuePrizeBond(100, { from: participant1 });
    try {
      await prizeBondSystem.claimPrize(1, { from: participant2 });
    } catch (error) {
      assert(error.message.includes("You are not the owner of this bond"));
      return;
    }
    assert(false, "Expected an error but did not get one");
  });

  it("should calculate correct prize amount", async () => {
    await prizeBondSystem.issuePrizeBond(100, { from: participant1 });
    await prizeBondSystem.issuePrizeBond(200, { from: participant2 });
    await prizeBondSystem.claimPrize(1, { from: participant1 });
    await prizeBondSystem.claimPrize(2, { from: participant2 });

    const remainingPrizeFund = await prizeBondSystem.remainingPrizeFund();
    assert.equal(remainingPrizeFund, 150);
  });

  it("should return correct total prizes, prize distribution, and remaining prize fund", async () => {
    const totalPrizes = await prizeBondSystem.getTotalPrizes();
    console.log(totalPrizes);
    assert.equal(totalPrizes, 60);

    const prizeDistribution = await prizeBondSystem.getPrizeDistribution();
    console.log(prizeDistribution);
    assert.deepEqual(prizeDistribution, [10, 20, 30]);

    const remainingPrizeFund = await prizeBondSystem.getRemainingPrizeFund();
    console.log(remainingPrizeFund);
    assert.equal(remainingPrizeFund, 0);
  });
});
