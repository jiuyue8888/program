<template>
  <div class="index">
    <h5>教育机构</h5>
    <h3>{{name}}</h3>
    <div class="form">
      <p>
        <span>分期金额</span>
<el-input type="age" maxlength="12" v-model.number="amount" placeholder="填写金额" @change="check"></el-input>

      </p>


      <p><span>分期数</span>
        <span class="tagList">
          <el-tag v-for="(item,id) in arr" :key="id" :class="item==tag?'curr':''" @click="checkTag(item,id)">{{item}}期</el-tag>
        </span>
      </p>
      <p><span>每期应还</span>
      <em>{{Math.ceil(amount/arr[tagId]*100)/100}}</em>

      </p>
      <p><span>选择分期课程</span>
        <section @click="show=true;">{{select}}<img src="../../assets/home_ico_arrow@3x(7).png" /></section>
      </p>
    </div>
    <b :class="btn?'curr':''" @click="submit">立即申请</b>
    <strong><input type="checkbox" :checked="inputChecked" @change="inputChange"/>我已阅读并同意<em @click="$router.push('./ht')">《保理付款服务合同》</em></strong>
    <div class="pickFloat" v-show="show">
      <van-picker show-toolbar :columns="columns" @change="onChange" @cancel="cancel" @confirm="confirm"
      :class="pickerAn?'animated fadeInUp':'animated fadeOutDown'" />
    </div>

  </div>
</template>

<script>
  import {getDevCourseList} from '../../server/index.js';

  export default {
    name: 'index',
    data() {
      return {
        disabled:false,
        name:this.$route.query.userKey?this.$route.query.bussinessName:window.localStorage.getItem('name'),
        show: false,
        login:window.localStorage.getItem('sessionCodeh5')&&window.localStorage.getItem('sessionCodeh5')!='',
        inputChecked: false,
        pickerAn: true,
        columns: [],
        amount:'',
        num:'',
        courseId:'',
        select: '点击选择',
        tag: 3,
        tagId: 0,
        btn:false,
        p1:[],
        p2:[],
        arr: [3,6,9,12],
         data:[],
      }
    },
    created(){

      if(this.$route.query.userKey){
        window.localStorage.setItem('userKey',this.$route.query.userKey)
      }
      if(!this.login){
        this.$router.push({
          path:'./login',
          query:{
            userKey:that.$route.query.userKey,
            bussinessName:that.$route.query.bussinessName
          }
        })
        return;
      }
      getDevCourseList({
        userKey:this.$route.query.userKey?this.$route.query.userKey:window.localStorage.getItem('userKey')
      }).then(res=>{

        let p1=[];
        let p2=[];
        let p3=[];
        res.data.map(item=>{
          p1.push(item.examFashion)
          p2.push(item.courseList.map(item=>item.courseName))
          p3.push(item.courseList.map(item=>item.courseId))

        })
        this.columns = [{
          values:p1,
          className: 'column1',
        },{
          values: p2[0],
          className: 'column2',
          defaultIndex: 2,
        }]
        this.p1 = p1
        this.p2 = p2
        this.data = p3
      })
    },
    methods: {

      inputChange(e){
        this.inputChecked = e.target.checked;

      },
      onChange(picker, value, index) {
        const id = this.p1.indexOf(value[0]);
        picker.setColumnValues(1, this.p2[id]);

      },
      checkTag(item,id) {
        this.tag = item;
        this.tagId = id;

      },
      confirm(value,id) {

        this.courseId = this.data[id[0]][id[1]];
        this.select = value[0]+'-'+value[1]
        this.cancel();
        this.check();
      },
      cancel() {
        this.pickerAn = false;
        setTimeout(()=>{
          this.show=false;
          this.pickerAn=true
        },500)
      },
      check(){
        if(this.amount==''){
          this.btn = false;
          //this.$info('请填写分期金额')
          return;
        }
        if(this.select=='点击选择'){
          this.btn = false;
          //this.$info('请选择分期课程')
          return;
        }
        this.btn = true;
      },
      submit(){
        //this.$info('缺少教育机构，请联系对方分期',2)
        if(this.amount==''){
          this.$info('请填写分期金额')
          return;
        }
        if(this.select=='点击选择'){
          this.$info('请选择分期课程')
          return;
        }
        if(!this.inputChecked){
          this.$info('请同意保理付款服务合同')
          return;
        }

        this.$router.push({
          path:'./steps',
          query:{
            stages:this.tag,
            amount:this.amount,
            courseName:this.select,
            courseId:this.courseId,
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
    box-sizing: border-box;

  }

  .index h5 {
    width: 100%;
    height: 0.3rem;
    text-align: center;
    padding-top: 0.3rem;
    margin-bottom: 0.2rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 0.3rem;
  }

  .index h3 {
    width: 100%;
    text-align: center;
    height: 0.3rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 0.3rem;
    margin-bottom: 0.4rem;
  }

  .index b {
    width: 5.5rem;
    height: 0.9rem;
    background: #EF3E2F;
    box-shadow: 0rem 0.1rem 0.1rem 0rem rgba(239, 62, 47, 0.1);
    border-radius: 0.45rem;
    opacity: 0.3;
    margin: 0.3rem auto;
    text-align: center;
    display: block;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.9rem;
  }

  .index b.curr {
    opacity: 1;
  }

  .index strong {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    font-size: 0.22rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6E6E6E;
    line-height: 0.22rem;
  }

  .index strong em {
    color: #0A6DF6;
  }

  .index strong input {

    width: 0.22rem;
    height: 0.22rem;

    margin-right: 0.1rem;
  }

  .index .form section {
    width: calc(100% - 1.8rem);
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-size: 0.26rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }


  .index .form section img {
    width: 0.2rem;
    margin-left: 0.1rem;
  }

  .index .form {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.4rem;
  }

  .pickFloat {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
  }

  .pickFloat .van-picker {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }


  .index .form p {
    position: relative;
    width: 100%;
    height: 1rem;
    margin-bottom: 0.14rem;
    border-bottom: 1px solid #E7E7E7;
    line-height: 1rem;
    display: flex;
    align-items: center;
  }

  .index .form p:nth-child(2) {
    border-bottom: none;
  }

  .index .form p input {
    width: calc(100% - 1.8rem);
    border: none;
    height: 100%;
  }

  .index .form p>span {
    width: 1.8rem;

    font-size: 0.28rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;

  }

  .index .form p span.tagList {
    width: calc(100% - 2rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .index .form p span.tagList span {
    width: 1.05rem;

    font-size: 0.26rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333;
    text-align: center;
    height: 0.65rem;
    line-height: 0.63rem;
    border-radius: 0.04rem;
    background-color: transparent;
    border: 0.01rem solid #CCCCCC;
  }

  .index .form p span.tagList span.curr {
    color: #EF3E2F;
    border: 0.01rem solid #EF3E2F;
  }
</style>
