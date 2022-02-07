const web3 = require("@solana/web3.js");
const {
  getWalletBalance,
  AirDropSol,
  transferSol,
} = require("./services/wallet.service");

const run = async () => {
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );
  const userWallet = web3.Keypair.generate();
  const userPublicKey = userWallet.publicKey;
  const userPrivateKey = userWallet.secretKey;
  const user2Wallet = web3.Keypair.generate();
  const user2PublicKey = user2Wallet.publicKey;
  let balance = await getWalletBalance({
    connection,
    publicKey: userPublicKey,
  });
  console.log(balance);
  await AirDropSol({
    connection,
    publicKey: userPublicKey,
    secretKey: userPrivateKey,
  });
  balance = await getWalletBalance({
    connection,
    publicKey: userPublicKey,
  });
  console.log(balance);
  await transferSol({
    connection,
    from: userWallet,
    to: user2PublicKey,
    amount: 1,
    fromPubkey: userPublicKey,
  });
  console.log(
    await getWalletBalance({
      connection,
      publicKey: userPublicKey,
    })
  );
  console.log(
    await getWalletBalance({
      connection,
      publicKey: user2PublicKey,
    })
  );
};

run();
