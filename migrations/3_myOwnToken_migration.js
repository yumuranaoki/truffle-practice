var myOwnToken = artifacts.require("./MyOwnToken.sol");

module.exports = function(deployer) {
  deployer.deploy(myOwnToken);
};
