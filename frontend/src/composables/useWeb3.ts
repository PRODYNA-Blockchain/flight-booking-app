import { ref } from 'vue';
import Web3 from 'web3';
import erc20abi from '../contract-schemas/Flights.json';
import type { Contract } from 'web3-eth-contract';

// const contractAddress = '0x396a88D70F7D9Cb11504a38175205bBAb28DDBF4'; //old contract
// const contractAddress = '0x9253cB32201C9fEF68718D99eAB5784126921Ce7'; //5_Flights.sol
const contractAddress = '0x6333CA09fE20c7C76914335C04341fe86da5BFfc'; //6_Flights.sol

export default function useWeb3() {
  const contract = ref<Contract>();
  const web3 = new Web3(Web3.givenProvider);
  contract.value = new web3.eth.Contract(erc20abi as any, contractAddress);
  return { contract };
}
