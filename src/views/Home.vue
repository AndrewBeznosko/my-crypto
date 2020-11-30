<template>
  <div class="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center py-3">
    <div class="row w-100 h-100">
      <div class="col-md-5 col-lg-3">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Toplist by 24H</span>
          <span v-if="currencies.length" class="badge bg-secondary rounded-pill">{{ currencies.length }}</span>
        </h4>
        <ul v-if="currencies.length" class="list-group mb-3">
          <router-link 
            v-for="(currency, i) in currencies" 
            :key="currency.CoinInfo.Internal" 
            tag="li" 
            active-class="active" 
            class="currency-item list-group-item d-flex justify-content-between lh-sm align-items-center"
            :to="{ name: 'currency', params: {id: currency.CoinInfo.Internal}}"
          >
            <div>
              <h6 class="my-0 d-flex align-items-center">
                <img :src="`${crypto_app_url}/${currency.CoinInfo.ImageUrl}`" :alt="currency.CoinInfo.FullName" style="max-width: 30px">
                <span class="currency-item__name ml-3 text-muted">{{ currency.CoinInfo.FullName }}</span>
              </h6>
              <!-- <small class="text-muted">Brief description</small> -->
            </div>
            <div class="d-flex flex-column">
              <span v-for="(sub_currency, j) in currency.DISPLAY" :key="`${i}-${j}`" class="currency-item__price text-white rounded px-3 py-1" :class="currency.CoinInfo.status && currency.CoinInfo.status == 1 ? 'bg-success' : currency.CoinInfo.status && currency.CoinInfo.status == 2 ? 'bg-danger' : ''">
                {{ sub_currency.PRICE }} 
              </span>
            </div>
          </router-link>
        </ul>
        <figcaption class="blockquote-footer mt-4">
          Test Task by Andrew Beznosko <a href="https://github.com/AndrewBeznosko/my-crypto" target="_blank"><cite title="Source Title">Source Code</cite></a>
        </figcaption>
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
    }
  },
  methods: {
    getCurrencies() {
      ApiCryptoCompare.topTotalvolfull({
        params: {
          limit: 15,
          tsym: 'USD'
        }
      })
      .then((res) => {
        if(!(this.$route.params.id)) this.$router.push({ name: 'currency', params: {id: res.data.Data[0].CoinInfo.Name}})
        this.currencies = res.data.Data

        this.currenciesNames = res.data.Data.map((el) => { return el.CoinInfo.Internal })
        // this.runSocket(true)
        this.runSocket()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    runSocket(remove = false) {
      let _this = this
      var ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + process.env.VUE_APP_CRYPTOCOMPARE_API_KEY);
      var subscriptioins = this.currenciesNames.map((el) => {
        return `0~Coinbase~${el}~USD`
      })
      ccStreamer.onopen = function onStreamOpen() {
          var subRequest = {
              action: remove ? "SubRemove" : "SubAdd",
              subs: subscriptioins
          };
          ccStreamer.send(JSON.stringify(subRequest));
      }

      ccStreamer.onmessage = function onStreamMessage(message) {
          var message = event.data;
          let parsedMsg = JSON.parse(message)
          let curIndex = _this.currencies.findIndex(s => s.CoinInfo.Internal === parsedMsg.FSYM)
          if(+(parsedMsg.TYPE) == 0) {
            let status = 0
            if(+(parsedMsg.P) > +(_this.currencies[curIndex].RAW.USD.PRICE)) {
              status = 1
            } else if(+(parsedMsg.P) < +(_this.currencies[curIndex].RAW.USD.PRICE)) {
              status = 2
            }
            _this.$set(_this.currencies[curIndex].CoinInfo, 'status', status)
            _this.currencies[curIndex].DISPLAY.USD.PRICE = `$ ${parsedMsg.P}`
          }

          // console.log("Received from Cryptocompare: " + curIndex + " -- " + message);
      }
    }
  },
  mounted() {
    this.getCurrencies()
  }
}
</script>

<style scoped lang="scss">
  .currency-item {
    cursor: pointer;
    background-color: #2c3945;

    &__price {
      background-color: #384858;
    }

    &:hover,
    &.active {
      background-color: #23a776;
      border-color: #23a776;

      .text-muted {
        color: #fff !important;
      }

      .currency-item {
        &__name {
          color: #fff;
        }

        &__price {
          background-color: transparent;
        }
      }
    }
  }
</style>
