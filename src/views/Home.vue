<template>
  <div class="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center py-3">
    <div class="row w-100 h-100">
      <div class="col-md-5 col-lg-3">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Currencies</span>
          <span v-if="currencies.DISPLAY" class="badge bg-secondary rounded-pill">{{ Object.keys(currencies.DISPLAY).length }}</span>
        </h4>
        <ul v-if="currencies.DISPLAY" class="list-group mb-3">
          <router-link 
            v-for="(currency, i) in currencies.DISPLAY" 
            :key="i" 
            tag="li" 
            active-class="active" 
            class="currency-item list-group-item d-flex justify-content-between lh-sm"
            :to="{ name: 'currency', params: {id: i}}"
          >
            <div>
              <h6 class="my-0 d-flex align-items-center">
                <img :src="`${crypto_app_url}/${currency.USD.IMAGEURL}`" alt="" style="max-width: 30px">
                <span class="currency-item__name ml-3 text-muted">{{ i }}</span>
              </h6>
              <!-- <small class="text-muted">Brief description</small> -->
            </div>
            <div class="d-flex flex-column">
              <span v-for="(sub_currency, j) in currency" :key="`${i}-${j}`" class="text-muted">
                {{ sub_currency.PRICE }} 
              </span>
            </div>
          </router-link>
        </ul>
      </div>
      <div class="col-lg-9 d-flex flex-column">
        <h4 class="d-flex justify-content-between align-items-center mb-3 ml-lg-5 pl-lg-2" style="flex: 0 1 auto;">
          <span class="text-muted">Daily Pair </span>
          <span class="badge bg-secondary rounded-pill"><span class="fw-bold">{{ $route.params.id }} / USD</span></span>
        </h4>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MyChart from '@/components/MyChart.vue'
import ApiCryptoCompare from '@/api/cryptocompare'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MyChart
  },
  data() {
    return {
      crypto_app_url: process.env.VUE_APP_CRYPTOCOMPARE_URL,
      currencies: {},
      currenciesName: []
    }
  },
  methods: {
    getCurrencies() {
      ApiCryptoCompare.pricemultifull({
        params: {
          fsyms: 'BTC,ETH,DASH,REP',
          tsyms: 'USD'
        }
      })
      .then((res) => {
        this.currenciesName = Object.getOwnPropertyNames(res.data.DISPLAY)
        if(!(this.$route.params.id)) this.$router.push({ name: 'currency', params: {id: this.currenciesName[0]}})
        this.currencies = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
  mounted() {
    // console.log(process.env.VUE_APP_CRYPTOCOMPARE_URL)
    this.getCurrencies()
  }
}
</script>

<style scoped lang="scss">
  .currency-item {
    cursor: pointer;
    background-color: #2c3945;

    &:hover,
    &.active {
      background-color: #23a776;
      border-color: #23a776;

      .text-muted {
        color: #fff !important;
      }

      .currency-item__name {
        color: #fff;
      }
    }
  }
</style>
