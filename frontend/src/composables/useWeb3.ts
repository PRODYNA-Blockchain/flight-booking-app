import { ref } from 'vue';
import Web3 from 'web3';
import erc20abi from '../contract-schemas/Flights.json';
import type { Contract } from 'web3-eth-contract';

// const contractAddress = '0x396a88D70F7D9Cb11504a38175205bBAb28DDBF4'; //old contract
// const contractAddress = '0x9253cB32201C9fEF68718D99eAB5784126921Ce7'; //5_Flights.sol
// const contractAddress = '0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99'; //6_Flights.sol not working with ABI
// const contractAddress = '0x6333CA09fE20c7C76914335C04341fe86da5BFfc'; //6_Flights.sol
const contractAddress = '0x0415D3F2A0E8B785293861f792fBb07BB76C0354'; //6_Flights.sol

export default function useWeb3() {
  const contract = ref<Contract>();
  const web3 = new Web3(Web3.givenProvider);
  contract.value = new web3.eth.Contract(erc20abi as any, contractAddress);
  return { contract };
}
