<template>
  <div class="admin">
    <el-row>
      <el-col :span="3">
        <div class="left">
          <div class="top"><img src="../../assets/logo.png"/>必过分期</div>
          <div class="down">
            <p class="curr"><van-icon name="balance-list-o" color="#fff"/>订单管理</p>
            <p><van-icon name="shop-o" color="#fff"/>商户管理</p>
            <p><van-icon name="newspaper-o" color="#fff"/>课程管理</p>
          </div>
        </div>
        </el-col>
      <el-col :span="21">
        <div class="right">
          <div class="top">
            <van-icon name="share-o" /><em>退出登录</em>
          </div>
          <div class="down">
            <div class="down-body">

              <vorder @detail="detailHandle" v-show="data==''"/>
              <vdetail v-show="data!==''"/>
            </div>
          </div>
        </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
  import order from '../order/index.vue';
  import detail from '../order/detail.vue';

  export default {
    name: 'index',
    components:{
      'vorder':order,
      'vdetail':detail,
    },
    data() {
      return {
        data:''
      }
    },
    methods:{
      getCode(){

      },
      detailHandle(data){
        console.log(data)
        this.data = data;
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
     font-size: 16px;
    background-color: #e7eaec;
  }
  .left{
    position: relative;
    width: 100%;
    height: 100vh;
    color: #fff;
    box-sizing: border-box;
    background-color: #324c6d;
  }
  .left .top{
    position: relative;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    display: flex;
    background-color: #0E2F51;
    color: #fff;

    justify-content: center;
    align-items: center;

  }
  .left .top img{
    width: 30px;
    margin-right: 10px;
  }

.left .down{
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0 0;
  font-size: 14px;
}
.left .down p{
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  opacity: 0.8;
}
.left .down p i{
  font-size: 18px;
  margin-right: 10px;
}
.left .down p.curr{
  opacity: 1;
  background-color: #FB7861;
}
.right{
  position: relative;
  width: 100%;
}
.right .top{
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;
  font-size: 14px;
  color: #999;
  padding: 0 20px;
  background-color: #fff;
}
.right .top i{
  font-size: 16px;
}
.right .down{
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  height: calc(100vh - 60px);
  overflow: auto;

}
.down-body{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  border-radius: 2px;

}
</style>
