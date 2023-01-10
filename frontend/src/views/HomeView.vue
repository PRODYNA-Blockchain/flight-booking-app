<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { fetchAllFlights, bookFlight } from '@/services/contract-api';
import flightListMock from '@/data/flightList-mock.json';
import useAccount from '@/composables/useAccount';
import type { Receipt } from '@/types/types';
import receiptMock from '@/data/book-receipt.json';

const { accountAddress } = useAccount();

const flightList = ref<any[]>([]);
const selectedFlightIndex = ref<number>(-1);
const seatNumber = ref<number>(1);

const bookReceipts = reactive<any[]>([]);
const isLoading = ref<boolean>(false);

onMounted(async () => {
  flightList.value = await fetchAllFlights();
});

// bookReceipts.push(receiptMock);

function selectFlight(index: number) {
  if (selectedFlightIndex.value === index) selectedFlightIndex.value = -1;
  else selectedFlightIndex.value = index;
}

async function bookSeat(flightId: string, seatNumber: number, seatPrice: number, accountAddress: string) {
  isLoading.value = true;
  const response = await bookFlight(flightId, seatNumber, seatPrice, accountAddress);
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
    <table cellspacing="0" cellpadding="0">
      <thead>
        <tr class="table-header">
          <td>Date</td>
          <td>From</td>
          <td>Destination</td>
          <td>Address</td>
          <td>Capacity</td>
          <td>Availability</td>
          <td>Price</td>
          <td>Select Seat</td>
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
          <td @click="selectFlight(index)" class="clickable date">{{ flight?.startTime }}</td>
          <td @click="selectFlight(index)" class="clickable">{{ flight?.from }}</td>
          <td @click="selectFlight(index)" class="clickable">{{ flight?.to }}</td>
          <td @click="selectFlight(index)" class="clickable">{{ flight?.tokenId?.slice(0, 6) }}...</td>
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
            <v-text-field v-if="selectedFlightIndex === index" label="Seat Number" v-model="seatNumber" />
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
        <v-alert closable icon="mdi-seat-recline-normal" :title="receipt?.events?.SeatBooked?.event">
          <p>
            <strong>Passenger:</strong> {{ receipt?.events?.SeatBooked?.returnValues?.passenger }} <strong>Flight ID:</strong>
            {{ receipt?.events?.SeatBooked?.returnValues?.flightId.slice(0, 6) }}
          </p>
          <p><strong>Block Hash:</strong> {{ receipt?.blockNumber }}</p>
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
  width: 100%;
  border: 1px solid #3d3d3d;
  border-radius: 4px;
}

tbody tr:nth-child(even) {
  background-color: #1d1d1d;
}

.table-header {
  font-size: 20px;
  color: rgb(216, 216, 216);
  background-color: rgb(40, 40, 40);
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 150px;
  .caption {
    font-size: 14px;
  }
}

.input {
  min-width: 110px;
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
tr td {
  padding: 4px 8px;
}

.table-row {
  &--selected {
    color: #fff;
    background-color: #2c2c2c;
  }

  .date {
    min-width: 150px;
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
  }
}
</style>
