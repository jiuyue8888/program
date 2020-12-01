<template>
  <div class="order">
    <div class="top">
      <van-search v-model="value" show-action placeholder="订单号/姓名" @search="onSearch">
        <template #action>
          <van-button type="primary" @click="onSearch" size="small">搜索</van-button>
        </template>
      </van-search>
      <div>
        <em>筛选：</em>
        <el-select size="small" v-model="selectValue" placeholder="请选择" @change="selectChange">
          <el-option v-for="(item,id) in options" :key="item" :label="item" :value="id"
          ></el-option>
        </el-select>
      </div>
      <el-date-picker v-model="value1" type="daterange" size="small" range-separator="至" start-placeholder="开始日期"
      @change="timeChange" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
      <van-button type="primary" size="small" @click="getList">按日期查找</van-button>
      <van-button type="warning" size="small" @click="excel">导出当前订单</van-button>
    </div>
    <el-table :data="tableData" style="width: 100%;box-sizing: border-box;padding: 20px;">
      <el-table-column prop="orderId" label="订单号" width="110px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80px"></el-table-column>
      <el-table-column prop="idCardNumber" label="身份证号" width="170px"></el-table-column>
      <el-table-column prop="auditing" label="分期期数" width="80px"></el-table-column>
      <el-table-column prop="amount" label="分期金额" width="80px"></el-table-column>
      <el-table-column prop="courseName" label="课程名称"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="100px"></el-table-column>
      <el-table-column prop="auditingTime" label="开始时间" width="100px"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="100px"></el-table-column>
      <el-table-column prop="auditing" label="审核状态" width="80px">
        <template slot-scope="scope">
          <span :class="'color'+scope.row.auditing">{{statusShow(scope.row.auditing)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <van-button type="primary" size="mini" @click="detailHandle(scope.row)">详情/审核</van-button>
          <van-button type="info" size="mini" @click="deleteHandle(scope.row.id)">删除</van-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background style="margin: 40px auto; text-align: center;" layout="prev, pager, next" :total="totalElements" @current-change="currentChange"></el-pagination>
  </div>
</template>

<script>
import { getDveOrderList, deleteOrder,exported } from '../../server/admin.js';
export default {
  name: 'vorder',
  props: ['detail'],
  data() {
    return {
      value: '',
      value1: '',
      totalElements: 0,
      page: 0,
      rows: 10,
      tableData: [],
      options: ["全部状态","待审核","被拒绝","通过审核"],
      selectValue: '全部状态',
      pageData: {
        orderStatus: 0,
        startDate: '',
        endDate: '',

        orderCode: ''
      }
    };
  },
  created() {
    //this.getList();
  },
  mounted(){
    this.getList();
  },
  methods: {
    getCode() {},
    onSearch() {
      Object.assign(this.pageData, {
        orderCode: this.value
      });
      this.getList();
    },
    selectChange(n){
      Object.assign(this.pageData,{
        orderStatus:n
      })
      this.getList();
    },
    timeChange(value){

      Object.assign(this.pageData, {
        startDate: value[0],
        endDate: value[1],
      });

    },
    getList() {
      getDveOrderList(
        Object.assign({}, this.pageData, {
          page: this.page,
          rows: this.rows
        })
      ).then(res => {
		if(res.code==0){
			this.tableData = res.data.content;
			this.totalElements = res.data.totalElements;
		}
        
      });
    },
    statusShow(n){
      return n == 1 ? '待审核' : (n == 2 ? '被拒绝' : '审核通过')
    },
    detailHandle(data) {
      this.$emit('detail', data);
    },
    currentChange(page) {
      this.page = page - 1;
      this.getList();
    },
    //导出订单
    excel(){
      window.location.href = `http://m.bgfenqi.com/product/web/inner/api/exported?
	  orderStatus=${this.pageData.orderStatus}&
	  orderCode=${this.pageData.orderCode}&
	  endDate=${this.pageData.endDate}&
	  startDate=${this.pageData.startDate}&
	  sessionCode=${window.localStorage.getItem('sessionCode')}`

    },
    //删除订单
    deleteHandle(id) {
      this.$confirm('是否确定要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteOrder(id).then(res => {
            if (res.code == 0) {
              this.$info('删除成功');
			  this.getList();
            }
            
          });
        })
        .catch(() => {
          /*this.$message({
            type: 'info',
            message: '已取消删除'
          });*/
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order .top {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f7f7f7;
}
.color2,
.color1{
  color: #D9534F;
}
.color3{
  color: #42B983;
}
</style>
