<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'App',
  data(){
    return {

    }
  },
  created(){

  }
}
</script>

<style>
  @import url("./animate.css");
  *{
    padding: 0;
    margin: 0;
  }
  img{
    max-width: 100%;
  }
  i,em{
    font-style: normal;
  }
  .info{
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    max-width: 5rem;
    text-align: center;
    min-width: 1rem;
    padding: 0.2rem;
    white-space: nowrap;
    border-radius: 0.1rem;
    background: rgba(0,0,0,0.7);
    color: #fff;
    font-size: 0.25rem;
    transform: translate3d(-50%,-50%,0);
  }
  .index .van-picker .van-picker__toolbar{
      border-bottom: 1px solid #e7e7e7;
    }
    .index .van-picker__confirm{
      color: #EF3E2F;
    }
    .index .van-step--horizontal .van-step__title{
        padding-top: 10px;
      }
      .index .van-step--horizontal .van-step__line,
    .index .van-step--horizontal .van-step__circle-container{
      top:0
    }
    .index .van-steps--horizontal .van-steps__items{
      margin: 0;
      padding: 0;
    }

    .index .van-step--horizontal .van-step__title{

      font-size: 0.26rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 0.26rem;
    }
    .index .van-step--horizontal .van-step__title--active{
      color: #333333!important;
    }
    .index .van-field__control{
      font-size: 0.24rem;
    }
    .index .van-field__label{
      width: 2rem;
      margin-right: 0;
    }
    .index .van-uploader__upload{
      width: 0.9rem;
      height: 0.9rem;
      background-color: #EF3E2F;
      border-radius: 50%;
      opacity: 0.3;
      color: #fff;
    }
    .index .van-uploader__upload-icon{
      color: #fff;
    }
    .admin .van-field__control{
      font-size: 14px;
    }
    .admin .van-cell{
      font-size: 16px;
    }
    .admin .el-table::before{
      display: none;
    }
    .admin .shop .el-input{
      margin-bottom: 10px;
    }
    .classList .el-dialog,
    .admin .shop .el-dialog{
      width: 400px;
    }
    .index .el-input__inner{
  border:none;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  font-size: 0.28rem;
}
</style>
