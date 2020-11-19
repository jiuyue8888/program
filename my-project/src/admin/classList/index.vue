<template>
  <div class="classList">

    <div class="top">
      <h3>账号信息</h3>
      <el-row :gutter="20">
        <el-col :span="5">商户名称：某默默教育机构</el-col>
        <el-col :span="5">商户手机号：13623786382</el-col>
        <el-col :span="8" class="evm">商户二维码：<img src="../../assets/pic_id1@3x.png" />
          <el-button type="primary">保存</el-button>
        </el-col>
        <el-col :span="6">商户专属分期链接：https://XXXX.com</el-col>
      </el-row>
    </div>
    <div class="down">
      <h3>分期课程（商品）</h3>
      <p>*这里的设置会显示在前台让用户选择</p>
      <el-button type="success" @click="addClass">新增</el-button>
      <el-table :data="tableData" style="width: 800px;box-sizing: border-box;border:1px solid #f3f3f3">
        <el-table-column prop="id" label="ID" width="110px"></el-table-column>
        <el-table-column prop="type" label="考试方式"></el-table-column>
        <el-table-column prop="className" label="课程名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <van-button type="primary" size="mini" @click="editerHandle(scope.row)">编辑</van-button>
            <van-button type="info" size="mini">删除</van-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background style="margin: 40px auto; text-align: center;" layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
    <el-dialog :title="inputData.type==''?'新增课程(商品)':'编辑课程(商品)'" :visible.sync="popShow">
      <el-input v-model="inputData.type" placeholder="请输入考试方式"></el-input>
      <el-input v-model="inputData.className" placeholder="请输入课程名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popShow = false">取 消</el-button>
        <el-button type="primary" @click="sureBtn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        popShow: false,
        inputData: {
          type: '',
          className: ''
        },
        tableData: [{
          id: '213123123',
          type: '大自考',
          className: '必过精英版'
        }, {
          id: '213123123',
          type: '大自考',
          className: '必过精英版'
        }, {
          id: '213123123',
          type: '大自考',
          className: '必过精英版'
        }]
      }
    },
    methods: {
      addClass() {
        this.popShow = true;
        this.inputData = {
          type: '',
          className: ''
        }
      },
      sureBtn(){
        this.popShow = false;
      },
      editerHandle(data){

        this.inputData = data;
        this.popShow = true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .classList {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
  }

  .evm {
    display: flex;

    align-items: flex-start;
  }

  .evm img {
    width: 150px;
    margin: 0 10px;
  }

  .classList .top {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .classList .top h3 {
    margin-bottom: 20px;
  }

  .classList h3 {
    font-size: 18px;

  }

  .classList p {
    font-size: 12px;
    color: #999;
    margin-bottom: 30px;
  }

  .classList .down>button {
    margin-bottom: 20px;
  }
</style>
