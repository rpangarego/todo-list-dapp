async function main() {
  // Get the list of accounts
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the contract
  const Contract = await ethers.getContractFactory("TodoList");
  const contract = await Contract.deploy();
  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
