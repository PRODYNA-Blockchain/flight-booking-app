import { ref } from 'vue';
import Web3 from 'web3'; // import web3 library
import erc20abi from '../contract-schemas/Flights.json'; // import contract abi
import { useLocalStorage } from '@vueuse/core';
import type { Contract } from 'web3-eth-contract';

const contract = ref<Contract>(); // define a ref to store the contract instance

export default function useWeb3() {
  const lsAddress = useLocalStorage('contractAddress', '');
  const errorMsg = ref<string>('');
  const hasError = ref<boolean>(false);

  createContract(lsAddress.value); // create contract on load

  function createContract(address: string | undefined) {
    const web3 = new Web3(Web3.givenProvider); // create web3 instance of the browser's web3 provider
    let contractResponse;
    errorMsg.value = '';
    hasError.value = false;
    try {
      contractResponse = new web3.eth.Contract(erc20abi as any, address); // create contract instance
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
