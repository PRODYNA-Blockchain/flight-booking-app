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
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="75" height="75" />

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <div class="user-info">
        <div class="item">
          <h3 class="value">User</h3>
          <h3>{{ accountAddressShort }}</h3>
        </div>
        <div class="item">
          <h3 class="value">Balance</h3>
          <h3>{{ balance?.toFixed(4) }} <span class="value">ETH</span></h3>
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
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

header .user-info {
  display: flex;
  flex-direction: column;
  min-width: 250px;
  justify-content: center;
  align-items: flex-end;
  margin: 8px;
  padding: 8px;

  .item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    h3 {
      font-size: 1rem;
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
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
