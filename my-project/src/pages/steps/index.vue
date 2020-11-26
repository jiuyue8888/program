<template>
  <div class="index">
    <div class="back" @click="$router.push('./')"><img src="../../assets/ico_home@3x.png" />首页</div>
    <div class="steps">
      <van-steps v-show="active!=3" :active="active" active-color="#EF3E2F" inactive-color="#DDDDDD" class="tab">
        <van-step>实名认证</van-step>
        <van-step>完善资料</van-step>
        <van-step>绑定银行卡</van-step>
        <van-step>完成</van-step>
      </van-steps>
      <div class="p1" v-show="active==0">
        <h3>*请拍摄您的二代身份证照片进行认证</h3>
        <div class="photo photo1">
          <img v-show="formData.idCardFrontImg!=''" :src="formData.idCardFrontImg" />
          <van-uploader :after-read="afterRead1" />
          <p>上传身份证正面</p>
        </div>
        <div class="photo photo2">
          <img v-show="formData.idCardBackImg!=''" :src="formData.idCardBackImg" />
          <van-uploader :after-read="afterRead2" />
          <p>上传身份证背面</p>
        </div>
        <div class="photo photo3">
          <img v-show="formData.receiptImg!=''" :src="formData.receiptImg" />
          <van-uploader :after-read="afterRead3" />
          <p>上传首付收据</p>
        </div>
      </div>
      <div class="p2" v-show="active==1">
        <van-field v-model="formData.name" label="姓名" placeholder="请填写姓名" @blur="check" />
        <van-field v-model="formData.idCardNumber" label="身份证号" placeholder="请填写身份证号" @blur="check" />
        <van-cell title="现居住地" @click="showArea=true">
          <template #right-icon>
            <span class="add">{{formData.address}}<img src="../../assets/home_ico_arrow@3x(7).png" /></span>
          </template>
        </van-cell>
        <van-cell style="padding:10px 0;">
          <template #right-icon>
            <van-field v-model="formData.detail" rows="1" placeholder="详细地址请具体到门牌号，能收快递那种（最多100字）" maxLength="100"
              @blur="check" />
          </template>
        </van-cell>
        <div class="border"></div>


        <van-field v-model="formData.companyName" label="公司名称" placeholder="请如实填写（最多30字）" maxLength="30" @blur="check" />
        <van-field v-model="formData.companyNumber" label="公司电话" placeholder="如果不记得，请写自己的电话" @blur="check" />
        <van-cell title="公司地址" @click="showGs=true">
          <template #right-icon>
            <span class="add">{{formData.gsAdd}}<img src="../../assets/home_ico_arrow@3x(7).png" /></span>
          </template>
        </van-cell>
        <van-cell style="padding:10px 0;">
          <template #right-icon>
            <van-field v-model="formData.gsDetail" rows="1" placeholder="详细地址请具体到门牌号，能收快递那种（最多100字）" maxLength="100"
              @blur="check" />
          </template>
        </van-cell>
        <div class="border"></div>

        <van-field v-model="formData.relativesName" label="亲属姓名" placeholder="只能直系亲属（父母或配偶）" @blur="check" />
        <van-field v-model="formData.relativesMobile" label="手机号码" placeholder="只能输入手机号11位" @blur="check" />
        <van-cell title="关系" @click="showGx=true">
          <template #right-icon>
            <span class="add">{{formData.relation}}<img src="../../assets/home_ico_arrow@3x(7).png" /></span>
          </template>
        </van-cell>
        <van-cell></van-cell>
      </div>

      <div class="p3" v-show="active==2">
        <h3>选择支持的银行</h3>
        <div class="yh">
          <el-tag v-for="(item,id) in 10" :key="id" :class="id==formData.bankName?'curr':''" @click="getYH(id)">中国银行</el-tag>
        </div>
        <div class="border"></div>
        <van-field v-model="formData.cardOwnerName" label="持卡人" placeholder="请填写持卡人" @blur="check" />
        <van-field v-model="formData.bankNumber" label="银行卡号" placeholder="请输入银行卡号" @blur="check" />
        <van-field v-model="formData.bankMobile" label="预留手机" placeholder="请输入开卡时给银行登记的手机号" @blur="check" />
        <van-field v-model="formData.veriCode" center clearable label=" " placeholder="请输入短信验证码">
          <template #button>
            <span @click="sendCode" :style="time=='发送验证码'?'color:#0A6DF6':''">{{time}}</span>
          </template>
        </van-field>
        <strong>
          <input type="checkbox" @change="agreeHandle" checked="checked"/>我已阅读并同意<em>《保理付款服务合同》</em>
        </strong>
        <p>*提示：如果忘记手机号码可以联系银行申请重置</p>
        <div :class="btn?'btn curr':'btn'" @click="submit" v-show="active==2">完成申请</div>
      </div>
      <div class="p4" v-show="active==3">
        <div class="p4Body">
          <div class="p4Top">
            <img src="../../assets/ico_success@3x.png" />
            <h3>辛苦啦，申请完成等待审核</h3>
            <p>我们会在1-3个工作日内完成审核，甚至是秒过！<br />若申请被拒绝建议重新扫描申请哦~</p>
          </div>
          <div class="border"></div>
          <van-cell title="教育机构" :value="formData.courseName" />
          <van-cell title="分期金额" :value="formData.amount" />
          <van-cell title="分期期数" :value="formData.stages" />
          <van-cell title="每期应还" :value="formData.amount/formData.stages" />
        </div>

        <div class="btn curr" @click="$router.push('./myOrder')" v-show="active==3">查看我的订单</div>
      </div>
    </div>

    <div :class="btn?'btn curr':'btn'" @click="submit" v-show="active<2">下一步</div>


    <van-action-sheet v-model="showArea">
      <van-area :area-list="areaList" @cancel="areaCancel" @confirm="areaConfirm" />
    </van-action-sheet>

    <van-action-sheet v-model="showGs">
      <van-area :area-list="areaList" @cancel="gsCancel" @confirm="gsConfirm" />
    </van-action-sheet>

    <van-action-sheet v-model="showGx">
      <van-picker :columns="columns" @confirm="onConfirm" @cancel="onCancel" show-toolbar />
    </van-action-sheet>
  </div>
</template>

<script>
  import area from "./area.js";
  import {
    upload,
    createOrder
  } from "../../server/index.js";
  export default {
    name: 'index',
    data() {
      return {
        formData: {
          stages: this.$route.query.stages,
          amount: this.$route.query.amount,
          courseName: this.$route.query.courseName,
          courseId: this.$route.query.courseId,
          userKey: window.localStorage.getItem('userKey'),

          relation: '请选择', //亲子关机
          relativesName: '', //亲属姓名
          relativesMobile: '', //亲属电话

          companyName: '', //公司名称
          companyNumber: '', //公司电话
          gsAdd: '请选择省市区', //公司地址
          gsDetail: '', //公司详细地址
          //companyAdress:this.formData.gsAdd+','+this.formData.gsDetail,

          name: '', //姓名
          idCardNumber: '', //身份证号
          detail: '', //详细地址
          mobile: window.localStorage.getItem('mobile'),
          address: '请选择省市区', //居住地址
          //area:this.formData.address+','+this.formData.detail,

          cardOwnerName: '', //持卡人姓名
          bankNumber: '', //卡号
          bankMobile: '', //预留电话
          veriCode: '', //短信验证码
          bankName: -1, //银行
          agree: true, //是否同意

          idCardFrontImg: '',
          idCardBackImg: '',
          receiptImg: '',

        },
        time: '发送验证码',
        columns: ['父亲', '母亲', '配偶'],
        areaList: area,
        active: 2, //当前进度
        showArea: false, //地址联动显示隐藏
        showGs: false, //地址联动显示隐藏
        showGx: false, //亲属关系显示隐藏
        btn: false, //按钮样式

      }
    },
    created() {
      //console.log(this.$route.query.stages)
    },
    methods: {
      //第1步
      afterRead1(file) {

        Object.assign(this.formData, {
          idCardFrontImg: file.content
        })
        this.check()
        this.uploadHandle(file.file, 'idCardFrontImg')
      },
      afterRead2(file) {

        Object.assign(this.formData, {
          idCardBackImg: file.content
        })
        this.check()
        this.uploadHandle(file.file, 'idCardBackImg')
      },
      afterRead3(file) {

        Object.assign(this.formData, {
          receiptImg: file.content
        })
        this.check()
        this.uploadHandle(file.file, 'receiptImg')
      },
      uploadHandle(data, type) {
        console.log(data);
        const that = this;
        upload({
          file: data
        }).then(res => {
          Object.assign(that.formData, {
            [type]: res.data
          })
        })
      },
      //第二步
      areaCancel() {
        this.showArea = false;
      },
      areaConfirm(value) {
        let add = value[0].name + ',' + value[1].name + ',' + value[2].name;
        Object.assign(this.formData, {
          address: add
        })
        this.showArea = false;
        this.check();
      },
      gsCancel() {
        this.showGs = false;
      },
      gsConfirm(value) {
        let add = value[0].name + ',' + value[1].name + ',' + value[2].name;
        Object.assign(this.formData, {
          gsAdd: add
        })
        this.showGs = false;
        this.check();
      },
      onConfirm(value) {

        Object.assign(this.formData, {
          relation: value
        })
        this.showGx = false;
        this.check();
      },
      onCancel() {
        this.showGx = false;
      },
      //校验
      check(m) {
        let n = m == 0;

        if (this.active == 0) {
          if (this.formData.idCardFrontImg == '') {
            if (n) {
              this.$info('请上传身份证正面');
            }
            this.btn = false;
            return;
          }
          if (this.formData.idCardBackImg == '') {
            if (n) {
              this.$info('请上传身份证背面');
            }
            this.btn = false;
            return;
          }
          if (this.formData.receiptImg == '') {
            if (n) {
              this.$info('请上传首付收据');
            }
            this.btn = false;
            return;
          }
          this.btn = true;
        }
        if (this.active == 2) {
          if (this.formData.cardOwnerName == '') {
            if (n) {
              this.$info('请填写持卡人姓名');
            }
            this.btn = false;
            return;
          }
          if (this.formData.bankNumber == '') {
            if (n) {
              this.$info('请填写银行卡号');
            }
            this.btn = false;
            return;
          }
          if (this.formData.bankMobile == '') {
            if (n) {
              this.$info('请填写预留手机号');
            }
            this.btn = false;
            return;
          }
          if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formData.bankMobile))) {
            if (n) {
              this.$info('请填写正确的手机号')
            };
            this.btn = false;
            return;
          }
          if (this.formData.veriCode == '') {
            if (n) {
              this.$info('请填写验证码');
            }
            this.btn = false;
            return;
          }
          if (this.formData.bankName == -1) {
            if (n) {
              this.$info('未选择支持的银行');
            }
            this.btn = false;
            return;
          }
          if (!this.formData.agree) {
            if (n) {
              this.$info('请勾选同意扣款协议');
            }
            this.btn = false;
            return;
          }
          this.btn = true;
        }
        if (this.active == 1) {
          if (this.formData.name == '') {
            if (n) {
              this.$info('请填写姓名');
            }
            this.btn = false;
            return;
          }
          if (this.formData.idCardNumber == '') {
            if (n) {
              this.$info('请填写身份证号')
            };
            this.btn = false;
            return;
          }
          if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(this.formData.idCardNumber)) {
            if (n) {
              this.$info('请填写正确的身份证号')
            };
            this.btn = false;
            return;
          }
          if (this.formData.address == '请选择省市区') {
            if (n) {
              this.$info('请填写省市区')
            };
            this.btn = false;
            return;
          }
          if (this.formData.detail == '') {
            if (n) {
              this.$info('请填写详细地址')
            };
            this.btn = false;
            return;
          }
          if (this.formData.companyName == '') {
            if (n) {
              this.$info('请填写公司名称')
            };
            this.btn = false;
            return;
          }
          if (this.formData.companyNumber == '') {
            if (n) {
              this.$info('请填写公司电话')
            };
            this.btn = false;
            return;
          }
          if (this.formData.gsAdd == '请选择省市区') {
            if (n) {
              this.$info('请填写公司地址')
            };
            this.btn = false;
            return;
          }
          if (this.formData.gsDetail == '') {
            if (n) {
              this.$info('请填写公司详细地址')
            };
            this.btn = false;
            return;
          }
          if (this.formData.relativesName == '') {
            if (n) {
              this.$info('请填写亲属姓名')
            };
            this.btn = false;
            return;
          }
          if (this.formData.relativesMobile == '') {
            if (n) {
              this.$info('请填写亲属电话')
            };
            this.btn = false;
            return;
          }
          if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formData.relativesMobile))) {
            if (n) {
              this.$info('请填写正确的亲属电话')
            };
            this.btn = false;
            return;
          }
          if (this.formData.relation == '请选择') {
            if (n) {
              this.$info('请选择亲属关系')
            };
            this.btn = false;
            return;
          }
          this.btn = true;
        }
      },
      //下一步
      submit() {
        const ac = this.active;
        this.check(0);
        if (!this.btn) {
          return;
        }
        if (this.active == 2) {

          Object.assign(this.formData, {
            companyAdress: this.formData.gsAdd + ',' + this.formData.gsDetail,
            area: this.formData.address + ',' + this.formData.detail,
          })
          createOrder(this.formData).then(res => {
            if (res.code == 0) {
              this.active = ac + 1;
              this.btn = false;
            }else{
              this.$info(res.msg)
            }

          })

        } else {
          this.active = ac + 1;
          this.btn = false;
        }


      },
      //第三部发送验证码
      sendCode() {
        if (this.time !== '发送验证码') {
          return;
        }
        const that = this;

        let _t = 60;
        this.time = _t + "s重新获取";
        const st = setInterval(() => {
          _t--;
          if (_t == 0) {

            that.time = "发送验证码";
            clearInterval(st);
          } else {
            that.time = _t + "s重新获取";
          }
        }, 1000)
      },
      agreeHandle(e) {
        Object.assign(this.formData, {
          agree: e.target.checked
        })
        this.check();
      },
      getYH(n) {
        Object.assign(this.formData, {
          bankName: n
        })
        this.check();
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
    padding-top: 0.3rem;
  }

  .photo {
    position: relative;
    width: 100%;
    height: 3.2rem;
    margin-top: 0.5rem;
    text-align: center;

    font-size: 0.3rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 0.3rem;
    box-sizing: border-box;
    padding-top: 0.9rem;
  }

  .photo p {
    margin-top: 0.2rem;
  }

  .photo img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 3.2rem;
    object-fit: cover;
  }

  .photo1 {
    background: url(../../assets/pic_id1@3x.png) no-repeat 0 0;
    background-size: 100%;
  }

  .photo2 {
    background: url(../../assets/pic_id2@3x.png) no-repeat 0 0;
    background-size: 100%;
  }

  .photo3 {
    background: url(../../assets/pic_id3@3x.png) no-repeat 0 0;
    background-size: 100%;
  }

  .btn {
    width: 5.5rem;
    height: 0.9rem;
    background: #EF3E2F;
    box-shadow: 0rem 0.1rem 0.1rem 0rem rgba(239, 62, 47, 0.1);
    border-radius: 0.45rem;
    opacity: 0.3;
    margin: 0 auto 1rem;
    text-align: center;

    font-size: 0.3rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.9rem;
  }

  .btn.curr {
    opacity: 1;
  }

  .p1 {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.9rem;
  }

  .p1 h3 {
    text-align: center;
    font-size: 0.26rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.26rem;
  }

  .add {
    position: relative;
    width: calc(100% - 2rem);
    display: flex;
    font-size: 0.24rem;
    color: #999999;
    align-items: center;
    justify-content: space-between;
  }

  .add img {
    width: 0.2rem;
    height: 0.2rem;

  }

  .van-cell {
    padding: 10px 0.4rem;
  }

  .van-cell::after {
    left: 0.4rem;
    right: 0.4rem;
  }

  .border {
    position: relative;
    width: 100%;
    height: 0.2rem;
    background: #F8F8F8;
  }

  .p4 {
    height: calc(100vh - 1.09rem);
    background: #F8F8F8;
  }

  .p4Body {
    position: relative;
    width: 100%;
    background: #fff;
    margin-bottom: 0.3rem;
  }

  .p4Top {
    position: relative;
    text-align: center;
    padding-top: 0.3rem;
    padding-bottom: 0.5rem;
  }

  .p4Top img {
    width: 1.2rem;
    margin: 0 auto;
  }

  .p4Top h3 {
    margin: 0.1rem 0 0.2rem;
    font-size: 0.34rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 0.48rem;
  }

  .p4Top p {

    font-size: 0.26rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 0.38rem;
  }

  .p3 {
    height: calc(100vh - 2.6rem);
    background: #F8F8F8;
  }

  .p3 strong {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.2rem;

    font-size: 0.22rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6E6E6E;
    line-height: 0.22rem;
  }

  .p3 h3 {
    width: 100%;
    box-sizing: border-box;

    font-size: 0.28rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 0.28rem;
    background: #fff;
    padding-left: 0.3rem;
    padding-top: 0.3rem;
  }

  .yh {
    position: relative;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 0.3rem;
    display: flex;
    flex-wrap: wrap;

  }

  .yh span {
    width: 1.44rem;
    height: 0.46rem;
    line-height: 0.46rem;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0.3rem;
    border: 0.01rem solid #DDDDDD;
    background-color: transparent;
    font-size: 0.26rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }

  .yh span.curr {
    color: #EF3E2F;
    border: 0.01rem solid #EF3E2F;
  }

  .p3 p {

    height: 0.3rem;
    font-size: 0.22rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 0.3rem;
    margin-bottom: 0.2rem;
    text-align: center;
  }

  .p3 em {
    color: #0A6DF6;
  }

  .p3 input {
    width: 0.22rem;
    height: 0.22rem;
    margin-right: 0.1rem;
    border: 1px solid #ccc;
  }

  .back {
    position: relative;
    width: 1.3rem;
    height: 0.68rem;

    margin-bottom: 0.1rem;
    background: #EF3E2F;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.68rem;
  }

  .back img {
    width: 0.28rem;
    height: 0.28rem;
    margin-right: 0.1rem;
  }

  .tab {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem;
    border-bottom: 0.2rem solid #F8F8F8;
  }
</style>
