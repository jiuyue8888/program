<template>
  <div class="shop">
    <div class="down">
      <el-button type="success" @click="addClass">新增</el-button>
      <el-table :data="tableData" style="width: 100%;box-sizing: border-box;border:1px solid #f3f3f3">
        <el-table-column prop="name" label="商户名称" width="180px"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="shareUrl" label="商户专属分期链接"></el-table-column>
        <el-table-column label="二维码">
          <template slot-scope="scope">
            <img :src="scope.row.qrCode" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <van-button type="warning" size="mini" @click="saveImg(scope.row.qrCode)">保存二维码</van-button>
            <van-button type="primary" size="mini" @click="editerHandle(scope.row)">编辑</van-button>
            <van-button type="info" size="mini" @click="deleteShop(scope.row.id)">删除商户</van-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background style="margin: 40px auto; text-align: center;" layout="prev, pager, next" :total="totalPages" @current-change="currentChange"></el-pagination>
    </div>
    <el-dialog :title="!inputData.id ? '新增商户' : '编辑商户'" :visible.sync="popShow">
      <h4>商户手机号</h4>
      <el-input v-model="inputData.mobile" placeholder="请输入商户手机号"></el-input>
      <h4>商户名称</h4>
      <el-input v-model="inputData.name" placeholder="请输入商户名称"></el-input>
      <h4>登陆密码</h4>
      <el-input v-model="inputData.password" placeholder="请输入登陆密码"></el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="popShow = false">取 消</el-button>
        <el-button type="primary" @click="sureBtn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDevBusinessList, createDevBusiness, updateDevBusiness,deleteDevBusiness } from '../../server/admin.js';
export default {
  name: 'index',
  data() {
    return {
      popShow: false,
      page: 0,
      rows: 10,
      id: null,
      totalPages: 0,
      inputData: {
        name: '',
        mobile: '',
        password: ''
      },
      tableData: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getDevBusinessList({
        rows: this.rows,
        page: this.page
      }).then(res => {
        this.tableData = res.data.content;
        this.totalPages = res.data.totalPages;
      });
    },
    currentChange(page) {
      this.page = page;
      this.getList();
    },
    addClass() {
      this.popShow = true;
      this.inputData = {
        name: '',
        mobile: '',
        password: ''
      };
    },
    saveImg(url){
      var a = document.createElement('a');
      a.href = url;
      a.download = 'url';
      a.click();
    },
    deleteShop(id){
      this.$confirm('是否确定要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteDevBusiness(id).then(res=>{
            this.getList();
          })
        })
        .catch(() => {
      
        });
      
    },
    sureBtn() {

      if (this.inputData.id) {
        updateDevBusiness(this.inputData).then(res=>{
          if(res.code==0){
            this.popShow = false;
            this.getList();
          }else{
            this.$info(res.msg)
          }
        });
      } else {
        createDevBusiness(this.inputData).then(res=>{
          if(res.code==0){
            this.popShow = false;
            this.getList();
          }else{
            this.$info(res.msg)
          }
        });
      }
    },
    editerHandle(data) {
      this.inputData = data;
      this.popShow = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shop {
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

.shop .top {
  font-size: 14px;
  margin-bottom: 30px;
}

.shop .top h3 {
  margin-bottom: 20px;
}

.shop h4 {
  font-size: 16px;
  margin: 10px 0;
}

.shop p {
  font-size: 12px;
  color: #999;
  margin-bottom: 30px;
}

.shop .down > button {
  margin-bottom: 20px;
}
</style>
