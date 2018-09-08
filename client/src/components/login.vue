<template>
  <div>
    <el-row>  <!--  :gutter="0" 响应式布局的元素左右间隔 默认为0-->
      <el-col :xs="24">
        <span>登录</span>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    mounted () {
      this.login()
    },
    methods: {
      login () {
        axios.post('/api/login', {
        username: 'ww22',
        password: '000000'
        })
        .then((data) => {
          console.log(data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
