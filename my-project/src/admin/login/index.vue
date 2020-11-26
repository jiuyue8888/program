<template>
  <div class="admin">

    <div class="login">
        <h3>必过分期管理系统</h3>
        <van-field v-model="tel" type="tel" label="手机号" label-width="4em"/>
        <van-field v-model="password" type="password" label="密码" label-width="4em"/>

        <van-field
          v-model="code"
          center
          v-show="false"
          clearable
          label="验证码"
          placeholder="请输入验证码"
          label-width="4em"
        >
          <template #button>
            <van-button size="small" type="info">发送验证码</van-button>
          </template>
        </van-field>

        <van-button type="info" style="width: 70%;margin: 50px auto;display: block;" @click='loginClick'>立即登录</van-button>
    </div>
  </div>
</template>

<script>
  import {login,logout} from "../../server/admin.js"
  import md5 from 'js-md5';
  export default {
    name: 'index',
    data() {
      return {
        tel:'',
        password:'',
        code:'',


      }
    },
    created(){
      /*
      15986936081/123456
      logout({}).then(res=>{
        window.localStorage.removeItem('sessionCode')
      })*/
    },
    methods:{
      loginClick(){
        login({
          mobile:this.tel,
          password:md5(this.password)
        }).then(res=>{
          if(res.data.sessionCode){
            window.localStorage.setItem('sessionCode',res.data.sessionCode)
            window.localStorage.setItem('roleStatus',res.data.roleStatus)

            this.$router.push('./index')
          }else{
            this.$info(res.msg)
          }
        })
      },
      getCode(){

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .admin{
    position: relative;
    width: 100%;
    min-height: 100vh;

    background-color: #f8f8f8;
  }
  .login{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate3d(-50%,-50%,0);
    width: 500px;
    height: 400px;
    font-size: 16px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 10px #ccc;
    box-sizing: border-box;
    padding: 30px;
  }
  .login h3{
    text-align: center;
    font-size: 30px;
    color: #337AB7;
    margin-bottom: 20px;
  }
</style>
