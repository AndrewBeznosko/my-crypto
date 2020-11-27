<template>
  <div class="container vh-100 d-flex flex-column align-items-center justify-content-center">
    <HelloWorld msg="Test Task Crypto"/>
    <div class="row w-100">
      <div v-if="currencies.DISPLAY" class="col-md-5 col-lg-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Currencies</span>
          <span class="badge bg-secondary rounded-pill">{{ Object.keys(currencies.DISPLAY).length }}</span>
        </h4>
        <ul class="list-group mb-3">
          <li v-for="(currency, i) in currencies.DISPLAY" :key="i" class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0 d-flex align-items-center">
                <img :src="`${crypto_app_url}/${currency.USD.IMAGEURL}`" alt="" style="max-width: 30px">
                <span class="ml-3">{{ i }}</span>
              </h6>
              <!-- <small class="text-muted">Brief description</small> -->
            </div>
            <div class="d-flex flex-column">
              <span v-for="(sub_currency, j) in currency" :key="`${i}-${j}`" class="text-muted">
                {{ sub_currency.PRICE }} 
              </span>
            </div>
          </li>
          <!-- <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Second product</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Third item</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Promo code</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span class="text-success">−$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$20</strong>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ApiCryptoCompare from '@/api/cryptocompare'

export default {
  name: 'Home',
  components: {
    HelloWorld
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
