<template>
  <div class="about">
    <h1>My Bookings</h1>
    <div class="content">
      <h3>You can find your tickets by accessing camino wallet by clicking to the button</h3>
      <v-btn variant="outlined" rounded="pill" color="primary" prepend-icon="mdi-wallet" href="http://13.93.47.218/" target="_blank">
        Wallet
      </v-btn>
    </div>
  </div>
</template>

<style>
.content {
  margin-top: 16px;
  display: flex;
  gap: 16px;
}
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
