#---------------------------------------------
# add new chain information if you want to implement this swap to another 
chain

1. git clone
	git clone https://github.com/davidsparker0417/pancakeswap-v3-fork

2. smart contract
 
 2.1. pancake-smart-contracts
 	cd pancake-smart-contracts
 	npm install
 	2.1.1. common settings
 	- install husky
 		npm install -g husky
 	- .env
 	2.2.2 exchange-protocol
 	- cd projects/exchange-protocol
 	- check hardhat.config.ts
 		ex) set testnet to <new chain>
 	- deploy
 		npx hardhat --network testnet run scripts/deploy-pancake-factory.ts

 2.2. pancake-v3-contracts
 	cd pancake-v3-contracts
 	yarn install
 	
 	2.2.1. common settings
 	- common/config.ts
 		add an object entry for the new chain.



 	2.2.2. v3-core
 	- go to projects/v3-core
 	- check hardhat.config.ts

 	2.2.3. v3-periphery
 	- go to projects/v3-periphery
 	- check hardhat.config.ts
 	