const web3 = require("@solana/web3.js");

exports.AirDropSol = async ({ publicKey, secretKey, connection }) => {
  try {
    const walletKeyPair = await web3.Keypair.fromSecretKey(secretKey);
    const fromAirDropSignature = await connection.requestAirdrop(
      new web3.PublicKey(walletKeyPair.publicKey),
      2 * web3.LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log("error");
    console.log(err);
  }
};

exports.getWalletBalance = async ({ connection, publicKey }) => {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / web3.LAMPORTS_PER_SOL;
  } catch (err) {
    console.log("error");
    console.log(err);
  }
};

exports.transferSol = async ({ connection, from, to, amount, fromPubkey }) => {
  try {
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey,
        toPubkey: to,
        lamports: amount * web3.LAMPORTS_PER_SOL,
      })
    );
    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [from]
    );
    return signature;
  } catch (err) {
    console.log("error");
    console.log(err);
  }
};
