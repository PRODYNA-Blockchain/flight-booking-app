<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import TheWelcome from '../components/TheWelcome.vue';
import { fetchAllFlights, postBookFlight, bookFlight } from '@/services/contract-api';
import flightListMock from '@/data/flightList-mock.json';
import useAccount from '@/composables/useAccount';
import type { Receipt } from '@/types/types';
const { accountAddress } = useAccount();

const flightList = ref<any[]>([]);
const selectedFlightIndex = ref<number>(-1);
const seatNumber = ref<number>(1);

const bookReceipts = reactive<Partial<Receipt>[]>([]);
const isLoading = ref<boolean>(false);

onMounted(async () => {
  flightList.value = await fetchAllFlights();
});

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
    <table>
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
          <td>{{ flight?.totalSeats }} seats</td>
          <td>{{ flight?.availableSeats }} seats</td>
          <td>{{ flight?.seatPrice }}</td>
          <td class="input">
            <!-- <label>Seat Number</label> -->
            <!-- v-if="selectedFlightIndex === index" type="number" -->
            <!-- <input v-if="selectedFlightIndex === index" type="number" v-model="seatNumber" placeholder="seat number" /> -->
            <v-text-field v-if="selectedFlightIndex === index" label="Seat Number" v-model="seatNumber"></v-text-field>
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
      <div v-for="receipt in bookReceipts" :key="receipt?.transactionHash">
        <v-alert closable icon="mdi-vuetify" :title="receipt?.events?.SeatBooked?.event" :text="receipt?.blockHash"></v-alert>
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
  width: 100%;
  border: 1px solid #3d3d3d;
  padding: 8px;
  border-radius: 4px;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 120px;
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

.table-header {
  font-size: 22px;
  color: rgb(216, 216, 216);
}

.table-row td {
  font-size: 18px;
  min-height: 84px;
  // padding: 4px;
}
tr td {
  padding: 4px;
}

.table-row {
  &--selected {
    background-color: #2c2c2c;
  }

  .date {
    min-width: 150px;
  }
}

.clickable:hover {
  cursor: pointer;
}

.alerts {
  margin: 16px 0;
}
</style>
