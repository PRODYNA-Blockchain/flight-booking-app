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

### Smart Contract

You can access and see the solidity smart contract at the `/contracts` directory

### ABI (application binary interface)

The contract schema or ABI for the developed contract is already hardcoded to the dApp and you can find it to the `/contract-schemas/Flights.json`. In case you are going to change the smart contract, the ABI will be also changed, thus you have to replace it accordingly.

### Camino Wallet

You can access the Camino Wallet at [http://13.93.47.218/](http://13.93.47.218/) by using your private key

### Other tools

You can use the Remix online IDE [https://remix.ethereum.org/](https://remix.ethereum.org/) in order to upload, compile and deploy the contract on the Camino Network
