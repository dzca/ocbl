<template>
<div id="app">
  <Head/>

  <div class="main">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</div>
</template>

<script>
import Head from '@/components/header/Head'
import {
  mapActions
} from 'vuex'
import { Cell } from 'mint-ui';


export default {
  name: 'App',
  components: {
    Head
  },
  created() {
    console.log('path=> %j', this.$route.name)
    this.setHeadNav(this.$route.name)
  },
  methods: {
    ...mapActions(['setHeadNav'])
  }
}
</script>

<style lang="scss">
.main {
  /* margin-top: 90px; */
  /* padding-top: 1px; */
  font-family: 'Arial', 'Helvetia', 'Verdana';
  font-size: 14px;
  margin: 0px 10px;
  line-height: 1.2;
}

// @import '../node_modules/bootstrap/scss/bootstrap.scss';

</style>
