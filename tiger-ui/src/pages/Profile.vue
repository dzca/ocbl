<template>
<div>
  <h2>Home</h2>
  <ul>
    <li>email: {{ email }}</li>
    <li>name: {{name}}</li>
    <li>token: {{ token }}</li>
  </ul>
</div>
</template>

<script>
import _ from 'underscore'
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      token: '',
      email: '',
      name:''
    }
  },
  created: function () {
    // this.token = this.$route.query.token
    // this.email = this.$route.query.email
    // console.log('called github created() ' + this.token)

    // get account form mankey by POST token
    if (localStorage.getItem('tiger-token')) {
      let auth_token = localStorage.getItem('tiger-token')
      // JSON.parse(localStorage.getItem('tiger-token'))
      console.log('add auth_token=%s', auth_token)
      axios.defaults.headers.common['Authorization'] = auth_token;

      // Testing the api here
      axios.get('/mankey/api/account/get')
      .then(res => {

        let account = JSON.parse(res.data.user)
        console.log('query user from mankey return, account =%s, type=%s', account, typeof account)
        this.email = account.email
        this.name = account.name
        this.token = auth_token
      }, err => {
        console.log('err=%j', err)
      })
    } else {
      console.log('error no tiger-token in local storage!')
    }


  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
