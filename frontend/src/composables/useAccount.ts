import { ref, watch } from 'vue';
import Web3 from 'web3';
import useWeb3 from '@/composables/useWeb3';

const { contract } = useWeb3();
const web3 = new Web3(Web3.givenProvider);
const accountAddress = ref<string>('');
const balance = ref<number | null>(null);

export default function useAccount() {
  if (window?.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts: string[]) => {
      accountAddress.value = accounts[0];
    }); // request user's account address
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      accountAddress.value = accounts[0];
    }); // listen for account address changes
  } else {
    window.alert('Metamask extension not found, you have to install Metamask extension on your browser in order to continue using the app');
    console.log('Metamask not found, you have to install Metamask extension on your browser');
  }

  // every time the account address changes, get the current user's balance
  watch(accountAddress, () => {
    getUserBalance(accountAddress.value);
  });

  async function getUserBalance(fromAddress: string) {
    // get user's balance
    if (!contract.value || !contract.value.methods) {
      console.log('contract not found');
      return;
    }
    if (!fromAddress) {
      console.log('user address not found');
      return;
    }

    await contract.value.methods
      .getBalance()
      .call({ fromAddress })
      .then((balanceStr: string) => {
        balance.value = parseFloat(web3.utils.fromWei(balanceStr, 'ether'));
      }); // call contract's get user's balance method
  }

  return { accountAddress, balance, getUserBalance };
}
