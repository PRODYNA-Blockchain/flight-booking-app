<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import useAccount from './composables/useAccount';

const { accountAddress, balance } = useAccount();

const accountAddressShort = computed(() => {
  return accountAddress.value.slice(0, 4) + '...' + accountAddress.value.slice(-4);
});
</script>

<template>
  <header>
    <img alt="Camino logo" class="logo" src="@/assets/camino-logo.png" width="230" height="62" />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/my-bookings">My Bookings</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
      </nav>
      <div class="user-info">
        <div class="item">
          <h1 class="value">User</h1>
          <h1>{{ accountAddressShort }}</h1>
        </div>
        <div class="item">
          <h1 class="value">Balance</h1>
          <h1>{{ balance?.toFixed(4) }} <span class="value">CAM</span></h1>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  min-height: 120px;
  width: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 11px;
  text-align: center;
  margin-top: 2rem;
}

header .user-info {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  justify-content: center;
  align-items: flex-end;
  margin: 8px;
  padding: 8px;

  .item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    h1 {
      font-size: 19px;
      font-weight: 500;
      margin-bottom: 0.4rem;
      color: var(--color-heading);
    }

    .value {
      color: var(--color-text);
    }
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 624px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    /*place-items: flex-start;

     flex-wrap: wrap;*/
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1.2rem;

    padding: 1rem 0;
    margin-top: 1.5rem;
  }
}
</style>
