# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Commandes

```
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deploy.ts --network <network_name>
npx hardhat verify --network <network_name> <contract_address> <Param1> <Param2>

Exemple :
npx hardhat run scripts/deploy.ts --network mumbai
Contract Token : npx hardhat verify --network mumbai 0x<token_adress>
Contract Crowdsale : npx hardhat verify --network mumbai 0x<crowdsale_adress> 1 1 10 0x<deployer_adress>
```
