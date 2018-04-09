<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <div>
        <mt-cell class="page-part" :title="season.name + '  ['+ season.school+']'" :label="season.address"/>
      </div>
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="current">
          <mt-cell v-for="(item, index) in currentSessions" :key="item.id" :title="item.date + ' [ ' + item.week_day + ' ] ' + item.session_time " />
        </mt-tab-container-item>
        <mt-tab-container-item id="past">
          <mt-cell v-for="(item, index) in pastSessions" :key="item.id" class="past-session" :title="item.date + ' [ ' + item.week_day + ' ] ' + item.session_time " />
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="current">
        Current Sessions
      </mt-tab-item>
      <mt-tab-item id="past">
        Past Sessions
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Indicator, Cell, Tabbar, TabItem } from 'mint-ui'
import { mapGetters, mapActions } from 'vuex'
import _ from 'underscore'

export default {

  data() {
    return {
      selected: 'current', // selected id
      currentSessions: [],
      pastSessions: [],
      season:{}
    }
  },
  components: {
    Indicator, Cell, Tabbar, TabItem
  },
  created() {
    this.getList()
  },
  computed: {
    //...mapGetters(['settings', 'getSeason'])
  },
  methods: {
    getList() {

      Indicator.open({
        text: 'loading...',
        spinnerType: 'snake'
      })
      this.axios.get('/tiger/rest/schedule/?format=json').then(({ data }) => {
        Indicator.close()
        this.season = {name:data.name, school: data.school, address: data.address}
        let sessions = data.sessions
        console.log('load sessions=%j', sessions)
        let today = new Date()
        // filter current sessionList
        this.currentSessions = _.filter(sessions, (item) => {
          let date = Date.parse(item.date)
          console.log('current = %s', (today <= date))
          return today <= date
        })
        console.log('current sessions=%j', this.currentSessions)
        // filter past sessionList
        this.pastSessions = _.filter(sessions, (item) => {
          let date = Date.parse(item.date)
          return today > date
        })
      })
    }
  }
}
</script>
<style lang="scss">
.past-session{
  background-color: #f2dede;
}
</style>
