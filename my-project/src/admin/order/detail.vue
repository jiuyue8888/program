<template>
  <div class="detail">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="left">
          <h3>分期信息</h3>
          <p>分期人姓名：{{data.name}}</p>
          <p>开始时间：{{data.createdTime}}</p>
          <h3>个人资料</h3>
          <p>姓名：{{data.name}}</p>
          <p>单位名称：{{data.companyName}}</p>
          <h3>亲属关系</h3>
          <p>亲属关系：{{data.relation}}</p>
          <h3>银行信息</h3>
          <p>银行名称：{{data.bankName}}&nbsp;&nbsp;银行预留手机号：{{data.bankMobile}}</p>

          <h3>身份证信息</h3>
          <p>身份证正面：</p>
          <section><img :src="data.idCardFrontImg"><i class="el-icon-search" @click="bigImg(0)"></i></section>
          <h3>审核状态</h3>
          <p class="status1">审核中</p>
          <el-button type="primary" @click="pass(3)">审核通过</el-button>
          <el-button type="success" @click="pass(2)">拒绝通过</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right">
          <h3></h3>
          <p>电话号码：{{data.mobile}}</p>
          <p>结束时间：{{data.endTime}}</p>
          <h3></h3>
          <p>现居地址：{{data.area}}</p>
          <p>单位地址：{{data.companyAdress}}</p>
          <h3></h3>
          <p>亲属姓名：{{data.relativesName}}</p>
          <h3></h3>
          <p>银行卡号：{{data.bankNumber}}</p>
          <p></p>
          <h3></h3>
          <p>身份证背面：</p>
          <section><img :src="data.idCardBackImg"><i class="el-icon-search" @click="bigImg(1)"></i></section>

        </div>
      </el-col>

    </el-row>
    <div class="bigImg" v-show="bigImgShow" @click="bigImgShow=false"><img :src="big"/></div>
  </div>
</template>

<script>
  import {verify} from '../../server/admin.js';
  export default {
    name: 'vorder',
    props: ['data'],
    data() {
      return {
          bigImgShow:false,
          big:this.data.idCardFrontImg
      };
    },
    methods: {
      bigImg(n){
        this.bigImgShow=true;

        this.big = n==0?this.data.idCardFrontImg:this.data.idCardBackImg
      },
      pass(status){
        if(status==2){
          this.$confirm('确定拒绝通过？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              verify({
                id:this.data.id,
                verifyStatus:status
              }).then(res=>{
                if(res.code==0){
                  this.$emit('detail', '');
                }else{
                  this.$info(res.msg)
                }
              })
            })
            .catch(() => {

            });
        }else{
          this.$confirm('确定审核通过？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              verify({
                id:this.data.id,
                verifyStatus:status
              }).then(res=>{
                if(res.code==0){
                  this.$emit('detail', '');
                }else{
                  this.$info(res.msg)
                }
              })
            })
            .catch(() => {

            });
        }

      },
      unpass(){

      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .detail{
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
  }
  .bigImg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.6);
  }
  .bigImg img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
  }
  .detail h3{
    height: 40px;
    font-size: 16px;
    line-height: 40px;
  }
  .detail p{
    font-size: 14px;
    line-height: 30px;
    color: #333;
  }
  .detail span{
    color: #666;
  }
  .detail section{
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 10px 0;
  }
  .detail section i{
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    background-color: #fff;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #999;
  }
  .detail p.status1{
    color: #EF3E2F;
    margin-bottom: 20px;
  }
</style>
