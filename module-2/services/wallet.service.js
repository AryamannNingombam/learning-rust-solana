const web3 = require("@solana/web3.js")


exports.AirDropSol = async ({publicKey,secretKey,connection})=>{
    try{
        
const walletKeyPair = await web3.Keypair.fromSecretKey(secretKey);
const fromAirDropSignature = await connection.requestAirdrop(
    new web3.PublicKey(walletKeyPair.publicKey),
    2 * web3.LAMPORTS_PER_SOL
);
await connection.confirmTransaction(fromAirDropSignature);
    }catch(err){
        console.log('error');
        console.log(err);
    }
}

exports.GetWalletBalance = async ({secretKey,publicKey,connection})=>{
    try{
        const myWallet = await web3.Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(
        new web3.PublicKey(myWallet.publicKey));
        return walletBalance;
    }catch(err){
        console.log('error');
        console.log(err);
    }
}