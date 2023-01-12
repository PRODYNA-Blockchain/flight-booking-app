import { ref } from 'vue';
import Web3 from 'web3';
import erc20abi from '../contract-schemas/Flights.json';
import type { Contract } from 'web3-eth-contract';

// const contractAddress = '0x9253cB32201C9fEF68718D99eAB5784126921Ce7'; //5_Flights.sol
// const contractAddress = '0x6333CA09fE20c7C76914335C04341fe86da5BFfc'; //6_Flights.sol
const defaultContractAddress = '0x0415D3F2A0E8B785293861f792fBb07BB76C0354'; //6_Flights.sol
const contractAddress = ref<string>(defaultContractAddress);

export default function useWeb3() {
  const contract = ref<Contract>();
  const web3 = new Web3(Web3.givenProvider);
  createContract();

  function createContract() {
    const web3 = new Web3(Web3.givenProvider);
    let contractResponse;
    try {
      contractResponse = new web3.eth.Contract(erc20abi as any, contractAddress.value);
    } catch (error) {
      console.error(error);
    } finally {
      if (contractResponse) contract.value = contractResponse;
      else contract.value = undefined;
    }
  }

  function updateContractAddress(address: string) {
    contractAddress.value = address;
    createContract();
  }

  return { contract, updateContractAddress, contractAddress };
}
