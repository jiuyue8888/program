<template>
  <div class="index">
    <div class="noData" v-if="data.length==0">
      <img src="../../assets/pic_empty@3x.png" />
      <p>您没进行任何分期</p>
    </div>
    <div class="orderList" v-else>
      <div class="part1" v-if="no">
        <span>当前没有任何欠款~</span>
      </div>
      <div class="part1" v-else>
        <b>当前应还款</b>
        <p>￥<em>9888</em>元</p>
        <p>每月10号进行扣款</p>
      </div>
      <div class="part2">
        <div class="lists" v-for="(item,id) in data" :key="id">
          <div class="top">
            <h3><i>国开-XXXX班级</i><em>¥6000</em></h3>
            <p>共6期，待还<span>3</span>期</p>
            <p>下期应还<span>300</span>元，请预存到中国工商银行卡</p>
            <strong v-show="item.state==0">已逾期，请及时还款</strong>
            <strong v-show="item.state==2"><i class="el-icon-delete"></i></strong>
          </div>
          <div class="down">
            <div class="left">
              <p><span>订单号</span>DJ202011125648</p>
              <p><span>订单时间</span>2020-12-18 23:00:12</p>
            </div>
            <div class="right">
              <img v-show="item.state==0" src="../../assets/passed.png" />
              <img v-show="item.state==1" src="../../assets/passing.png" />
              <img v-show="item.state==2" src="../../assets/unpass.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        no:true,
        data: [{
          state: 0,
        }, {
          state: 1,
        }, {
          state: 2,
        }],
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
