import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Token", function () {
    async function deploy() {
        const [owner, otherAccount] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy();
        return { token, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("should deploy", async function () {
            const { token } = await loadFixture(deploy);
            expect(await token.getAddress()).not.undefined;
        });

        it("total initial supply must not be zero", async () => {
            const { token, owner } = await loadFixture(deploy);
            const totalSupply = await token.totalSupply();
            expect(totalSupply).to.not.equal(0, "Total supply should not be zero");
        });

        it("should deploy with the correct initial supply", async () => {
            const { token, owner } = await loadFixture(deploy);
            const totalSupply = await token.totalSupply();
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await totalSupply).to.equal(ownerBalance, "Total supply should be equal to owner balance");
        });

        it("Have the right name and symbol", async function () {
            const { token } = await loadFixture(deploy);
            expect(await token.name()).to.equal("Fundraising", "Wrong name");
            expect(await token.symbol()).to.equal("FUN", "Wrong symbol");
        });
    });
});
