<template>
  <div class="classList">
    <div class="top">
      <h3>账号信息</h3>
      <el-row :gutter="20">
        <el-col :span="5">商户名称：{{data.name}}</el-col>
        <el-col :span="5">商户手机号：{{data.mobile}}</el-col>
        <el-col :span="8" class="evm">
          商户二维码：
          <img :src="data.qrCode" />
          <el-button type="primary">保存</el-button>
        </el-col>
        <el-col :span="6">商户专属分期链接：{{data.shareUrl}}</el-col>
      </el-row>
    </div>
    <div class="down">
      <h3>分期课程（商品）</h3>
      <p>*这里的设置会显示在前台让用户选择</p>
      <el-button type="success" @click="addClass">新增</el-button>
      <el-table :data="tableData" style="width: 800px;box-sizing: border-box;border:1px solid #f3f3f3">
        <el-table-column prop="id" label="ID" width="110px"></el-table-column>
        <el-table-column prop="examFashion" label="考试方式"></el-table-column>
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <van-button type="primary" size="mini" @click="editerHandle(scope.row)">编辑</van-button>
            <van-button type="info" size="mini" @click="deleteHandle(scope.row.id)">删除</van-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background style="margin: 40px auto; text-align: center;"
      layout="prev, pager, next" :total="totalPages" @current-change="currentChange"></el-pagination>
    </div>
    <el-dialog :title="!inputData.id  ? '新增课程(商品)' : '编辑课程(商品)'" :visible.sync="popShow">

      <el-select v-model="inputData.examFashion" placeholder="请选择考试方式" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.examFashionCode"
            :label="item.examFashionName"
            :value="item.examFashionName">
          </el-option>
        </el-select>

      <div style="height: 20px;"></div>
      <el-input v-model="inputData.name" placeholder="请输入课程名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popShow = false">取 消</el-button>
        <el-button type="primary" @click="sureBtn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDevCourseList, createCourse, updateCourse,deleteCourse,getExamFashionConfigList } from '../../server/admin.js';
import {getDevBusiness} from '../../server/index.js';
export default {
  name: 'index',
  data() {
    return {
      popShow: false,
      page: 0,
      rows: 10,
      totalPages:0,

      inputData: {
        examFashion: '',
        name: ''
      },
      options:[],
      data:{
        name:'',
        qrCode:'',
        mobile:'',
        shareUrl:'',
        userKey:''
      },
      tableData: []
    };
  },
  created() {
    this.getList();
    getDevBusiness({
      mobile:window.localStorage.getItem('adminMobile')
    }).then(res=>{
      this.data = res.data
    })

    getExamFashionConfigList({}).then(res=>{
      this.options = res.data;
    })
  },
  methods: {
    getList() {
      getDevCourseList({
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.tableData = res.data.content;
        this.totalPages = res.data.totalPages
      });
    },
    currentChange(page){
      this.page = page;
      this.getList();
    },
    addClass() {
      this.popShow = true;
      this.inputData = {
        examFashion: '',
        name: ''
      };
    },
    deleteHandle(id){
      this.$confirm('是否确定要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteCourse(id).then(res=>{
            this.getList();
          })
        })
        .catch(() => {

        });

    },
    sureBtn() {
      if (!this.inputData.id) {
        createCourse(this.inputData).then(res => {
          if (res.code == 0) {
            this.getList();
            this.popShow = false;
          } else {
            this.$info(res.msg);
          }
        });
      } else {
        updateCourse(this.inputData).then(res => {
          if (res.code == 0) {
            this.getList();
            this.popShow = false;
          } else {
            this.$info(res.msg);
          }
        });
      }
    },
    editerHandle(data) {
      this.inputData = data;
      this.popShow = true;
      this.id = data.id
    }
  }
};
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

.classList .down > button {
  margin-bottom: 20px;
}
</style>
