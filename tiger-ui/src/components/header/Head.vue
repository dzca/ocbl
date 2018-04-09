<template>
<div class="header">
  <mt-header fixed :title="'Club Tiger [' +  settings.year + ']'">
    <router-link v-if="head.backEnabled" to="/" slot="left">
      <mt-button icon="back">back</mt-button>
    </router-link>
  </mt-header>

  <HeadNav/>
</div>
</template>

<script>
import { Header } from 'mint-ui'
import HeadNav from './HeadNav'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['head', 'settings', 'getSeason'])
  },
  components: { Header, HeadNav }
}
</script>

<style lang="scss">

</style>
