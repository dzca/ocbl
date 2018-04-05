<template>
<div>
  <h2>Home</h2>
  <ul>
    <li>email: {{ email }}</li>
    <li>name: </li>
    <li>token: {{ token }}</li>
  </ul>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      token: '',
      email: ''
    }
  },
  created: function () {
    this.token = this.$route.query.token
    this.email = this.$route.query.email
    console.log('called github created() ' + this.token)

    // this.googleUrl url send state
    // axios.post('/mankey/token',{
    //   params: {
    //     path: 'test_path',
    //     app: 'tiger'
    //   }
    // }).then(res => {
    //   console.log('res=%j', res)
    //   this.googleUrl = res.data
    // }, err => {
    //   console.log('err=%j', err)
    // })
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
