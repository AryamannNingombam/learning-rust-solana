const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { AssertionError } = require("chai");
const { SystemProgram } = anchor.web3;

describe("mysolanaapp", () => {
  /* create and set a Provider */
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);
  console.log(anchor.workspace);
  const program = anchor.workspace.Mysolanaapp;
  it("initializes the account", async () => {
    const baseAccount = anchor.web3.Keypair.generate();
    await program.rpc.create("Hello world", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Data: ", account.data);
    assert.ok(account.data === "Hello world");
    _baseAccount = baseAccount;
  });
  it("Updates previously created account", async () => {
    const baseAccount = _baseAccount;
    await program.rpc.update("some new data", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
      signer: [baseAccount],
    });
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Updated data: ", account.data);
    assert.ok(account.data === "some new data");
    console.log("Full data: ", account.dataList);
    assert.ok(account.dataList.length === 2);
  });
});
