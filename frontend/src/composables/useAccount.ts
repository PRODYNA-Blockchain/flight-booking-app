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
    });
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      accountAddress.value = accounts[0];
    });
  } else {
    console.log('Metamask not found, you have to install Metamask plugin on your browser');
  }

  watch(accountAddress, () => {
    getUserBalance(accountAddress.value);
  });

  async function getUserBalance(from: string) {
    if (!contract.value || !contract.value.methods) {
      console.log('contract not found');
      return;
    }
    if (!from) {
      console.log('user address not found');
      return;
    }

    await contract.value?.methods
      .getBalance()
      .call({ from })
      .then((balanceStr: string) => {
        balance.value = parseFloat(web3.utils.fromWei(balanceStr, 'ether'));
      });
  }

  return { accountAddress, balance, getUserBalance };
}