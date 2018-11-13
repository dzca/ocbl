<template>
<div>
  <mt-cell v-for="(item,index) in notices" :to="'/notices/' + item.slug" :title="'[' + item.create_date + '] ' + item.title" is-link :key="index">
  </mt-cell>
</div>
</template>

<script>
import {
  Indicator
} from 'mint-ui'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {

  data() {
    return {
      test: 'hello'
    }
  },
  created() {
    this.loadLists()
  },
  computed: {
    ...mapGetters(['notices'])
  },
  methods: {
    ...mapActions(['loadNotices']),
    loadLists() {
      console.log('loading notices from remote api...')
      // const noticePromise =
      this.loadNotices();
    }
  }
}
</script>
<style lang="scss">

</style>
