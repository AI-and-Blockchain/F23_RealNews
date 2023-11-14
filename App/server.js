const ethers = require('ethers');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const Moralis  = require('moralis');
const app = express();
app.use(express.json());
var port = 5000;
app.use(cors({
    origin: 'http://localhost:5000'
}))
// const API_URL = process.env.API_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const contractAddress = process.env.CONTRACT_ADDRESS;

// const provider = new ethers.providers.JsonRpcProvider(API_URL);
// const signer = new ethers.Wallet(PRIVATE_KEY, provider);
// //we get this after deploying the contract
// const {abi} = require("./artifacts/contracts/contractApi.sol/contractApi.json");
// const contractInstance = new ethers.Contract(contractAddress, abi, signer);



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
});

//shell of route for creating a post
app.post("/createPost", async (req, res) => {
    //here we need to take data from the request which contains the claim, combine it with the response from bard
    //and create a json file out of it that we will store on IPFS

    //call bard api and get repsonse
    // create a file something like this
    // {
    //     claim: ""
    //     repsonse: ""
    // }

    //move file to our server
    async function moveFiletoServer() {
        sampleFile.mv(__dirname + `/${filename}`, err => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log("File added to the server successfully !!!")
        })
    }

    //use moralis api to upload a file to IPFS
    async function uploadToIpfs(){
        await Moralis.start({
            apiKey: process.env.MORALIS_KEY
        })

        const res = await Moralis.EvmApi.ipfs.uploadFolder({
            abi: "file that we will create"
        })
        
        //res.result will give us the hash we need that to then store it on the chain
        console.log(res.result)
        return res.result
    }
    

    async function storeDataInBlockchain(hash) {
        const API_URL = process.env.API_URL;
        const PRIVATE_KEY = process.env.PRIVATE_KEY;
        const CONTRACT_ADDRESS_1 = process.env.CONTRACT_ADDRESS;
        // Contract ABI
        const { abi } = require("./artifacts/contracts/IPFShashStorage.sol/IPFShashStorage.json");
        const provider = new ethers.providers.JsonRpcProvider(API_URL);
        // It calculates the blockchain address from private key
        const signer = new ethers.Wallet(PRIVATE_KEY, provider);
        //console.log(signer)
        const StorageContract = new ethers.Contract(CONTRACT_ADDRESS_1, abi, signer);

        let _hash = hash.toString();

        const isStored = await StorageContract.isFileStored(name);

        if (isStored == false) {
            console.log("Storing the IPFS hash...");
            const tx = await StorageContract.upload(name, _hash);
            await tx.wait();
            const storedhash = await StorageContract.getIPFSHash(name)
            res.send(`IPFS hash is stored in the smart contract: ${storedhash}`);
        }

        else {
            console.log("Data is already stored for this file name");
            const IPFShash = await StorageContract.getIPFSHash(name);
            res.send(`The stored hash is: ${IPFShash}`);
        }


    }

    await moveFiletoServer();

    await new Promise(resolve => setTimeout(resolve, 3000));

    let hash = await uploadToIpfs();

    await storeDataInBlockchain(hash);
})

//route for retrieving post

//get all posts

//fact check

//upvote

//downvote

app.listen(port, () => {console.log(`server started on ${port}`)})