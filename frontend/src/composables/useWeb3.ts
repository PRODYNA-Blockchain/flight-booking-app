import { ref } from 'vue';
import Web3 from 'web3';
import erc20abi from '../contract-schemas/Flights.json';
import { useLocalStorage } from '@vueuse/core';
import type { Contract } from 'web3-eth-contract';

const defaultContractAddress = '0xFaf2d038f23F99e7c984C70D8c33556358Bf09b0'; //6_Flights.sol
const contract = ref<Contract>();

export default function useWeb3() {
  const lsAddress = useLocalStorage('contractAddress', '');
  // const contractAddress = ref<string>(lsAddress.value ? lsAddress.value : defaultContractAddress);
  const errorMsg = ref<string>('');
  const hasError = ref<boolean>(false);

  createContract(lsAddress.value);

  function createContract(address: string | undefined) {
    const web3 = new Web3(Web3.givenProvider);
    let contractResponse;
    errorMsg.value = '';
    hasError.value = false;
    try {
      contractResponse = new web3.eth.Contract(erc20abi as any, address);
    } catch (error: any) {
      errorMsg.value = 'Contract creation failed, view console for error message';
      hasError.value = true;
      console.error(error);
    } finally {
      if (contractResponse) contract.value = contractResponse;
      else contract.value = undefined;
    }
  }

  function updateContract(address: string | undefined) {
    // const lsAddr = useLocalStorage('contractAddress', '');
    createContract(address);
  }

  return { contract, updateContract, errorMsg, hasError };
}
