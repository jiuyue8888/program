<template>
  <div class="index">
    <div class="noData" v-if="data.length==0">
      <img src="../../assets/pic_empty@3x.png" />
      <p>您没进行任何分期</p>
    </div>
    <div class="orderList" v-else>
      <div class="part1" v-if="data.length==0">
        <span>当前没有任何欠款~</span>
      </div>
      <div class="part1" v-else>
        <b>当前应还款</b>
        <p>￥<em>{{repayment}}</em>元</p>
        <p>依订单过审时间确定每月10号或25号进行扣款</p>
      </div>
      <div class="part2">
        <div class="lists" v-for="(item,id) in data" :key="id">
          <div class="top">
            <h3><i>{{item.courseName}}</i><em>¥{{item.amount}}</em></h3>
            <p>共{{item.stages}}期，待还<span>{{item.residueStages}}</span>期</p>
            <p v-if="item.stagesStatus==2">订单未生效</p>
            <p v-else>{{item.stagesStatus==0?'本期应还':(item.stagesStatus==1?'下期应还':'')}}<span>{{item.amountDue}}</span>元，请预存到{{item.bankName}}银行卡</p>
            <strong v-show="item.overTimeStatus==1">已逾期，请及时还款</strong>
            <strong v-show="item.overTimeStatus==0&&item.auditing!=3" @click='deleteOrderHandle(item.orderId)'><i class="el-icon-delete"></i></strong>
          </div>
          <div class="down">
            <div class="left">
              <p><span>订单号</span>{{item.orderId}}</p>
              <p><span>订单时间</span>{{item.createDate}}</p>
            </div>
            <div class="right">
              <img v-show="item.auditing==3" src="../../assets/passed.png" />
              <img v-show="item.auditing==1" src="../../assets/passing.png" />
              <img v-show="item.auditing==2" src="../../assets/unpass.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserOrderList,deleteOrder} from '../../server/index.js';
  export default {
    name: 'index',
    data() {
      return {
        no:true,
        data: [],
        repayment:''
      }
    },
    created(){
      getUserOrderList({}).then(res=>{
        this.data = res.data.userOrderVos;
        this.repayment = res.data.repayment;
      })
    },
    methods:{
      deleteOrderHandle(id){
        deleteOrder({orderId:id}).then(res=>{
          if(res.code==0){
            this.$info('删除成功')
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
    background: #F8F8F8;
  }
.part1{
  width: 6.9rem;
  height: 2.44rem;
  margin: 0.2rem auto;
  text-align: center;
  color: #FFFFFF;
  box-sizing: border-box;
  padding-top: 0.4rem;
  background: linear-gradient(127deg, #FB745E 0%, #EF3E2F 100%);
  border-radius: 0.1rem;
}
.part1 span{
  line-height: 1.6rem;
}
.part1 p{
  margin-top: 0.3rem;
  font-size: 0.26rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 0.26rem;
}
.part1 b{

  font-size: 0.28rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 0.28rem;
}
.part1 em{
font-size: 0.6rem;
}
  .noData {
    padding-top: 4rem;
    width: 2.46rem;
    margin: 0 auto;
    text-align: center;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 0.4rem;
  }

  .orderList {
    position: relative;
    width: 100%;
  }
  .orderList .lists{
    position: relative;
    width: 100%;
    margin-bottom: 0.2rem;
    box-sizing: border-box;
    padding: 0.3rem 0.3rem 0;
overflow: hidden;
    background: #FFFFFF;
  }
  .orderList .lists .top{
    position: relative;
    width: 100%;
    padding-bottom: 0.3rem;

    border-bottom: 1px solid #E7E7E7;
  }
  .orderList .lists .top h3{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
     margin-bottom: 0.2rem;
    font-size: 0.36rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 0.36rem;
  }
  .orderList .lists .top p{
    width: 4.5rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.48rem;
  }
  .orderList .lists .top span{
    color: #EF3E2F;
  }
  .orderList .lists .top em{}
  .orderList .lists .top strong{
    position: absolute;
    right: 0;
    bottom: 0.4rem;

    font-size: 0.24rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #EF3E2F;
    line-height: 0.24rem;
  }
  .orderList .lists .top i{}
  .orderList .lists .down{
    position: relative;
    width: 100%;
    height: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .orderList .lists .down p{

    font-size: 0.24rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 0.44rem;
  }
  .orderList .lists .down span{
    display: inline-block;
    width: 1.3rem;
    margin-right: 0.2rem;
  }
  .orderList .lists .down .left{
    width: calc(100% - 2rem);
  }
  .orderList .lists .down .right{
    width: 1.6rem;
    height: 1.3rem;
  }
</style>
