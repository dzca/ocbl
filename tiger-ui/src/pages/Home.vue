<template>
<div>
  <h2>Home</h2>
  <a :href="githubUrl">
    <img src="../assets/github.png" class="img-responsive login-icon" alt="github.com">
  </a>
  <a :href="googleUrl">
    <img src="../assets/google.png" class="img-responsive login-icon" alt="github.com">
  </a>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      githubUrl: 'https://api.githab.com/api/login/xya',
      googleUrl: ''
    }
  },
  created: function () {
    // this.googleUrl url send state

    axios.get('/google/signin',{
      params: {
        path: 'test_path',
        app: 'tiger'
      }
    }).then(res => {
      console.log('res=%j', res)
      this.googleUrl = res.data
    }, err => {
      console.log('err=%j', err)
    })
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-icon {
  width: 40px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
