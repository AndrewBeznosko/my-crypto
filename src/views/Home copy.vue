<template>
  <div class="container py-3">
    <div class="row justify-content-center">
      <div class="my-3 plate-page text-center">
    
      <div class="number">
        <div class="number__flag">
          <div class="number__flag-icon">
            <div class="number__flag-blue"></div>
            <div class="number__flag-yellow"></div>
          </div>
          <div class="number__country">UA</div>
        </div>
        <input type="text" class="number__text" placeholder="AA 3423 BC"> 
      </div>
    
  </div>

      <div class="col-lg-6 d-flex flex-column align-items-center">
        <form @submit.prevent="getInfo">
          <div class="row">
            <div class="col-12">
              <label for="number" class="form-label">Введіть номер автомобіля</label>
              <div class="input-group mb-3">
                <input 
                  v-model="number"
                  type="text" 
                  class="form-control" 
                  id="number" 
                  placeholder="AA9359PC" 
                  required
                >
                <button 
                  class="btn btn-primary" 
                  type="submit" 
                  id="number"
                >Знайти</button>
              </div>              
            </div>
          </div>
        </form>

        <!-- <router-view/> -->
      </div>

      <div class="col-lg-7">
        <div class="card" style="width: 18rem;">
          <img src="https://static.classistatic.de/pubse/static/efficiency_A.c9e9c7414a04fc9db98ad67843779d8c.png" class="card-img-top" alt="car">
          <div class="card-body">
            <h1 v-if="operations.length">{{ operations[0].brand }} {{ operations[0].model }}</h1>
            <table v-for="(operation, i) in operations" :key="i" class="table table-bordered border-primary mb-3">
              <tr>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1 class="my-5 text-uppercase fw-bold text-center">Екологічність автомобіля</h1>
      </div>
      <div class="col-lg-6">
        <img src="https://static.classistatic.de/pubse/static/efficiency_A.c9e9c7414a04fc9db98ad67843779d8c.png" alt="">
        <h2 class="fw-bold mt-3">CO₂ ефективність</h2>
        <p style="max-width: 340px;">Визначається на основі виміряних викидів CO₂ з урахуванням маси автомобіля.</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MyChart from '@/components/MyChart.vue'
import ApiOpencars from '@/api/opencars'
import ApiBazaGai from '@/api/baza-gai'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MyChart
  },
  data() {
    return {
      crypto_app_url: 'process.env.VUE_APP_CRYPTOCOMPARE_URL',
      currencies: {},
      number: 'AA9359PC',
      operations: []
    }
  },
  methods: {
    getOperations() {
      ApiOpencars.operations({
        params: {
          number: this.number,
          limit: 10,
          order: 'desc'
        }
      })
      .then((res) => {
        this.operations = res.data
        // if(!(this.$route.params.id)) this.$router.push({ name: 'currency', params: {id: res.data.Data[0].CoinInfo.Name}})
        // this.currencies = res.data.Data

        // this.currenciesNames = res.data.Data.map((el) => { return el.CoinInfo.Internal })
      })
      .catch((err) => {
        // console.log(err)
      })
    },
    getInfo() {
      ApiBazaGai.getInfo(this.number)
      .then((res) => {
        this.operations = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    
    // this.getCurrencies()
  },
}
</script>

<style scoped lang="scss">
  .number {
  display: inline-flex;
  border: 3px solid #484848;
  font-size: 3.2rem;
  border-radius: 5px;
  width: auto;
}

.number__text {
  padding: 2px 50px;
  flex-grow: 3;
      max-width: 385px;
}

.number__flag {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #2860ab;
  color: white;
  padding: 12px 0 6px;
  align-items: center;
  width: 50px
}

.number__flag-icon {
  width: 32px;
}

.number__flag-blue {
  background: #3a75c4;
  height: 10px;
}

.number__flag-yellow {
  background: #f9dd16;
  height: 10px;
}

.number__country {
  font-size: 1.4rem;
}


.number-medium { font-size: 1.8rem; width: 100%; }
.number-medium .number__text { padding: 0.5rem; text-align: center; }
.number-medium .number__flag { width: 24px; padding: 8px 0 4px; }
.number-medium .number__flag-icon { width: 24px; }
.number-medium .number__country { font-size: 1rem;  }

.number-medium .number__flag-blue { height: 8px; }
.number-medium .number__flag-yellow { height: 8px; }
</style>
