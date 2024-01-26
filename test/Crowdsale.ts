import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import {Crowdsale} from "../typechain-types";
import {parseEther} from "ethers";

describe("Crowdsale", function () {
    async function deploy() {
        const [owner, otherAccount] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy();

        const Crowdsale = await ethers.getContractFactory("Crowdsale");
        const crowdsale = await Crowdsale.deploy(token, 10, 1, 1000000, owner.address);
        // Add tokens to the crowdsale
        await token.transfer(
            await crowdsale.getAddress(),
            ethers.parseEther("1000")
        )
        return { crowdsale, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("should deploy", async function () {
            const { crowdsale } = await loadFixture(deploy);
            expect(await crowdsale.getAddress()).not.undefined;
        });

        it("Owner should be the deployer", async function () {
            const { crowdsale, owner } = await loadFixture(deploy);
            expect(await crowdsale.owner()).to.equal(owner.address);
        });

        it("Owner can open the crowdsale", async function () {
            const { crowdsale , owner } = await loadFixture(deploy);
            await crowdsale.openCrowdsale();
            expect(await crowdsale.isOpen()).to.be.true;
        });

        it("Owner can close the crowdsale", async function () {
            const { crowdsale, owner } = await loadFixture(deploy);
            await crowdsale.openCrowdsale();
            await crowdsale.closeCrowdsale();
            expect(await crowdsale.isOpen()).to.be.false;
        });

        it("Other accounts cannot open the crowdsale", async function () {
            const { crowdsale, owner, otherAccount } = await loadFixture(deploy);
            await expect(crowdsale.connect(otherAccount).openCrowdsale()).to.be.reverted;
        });

        it("Other accounts cannot close the crowdsale", async function () {
            const { crowdsale, owner, otherAccount } = await loadFixture(deploy);
            await expect(crowdsale.connect(otherAccount).closeCrowdsale()).to.be.reverted;
        });

        it("Other account should get an exact balance after buying tokens", async function () {
            const { crowdsale, owner, otherAccount } = await loadFixture(deploy);
            await crowdsale.openCrowdsale();

            await crowdsale.connect(otherAccount).tokensPurchased({value: ethers.parseEther("1")});
            expect(await crowdsale.balanceOf(otherAccount.address)).to.equal(100000000000000000n);
        });

    });
});
