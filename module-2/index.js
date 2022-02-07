const {
 Connection,
 PublicKey,
 clusterApiUrl,
 Keypair,
 LAMPORTS_PER_SOL,
 Transaction,
 Account,
} = require("@solana/web3.js");
const { GetWalletBalance,AirDropSol } = require("./services/wallet.service");

const newPair = new Keypair();

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;


const sadFunction = async()=>{  
    const connection = await new Connection(
            clusterApiUrl('devnet'),'confirmed'
        )
    const firstBalance = await GetWalletBalance({secretKey,publicKey,connection});
    console.log(firstBalance);
    await AirDropSol({secretKey,publicKey,connection});
    const secondBalance = await GetWalletBalance({secretKey,publicKey,connection});
    console.log(secondBalance);
}

sadFunction();