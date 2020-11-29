<template>
  <div class="index">
    <div class="head">
      <img src="../../assets/logo.png" />
      <h3>必过分期</h3>
      <p>必过分期，轻松助你逢考必过</p>
    </div>
    <div class="login">
      <p><img src="../../assets/login_ico_phone@3x(2).png">
      <el-input v-model="iphone" placeholder="请输入手机号" @blur="blur"></el-input>

      <p><img src="../../assets/login_ico_phone@3x(1).png">
      <el-input v-model="code" placeholder="请输入验证码" @blur="blur"></el-input>

      <span @click="getCode" :class="isCode?'':'curr'">{{time}}</span></p>
      <i v-show="false">{{err}}</i>
      <b :class="login?'curr':''" @click='loginHandle'>立即登录</b>
      <strong>登录代表您同意<em @click="$router.push('./xy')">《必过分期用户服务协议》</em></strong>
    </div>
  </div>
</template>

<script>
  import {login,sendLoginMessage} from '../../server/index.js';
  export default {
    name: 'index',
    data() {
      return {
        iphone:'',
        code:'',
        time:'获取验证码',
        err:'验证码错误，请重新输入',
        login:false,// 是否可以登陆
        isCode:true,// 是否可以获取验证吗
      }
    },
    methods:{
      getCode(){
        console.log(this.iphone)
        if(!this.isCode){
          return;
        }
        const that = this;
        this.isCode=false;
        let _t = 60;
        this.time = _t+"s重新获取";
        sendLoginMessage({
          mobile:this.iphone
        }).then(res=>{})

        const st = setInterval(()=>{
          _t--;
          if(_t == 0){
            that.isCode=true;
            that.time ="获取验证码";
            clearInterval(st);
          }else{
            that.time = _t+"s重新获取";
          }
        },1000)

      },
      blur(){

        if(this.iphone!=''&&this.code!=''){
          this.login = true
        }

      },
      loginHandle(){
        if(!this.login){
          return;
        }
        login({
          mobile:this.iphone,
          veriCode:this.code
        }).then(res=>{
          if(res.code==0){
            this.$router.push('./')
            window.localStorage.setItem('sessionCodeh5',res.data.sessionCode)
            window.localStorage.setItem('mobile',res.data.mobile)
          }else{
            this.$info(res.msg)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #fff;
  }

  .login {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem 0.3rem;
  }

  .login p {
    position: relative;
    display: flex;
    align-items: center;
    height: 1.08rem;
    margin-top: 0.4rem;
    background: #FFFFFF;
    border-bottom: 1px solid #E7E7E7;
  }

  .login p span {
    position: absolute;
    right: 0;
    top: 0;
    width: 1.7rem;
    text-align: center;
    height: 1.08rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0A6DF6;
    line-height: 1.08rem;
  }
  .login p span.curr{
    color: #999;
  }

  .login i {
    display: block;
    padding-top: 0.2rem;
    height: 0.24rem;
    font-size: 0.24rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #EF3E2F;
    line-height: 0.24rem;
  }

  .login p img {
    display: block;
    width: 0.5rem;
  }

  .login input {
    position: relative;
    width: calc(100% - 2.2rem);
    box-sizing: border-box;
    padding: 0 0.2rem;
    height: 100%;
    appearance: none;
    border: none;
    outline: none;
  }

  .login b {
    display: block;
    text-align: center;
    width: 5.5rem;
    height: 0.9rem;
    background: #EF3E2F;
    box-shadow: 0rem 0.1rem 0.1rem 0rem rgba(239, 62, 47, 0.1);
    border-radius: 0.45rem;
    opacity: 0.3;
    margin: 0.8rem auto 0.4rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.9rem;
  }

  .login b.curr {
    opacity: 1;
  }

  .login strong {
    position: relative;
    width: 100%;
    text-align: center;
    display: block;
    font-size: 0.22rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6E6E6E;
    line-height: 0.22rem;
  }

  .login em {
    color: #0A6DF6;
    font-style: normal;
  }

  .head {
    position: relative;
    width: 100%;
    height: 2.93rem;
    box-sizing: border-box;
    padding-top: 0.5rem;
    text-align: center;
    background: url(../../assets/indexbg.png) no-repeat 0 0;
    background-size: 100%;
  }

  .head img {
    width: 0.96rem;
    height: 0.96rem;
    margin: 0 auto;
  }

  .head h3 {
    margin-bottom: 0.2rem;
    font-size: 0.4rem;
    font-family: AlibabaPuHuiTiM;
    color: #FFFFFF;
    line-height: 0.55rem;
  }

  .head p {

    font-size: 0.24rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.33rem;
  }
</style>
