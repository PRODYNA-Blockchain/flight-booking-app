import useWeb3 from '@/composables/useWeb3';
import useAccount from '@/composables/useAccount';
import { useDateFormat } from '@vueuse/core';

import type { Receipt } from '@/types/types';

const { contract } = useWeb3();
const { getUserBalance } = useAccount();

async function fetchAllFlights() {
  let flightIds: string[] = [];
  let flightListRaw: any[] = [];
  let flightList: any[] = [];

  await contract.value?.methods.getAllFlights().call({}, (error: any, result: string[]) => {
    if (error) return [];
    flightIds = result;
  });

  for await (const [flight, id] of flightIds.map(async (id) => {
    const flight = await fetchFlight(id).then((res) => {
      return res;
    });

    return [flight, id];
  })) {
    flightListRaw.push({ ...flight, id });
  }

  // sort by date
  flightListRaw.sort((a: any, b: any) => {
    return a[2] < b[2] ? -1 : 1;
  });

  flightListRaw.forEach((el) => {
    const startTime = useDateFormat(new Date(parseInt(el[2])), 'ddd D MMM YYYY - HH:mm');
    const durationInt = parseInt(el[3]) - parseInt(el[2]);

    const flight = {
      from: el[0],
      to: el[1],
      startTime: startTime,
      endTime: el[3],
      totalSeats: el[4],
      availableSeats: el[5],
      seatPrice: el[6],
      tokenId: el[7],
      id: el?.id,
    };
    flightList.push(flight);
  });

  return flightList;
}

async function fetchFlight(id: string) {
  const response = await contract.value?.methods.getFlightById(id).call({}, function (error: any, result: any) {
    if (error) return;
    else return result;
  });
  return response;
}

// async function postBookFlight(flightId: string, tokenId: number, seatPrice: number, accountAddress: string) {
//   await contract.value?.methods
//     ?.book(flightId, tokenId)
//     .send({ from: accountAddress, value: seatPrice })
//     .on('transactionHash', (hash: any) => {
//       console.log('Transaction hash: ', hash);
//     })
//     .on('confirmation', (confirmationNumber: number, receipt: any) => {
//       console.log('confirmation No: ', confirmationNumber);
//       console.log('Receipt: ', receipt);
//       // props.sendData('book-confirmed', receipt.transactionHash);
//     })
//     .on('error', (error: any) => {
//       console.log('error: ', error);
//       console.error(error);
//     });
// }

async function bookFlight(flightId: string, tokenId: number, value: number, account: string): Promise<any> {
  let response: any = {};
  await contract.value?.methods
    ?.book(flightId, tokenId)
    .send({ from: account, value })
    .then((receipt: Receipt) => {
      response = {
        status: true,
        receipt: receipt,
      };
    })
    .catch((error: Error) => {
      console.error(error);
      console.log('error.message: ', error.message);
      // response = error;
      response = {
        status: false,
        error: error,
      };
    });

  getUserBalance(account);

  return response;
}

export { fetchAllFlights, bookFlight };
