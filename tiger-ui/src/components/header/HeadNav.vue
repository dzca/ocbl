<template>
<div class="header-nav">
  <mt-navbar v-model="headNav">
    <mt-tab-item id="home">Home</mt-tab-item>
    <mt-tab-item id="schedule">Schedule</mt-tab-item>
    <mt-tab-item id="expense">Expense</mt-tab-item>
    <mt-tab-item id="notices">Notices</mt-tab-item>
    <mt-tab-item id="settings">Settings</mt-tab-item>
  </mt-navbar>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  TabItem,
  Navbar
}
from 'mint-ui'

export default {
  name: 'head-nav',
  components: {
    Navbar,
    TabItem
  },
  computed: { ...mapGetters({
      headerNav: 'headNav'
    }),
    headNav: {
      get() {
        // console.log('get=>' + this.headerNav)
        return this.headerNav
      },
      set(name) {
        this.setHeadNav(name)
        this.goRouter(name)
      }
    }
  },
  methods: { ...mapActions(['setHeadNav', 'setBackEnabled']),
    goRouter(name) {
      console.log('name=>%s', name)

      // if (name == 'home') {
      //   this.setBackEnabled(false)
      // } else {
      //   this.setBackEnabled(true)
      // }

      this.$router.push({
        name: name
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.header-nav {
    margin-top: 45px;
    left: 0;
    width: 100%;
    padding-bottom: 3px;
    border-bottom: 1px solid #e4e4e4;
}
</style>
