<template>
  <div class="admin">
    <div class="login">
      <h3>斗金分期管理系统</h3>
      <van-field v-model="tel" type="tel" label="手机号" label-width="4em" />
      <van-field v-model="password" type="password" label="密码" label-width="4em" />

      <van-field v-model="code" center clearable label="验证码" placeholder="请输入验证码" label-width="4em">
        <template #button>
          <div class="code" @click="refreshCode"></div>
          <s-identify :identifyCode="identifyCode"></s-identify>
        </template>
      </van-field>

      <van-button type="info" style="width: 70%;margin: 50px auto;display: block;" @click="loginClick">立即登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, logout } from '../../server/admin.js';
import SIdentify from "./identify.vue";
import md5 from 'js-md5';
export default {
  name: 'index',
  components:{SIdentify},
  data() {
    return {
      tel: '',
      password: '',
      code: '',
      identifyCodes: '1234567890',
      identifyCode: ''
    };
  },
  created() {
    /*
      15986936081/123456
      logout({}).then(res=>{
        window.localStorage.removeItem('sessionCode')
      })*/
  },
  mounted() {
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
      //console.log(this.identifyCode);
    },
    loginClick() {
      if(this.code!=this.identifyCode){
        this.$info('验证码有误，请重新输入')
        return;
      }
      login({
        mobile: this.tel,
        password: md5(this.password)
      }).then(res => {
        if (res.data.sessionCode) {
          window.localStorage.setItem('adminMobile', this.tel);
          window.localStorage.setItem('sessionCode', '');
          window.localStorage.setItem('sessionCode', res.data.sessionCode);
          window.localStorage.setItem('roleStatus', res.data.roleStatus);

          this.$router.push('/admin/index');
        } else {
          this.$info(res.msg);
        }
      });
    },
    getCode() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin {
  position: relative;
  width: 100%;
  min-height: 100vh;

  background-color: #f8f8f8;
}
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 500px;
  height: 400px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px #ccc;
  box-sizing: border-box;
  padding: 30px;
}
.code{
  position: absolute;
      top: 0;
      right: 0;
      width: 120px;
      height: 100%;
      z-index: 44444;
}
.login h3 {
  text-align: center;
  font-size: 30px;
  color: #337ab7;
  margin-bottom: 20px;
}
</style>
