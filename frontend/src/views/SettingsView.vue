<script setup lang="ts">
import { watch } from 'vue';
import useWeb3 from '@/composables/useWeb3';
import { useLocalStorage } from '@vueuse/core';

const { updateContractAddress, contract } = useWeb3();

const address = useLocalStorage('contractAddress', null);

watch(address, () => {
  updateContractAddress(address.value);
});
</script>

<template>
  <main class="settings">
    <h1>Settings</h1>
    <br />
    <div class="address-row">
      <div class="input-field">
        <v-text-field label="Deployed Contract Address" prepend-icon="mdi-file-document" v-model="address" class="input-field" clearable />
      </div>
      <div>
        <v-icon v-if="contract && address" icon="mdi-check-underline" color="success" size="x-large" />
        <v-icon v-else icon="mdi-alert-circle" class="alert" size="x-large" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.address-row {
  display: flex;
  gap: 16px;
  align-items: baseline;

  .input-field {
    flex-basis: 66%;
  }
}

.alert {
  color: #ff4961;
}

.success {
  color: #2fdf75;
}
</style>
