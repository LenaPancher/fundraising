import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Crowdsale", function () {
    async function deploy() {
        const [owner, otherAccount] = await ethers.getSigners();
        const Crowdsale = await ethers.getContractFactory("Crowdsale");
        const crowdsale = await Crowdsale.deploy();
        return { crowdsale, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("should deploy", async function () {
            const { crowdsale } = await loadFixture(deploy);
            expect(await crowdsale.getAddress()).not.undefined;
        });


    });
});
