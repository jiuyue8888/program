<template>
  <div class="index">
    <div class="head">
      <img src="../../assets/logo1.png" />
      <h3>斗金分期</h3>
      <p>斗金分期，轻松助你逢考必过</p>
    </div>
    <div class="list">
      <div class="listBtn" @click="btn">
        <div class="left">
          <h3>我要分期<img src="../../assets/indexh3.png" /></h3>
          <p>免息分期，秒速审批，安全可靠的金融助学神器</p>
        </div>
        <div class="right"><img src="../../assets/indexicon0.png" /></div>
      </div>

      <div class="listBtn" @click="login?$router.push('./myOrder'):$router.push('./login')">
        <div class="left">
          <h3>我的订单<img src="../../assets/indexh3.png" /></h3>
          <p>可查询申请结果，请按时还款，保持良好信用，逾期未还，拉低信用</p>
        </div>
        <div class="right"><img src="../../assets/indexicon1.png" /></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDevBusiness} from '../../server/index.js'
  export default {
    name: 'index',
    data() {
      return {
        login:window.localStorage.getItem('sessionCodeh5')&&window.localStorage.getItem('sessionCodeh5')!=''
      }
    },
    created(){

      const that = this;
      if(that.$route.query.userKey){
        getDevBusiness({
          userKey:that.$route.query.userKey
        }).then(res=>{
          window.localStorage.setItem('userKey',that.$route.query.userKey)
          window.localStorage.setItem('name',res.data.name)
        
        })
      }else{
        getDevBusiness({
          mobile:window.localStorage.getItem('mobile')
        }).then(res=>{
          window.localStorage.setItem('userKey',res.data.userKey)
          window.localStorage.setItem('name',res.data.name)
        
        })
      }

      
    },
    methods:{
      btn(){
        const that = this;
        
        if(this.login){
          this.$router.push({
            path:'./stages',
            query:{
              userKey:that.$route.query.userKey,
              bussinessName: window.localStorage.getItem('name')
            }
          })
        }else{
          this.$router.push({
            path:'./login',
            query:{
              userKey:that.$route.query.userKey,
              bussinessName:window.localStorage.getItem('name')
            }
          })
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #F8F8F8;
  }
  .list{
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0.8rem 0.3rem;
  }
  .listBtn{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
    min-height: 2.26rem;
    box-sizing: border-box;
    padding: 0.4rem;
    background: #FFFFFF;
    border-radius: 0.1rem;
  }
  .listBtn .left{
    width: calc(100% - 1.5rem);
  }
  .listBtn .right{
    width: 1.2rem;
  }
  .listBtn h3{
    display: flex;
    align-items: center;
    height: 0.5rem;
    margin-bottom: 0.2rem;
    font-size: 0.36rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 0.5rem;
  }
  .listBtn h3 img{
    width: 0.25rem;
    margin-left: 0.1rem;
  }
  .listBtn p{
    font-size: 0.26rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 0.38rem;
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
