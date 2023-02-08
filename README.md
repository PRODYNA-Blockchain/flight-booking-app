# Flight booking dApp

Flight booking decentralized application is a demo app that is developed to run on Camino Blockchain Network. The dApp is already deployed here at [http://flight-booking-app-camino.s3-website.eu-central-1.amazonaws.com/](http://flight-booking-app-camino.s3-website.eu-central-1.amazonaws.com/) but you can also run it on your local machine.

## Installation

For installation you can follow the steps below:

1. Clone this repository

### Frontend

2. Go to the frontend directory `cd frontend`
3. `npm i`
4. `npm run dev`
5. open http://127.0.0.1:5173
6. In case you want to use your deployed contract, go to Settings Page (Menu -> Settings) and add the specific contract address.

You can find and use already deployed contract addresses below:

#### Contract 1

`0x1fAb331197A8F75bf3a232601306B6Eb3eAbAB11`

#### Contract 2

`0x3b2e3042B950fBaf9b46aac37a5cb38a616f5Af4`

#### Contract 3

`0x6beAd0a638407798C9461B9590b452CE21ca6195`

#### Contract 4

`0xb3D7DB2c87fAf0B20a63b8248f20c61B95527305`

### Metamask Extension Configuration

In order to access your wallet you need to install the metamask extension to your browser (download it here for chrome: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)

#### Add Camino Network

In order to communicate to the Camino Test Network you can add custom network in settings page like below:

![Metamask configuration to add Camino Network](./Metamask-Camino-Network-Config.png?raw=true 'Metamask configuration to add Camino Network')

### Smart Contract

You can access and see the solidity smart contract at the `/contracts` directory

### Pre-defined User Accounts

The following user accounts with enough balance (CAM) and KYC verified have been created:

#### Account 1

**Key Phrase for camino wallet:** `damp pulp twelve digital mail volume check you lounge enrich enforce blossom often episode reveal whisper beauty cruise stem symptom immense save physical spin`

**PrivateKey for MetaMask:** `f2089daeaefa4ef36f3480dafc118a66c2e740eec7fbe18b4284ec7e373189ad`

**Address:** `0x3e30199e35a0958f3f9d841ac135f5618726036a`

#### Account 2

**Key Phrase for camino wallet:** `dog blouse void soon various boss guess welcome soccer manage enable antenna access fabric animal join furnace edge about suspect mean bachelor offer baby`

**PrivateKey for MetaMask:** `a37174d3644f6b1ec93a1cc2eba74cb2a9a2fa419761cccee74b24ace7d1b945`

**Address:** `0x1d4e5fea6a069030d12f317d3c748cd6d8ddca32`

#### Account 3

**Key Phrase for camino wallet:** `struggle wet toast stem jar vocal resemble arm inmate solution version limit fun narrow minor hover inform boat skirt naive bulk base trigger talk`

**PrivateKey for MetaMask:** `ef6369ef0d33bf27a418d81879fbf8ab97de52e9ffdc473748b3eb3e1bf7db43`

**Address:** `0x053d96dcfae89990796f01305a52121b8201b439`

#### Account 4

**Key Phrase for camino wallet:** `ridge pair volcano mixture arrest success pumpkin fog monster toy slide illness network notable entire unknown wash noble problem patch wagon health nephew jealous`

**PrivateKey for MetaMask:** `70bb9e83c850ea49f28604feea322981e265cfb977bf3d7b24102c65fc64061c`

**Address:** `0xfc3c7094a3bda296658830567019313cb76b97e5`

#### Account 5

**Key Phrase for camino wallet:** `fun shock slight concert fetch cargo double question hurt code guide unknown rug harbor banana absurd cave key term promote entire hybrid round nerve`

**PrivateKey for MetaMask:** `d5f87952a8c6d7180efe45e1889054600c9c614c4631ea9cb27a96bf39211945`

**Address:** `0x5cda27ed6fa7fa22294e913211e783828231e079`

### ABI (application binary interface)

The contract schema or ABI for the developed contract is already hardcoded to the dApp and you can find it to the `/contract-schemas/Flights.json`. In case you are going to change the smart contract, the ABI will be also changed, thus you have to replace it accordingly.

### Camino Wallet

You can access the Camino Wallet at [http://13.93.47.218/](http://13.93.47.218/) by using your private key

### Remix IDE

You can use the Remix online IDE [https://remix.ethereum.org/](https://remix.ethereum.org/) in order to upload, compile and deploy the contract on the Camino Network.

### Flight Dummy Data

When you create a new flight in Remix IDE, you can use the `createFlight` function with the following dummy data:

**flightId:** `1`

**from:** `Thessaloniki`

**to:** `Athens`

**startTime:** `1676034000`

**endTime:** `1676045000`

**seatPrice:** `50`

**seatCount:** `3`
