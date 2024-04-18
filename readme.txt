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
 	
 	2.1.2 exchange-protocol
 	- cd projects/exchange-protocol
 	- check hardhat.config.ts
 		ex) set testnet to <new chain>
 	- deploy
 		npx hardhat --network testnet run scripts/deploy-pancake-factory.ts
 	- copy deployed contract address to "v2Factory" field in "pancake-v3-smart-contracts/common/config.ts"

 	2.1.3 stable-swap
 	- cd projects/stable-swap
 	- check hardhat.config.ts
 		ex) set testnet to <new chain>
 	- deploy LPFactory
 		npx hardhat run scripts/deploy_LPFactory.ts --network <target network>
 		copy deployed address to 
 		"stable-swap/config.ts" : "LPFactory"
 	- deploy SwapTwoPoolDeployer
 		npx hardhat run scripts/deploy_swapTwoPoolDeployer.ts --network <target network>
 		copy deployed address to 
 		"stable-swap/config.ts" : "TwoPoolInfo"
 	- deploy SwapThreePoolDeployer
 		npx hardhat run scripts/deploy_swapThreePoolDeployer.ts --network <target network>
 		copy deployed address to 
 		"stable-swap/config.ts" : "TwoPoolInfo"
 	- deploy StableSwapFactory and StableInfo
 		npx hardhat run scripts/deploy.ts --network <target network>
 		copy deployed addresses to pancake-v3-contracts/common/config.ts : "stableFactory"

 	2.1.3. cake-vault
 	- cd projects/cake-vault
 	- check hardhat.config.ts
 	- deploy
 		npx hardhat run scripts/deploy.ts --network <target network>
 	- copy deployed cake contract address to "pancake-v3-contracts/common/config.ts" -> "cake" field

 2.2. pancake-v3-contracts
 	cd pancake-v3-contracts
 	yarn install
 	
 	2.2.1. common settings
 	- common/config.ts
 		add an object entry for the new chain.

 	2.2.2. v3-core
 	- go to projects/v3-core
 	- check hardhat.config.ts
 	- deploy
 		yarn hardhat run scripts/deploy.ts --network <target network>
 		deployed address will saved at "deployments/<target net>.json" file.
 	- verify contracts
 		yarn hardhat run scripts/verify.ts --network <target network>

 	2.2.3. v3-periphery
 	- go to projects/v3-periphery
 	- check hardhat.config.ts
 	- deploy
 		yarn hardhat run scripts/deploy2.ts --network <target network>
 	- verify

 	2.2.3. router
 	- go to projects/router
 	- check hardhat.config.ts
 	- deploy & verify
 		yarn hardhat run scripts/deploy2.ts --network <target network>
 	- deployed addresses are saved in "deployment/<target network>.json" file.

 	2.2.4. masterchef-v3
 	- go to projects/masterchef-v3
 	- check hardhat.config.ts
 	- deploy
 		yarn hardhat run scripts/deploy2.ts --network <target network>
 	- deployed address is saved to "deployment/<target network>.json"

 	2.2.5. v3-lm-pool
 	- go to projects/v3-lm-pool
 	- check hardhat.config.ts
 	- deploy
 		yarn hardhat run scripts/deploy2.ts --network <target network>
 	- deployed address is saved to "deployment/<target network>.json" file.