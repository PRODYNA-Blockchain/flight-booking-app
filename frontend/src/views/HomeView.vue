<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { fetchAllFlights, bookFlight } from '@/services/contract-api'; // import contract api methods
import useAccount from '@/composables/useAccount';
import useWeb3 from '@/composables/useWeb3';
import flightListMock from '@/data/flightList-mock.json';
import receiptMock from '@/data/book-receipt.json';
import type { Receipt } from '@/types/types';

const { accountAddress } = useAccount();
const flightList = ref<any[]>([]);
const selectedFlightIndex = ref<number>(-1);
const seatNumber = ref<number>(1);
const bookReceipts = reactive<any[]>([]);
const isLoading = ref<boolean>(false);
const { hasError: hasContractError } = useWeb3();

onMounted(async () => {
  flightList.value = await fetchAllFlights(); // fetch flight list from blockchain network
});

function selectFlight(index: number) {
  if (selectedFlightIndex.value === index) selectedFlightIndex.value = -1;
  else selectedFlightIndex.value = index;
}

async function bookSeat(flightId: string, seatNumber: number, seatPrice: number, accountAddress: string) {
  isLoading.value = true;
  const response = await bookFlight(flightId, seatNumber, seatPrice, accountAddress); // book seat on blockchain network
  isLoading.value = false;

  if (response?.status) {
    bookReceipts.push(response.receipt);
    flightList.value = await fetchAllFlights();
  }
}
</script>

<template>
  <main>
    <h1>Book a Flight</h1>
    <div v-if="hasContractError">Contract address error, please set and verify contract address on Settings Page first</div>
    <table v-else cellspacing="0" cellpadding="0">
      <thead>
        <tr class="table-header">
          <td>ID</td>
          <td>Date</td>
          <td>From</td>
          <td>Destination</td>
          <td>NFT Collection Address</td>
          <td>Capacity</td>
          <td>Availability</td>
          <td>Price</td>
          <td>Seat No</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody class="body">
        <tr
          v-for="(flight, index) in flightList"
          :key="flight?.id"
          class="table-row"
          :class="[index === selectedFlightIndex ? 'table-row--selected' : '']"
        >
          <td>{{ flight?.id }}</td>
          <td @click="selectFlight(index)" class="clickable date">{{ flight?.startTime }}</td>
          <td @click="selectFlight(index)" class="clickable">{{ flight?.from }}</td>
          <td @click="selectFlight(index)" class="clickable">{{ flight?.to }}</td>
          <td @click="selectFlight(index)" class="nft">{{ flight?.nftCollectionAddress }}</td>
          <td>
            <div class="seat">
              <span>{{ flight?.totalSeats }}</span>
              <v-icon icon="mdi-seat-recline-normal" />
            </div>
          </td>
          <td>
            <div class="seat">
              <span>{{ flight?.availableSeats }}</span>
              <v-icon icon="mdi-seat-recline-normal" />
            </div>
          </td>
          <td>{{ flight?.seatPrice }}</td>
          <td class="input">
            <v-text-field v-if="selectedFlightIndex === index" label="Seat No" v-model="seatNumber" />
          </td>
          <td>
            <div v-if="selectedFlightIndex === index" class="actions">
              <v-btn
                prepend-icon="mdi-airplane"
                variant="tonal"
                @click="bookSeat(flight?.id, seatNumber, flight?.seatPrice, accountAddress)"
                :disabled="isLoading || flight.availableSeats == 0"
              >
                Book
              </v-btn>
              <span v-if="flight.availableSeats != 0" class="caption">(pay {{ flight?.seatPrice }} wei)</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="alerts">
      <div v-for="(receipt, index) in bookReceipts" :key="receipt?.transactionHash" class="alert">
        <v-alert type="info" closable icon="mdi-seat-recline-normal" :title="receipt?.events?.SeatBooked?.event" class="alert">
          <div><strong>Flight ID:</strong> {{ receipt?.events?.SeatBooked?.returnValues?.flightId }}</div>
          <div><strong>Passenger:</strong> {{ receipt?.events?.SeatBooked?.returnValues?.passenger }}</div>
          <div><strong>Transaction Hash:</strong> {{ receipt?.events?.SeatBooked?.transactionHash }}</div>
          <div><strong>Block Hash:</strong> {{ receipt?.events?.SeatBooked?.blockHash }}</div>
          <div><strong>Block No:</strong> {{ receipt?.events?.SeatBooked?.blockNumber }}</div>
        </v-alert>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.row1 {
  border: 1px solid red;
  display: flex;
  width: 100%;
  flex: 1;
  justify-content: space-between;
}

table {
  margin-top: 16px;
  // width: 100%;
  max-width: 1280px;
  border: 1px solid #3d3d3d;
  border-radius: 4px;
}

tbody tr:nth-child(even) {
  background-color: #1d1d1d;
  max-width: 1280px;
}

tr {
  max-width: 1280px;
}

.table-header {
  border: 2px solid red;

  font-size: 20px;
  color: rgb(214, 180, 255);
  background-color: rgb(40, 40, 40);
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  max-width: 120px;
  .caption {
    font-size: 14px;
  }
}

.input {
  width: 90px;
  label {
    font-size: 14px;
  }

  display: flex;
  flex-direction: column;
  // max-width: 100px;
}

.flight {
  border: 1px solid red;
  font-size: 18px;
}

.table-row td {
  font-size: 18px;
  min-height: 84px;
}

.table-row .nft {
  font-size: 12px;
}

tr td {
  padding: 4px 8px;
}

.table-row {
  &--selected {
    color: #fff;
    background-color: #2c2c2c;
  }

  .date {
    width: 200px;
  }

  .seat {
    display: flex;
    justify-content: center;
    gap: 4px;
  }
}

.clickable:hover {
  cursor: pointer;
}

.alerts {
  margin: 16px 0;
  .alert {
    margin: 8px 0;
    font-size: 18px;
  }
}
</style>
