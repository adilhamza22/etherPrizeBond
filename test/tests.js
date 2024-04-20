const PrizeBondSystem = artifacts.require("PrizeBondSystem");

contract("PrizeBondSystem", accounts => {
    let prizeBondSystem;

    before(async () => {
        prizeBondSystem = await PrizeBondSystem.new([50, 30, 20]);
    });

    it("should issue a prize bond", async () => {
        await prizeBondSystem.issuePrizeBond(web3.utils.toWei('1', 'ether'), { from: accounts[0] });
        const prizeBond = await prizeBondSystem.prizeBonds(1);
        assert.equal(prizeBond.owner, accounts[0], "Owner should be the caller");
        assert.equal(prizeBond.value, web3.utils.toWei('1', 'ether'), "Value should be 1 ether");
        assert.equal(prizeBond.redeemed, false, "Redeemed should be false");
    });

    it("should not allow claiming a prize with invalid bond ID", async () => {
        try {
            await prizeBondSystem.claimPrize(0, { from: accounts[0] });
            assert.fail("Claiming should fail with invalid bond ID");
        } catch (error) {
            assert(error.message.includes("Invalid bond ID"), "Error message should include 'Invalid bond ID'");
        }
    });

    it("should not allow claiming a prize for another user's bond", async () => {
        await prizeBondSystem.issuePrizeBond(web3.utils.toWei('1', 'ether'), { from: accounts[0] });
        try {
            await prizeBondSystem.claimPrize(2, { from: accounts[1] });
            assert.fail("Claiming should fail for another user's bond");
        } catch (error) {
            assert(error.message.includes("You are not the owner of this bond"), "Error message should include 'You are not the owner of this bond'");
        }
    });

    // Add more test cases as needed
});
