<template>
  <div class="admin">
    <el-row>
      <el-col :span="3">
        <div class="left">
          <div class="top"><img src="../../assets/logo.png"/>必过分期</div>
          <div class="down" v-show="roleStatus==1">
            <p :class="navId==0?'curr':''" @click="nav(0)"><van-icon name="balance-list-o" color="#fff"/>订单管理</p>
            <p :class="navId==1?'curr':''" @click="nav(1)"><van-icon name="shop-o" color="#fff"/>商户管理</p>
            <p :class="navId==2?'curr':''" @click="nav(2)"><van-icon name="newspaper-o" color="#fff"/>课程管理</p>
          </div>
          <div class="down" v-show="roleStatus==2">
            <p :class="navId==0?'curr':''" @click="nav(0)"><van-icon name="balance-list-o" color="#fff"/>订单管理</p>
            <p :class="navId==2?'curr':''" @click="nav(2)"><van-icon name="newspaper-o" color="#fff"/>课程管理</p>
          </div>
          <div class="down" v-show="roleStatus==3">
            <p :class="navId==0?'curr':''" @click="nav(0)"><van-icon name="balance-list-o" color="#fff"/>订单管理</p>
            <p :class="navId==1?'curr':''" @click="nav(1)"><van-icon name="shop-o" color="#fff"/>商户管理</p>
          </div>
        </div>
        </el-col>
      <el-col :span="21">
        <div class="right">
          <div class="top">
            <van-icon name="share-o"/><em @click="loginOut">退出登录</em>
          </div>
          <div class="down">
            <div class="down-body">
              <div v-show="navId==0">
                <vorder @detail="detailHandle" v-show="data==''" :key="data.id"/>
                <vdetail @detail="detailHandle" v-show="data!==''" :data="data"/>
              </div>
              <div v-show="navId==1">
                <vshop/>
              </div>
              <div v-show="navId==2">
                <vclassList/>
              </div>


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
  import shop from '../shop/index.vue';
  import classList from '../classList/index.vue';
  import {getDevBusinessList,logout} from '../../server/admin.js';

  export default {
    name: 'index',
    components:{
      'vorder':order,
      'vdetail':detail,
      'vshop':shop,
      'vclassList':classList,
    },
    data() {
      return {
        data:'',
        navId:0,
        page:0,
        rows:10,
        roleStatus:window.localStorage.getItem('roleStatus')
      }
    },
    created(){

    },
    methods:{
      nav(n){
        this.navId = n
      },
      detailHandle(data){
        console.log(data)
        this.data = data;
      },
      loginOut(){
        logout({}).then(res=>{
          if(res.code==0){
            this.$router.push('./')
            window.localStorage.setItem('sessionCode','')
          }
        })
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
  margin-bottom: 10px;
  cursor: pointer;
}
.left .down p i{
  font-size: 18px;
  margin-right: 10px;
}
.left .down p.curr{
  opacity: 1;
  background-color: #FB7861;
}
.left .down p:hover{
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
.right .top em{
  cursor: pointer;
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
