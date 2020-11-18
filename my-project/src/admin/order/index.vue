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
        <el-select size="small" v-model="selectValue" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <el-date-picker v-model="value1" type="daterange" size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      <van-button type="primary" size="small">按日期查找</van-button>
      <van-button type="warning" size="small">导出当前订单</van-button>
    </div>
    <el-table :data="tableData" style="width: 100%;box-sizing: border-box;padding: 20px;">
      <el-table-column prop="id" label="订单号" width="110px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80px"></el-table-column>
      <el-table-column prop="code" label="身份证号" width="170px"></el-table-column>
      <el-table-column prop="times" label="分期期数" width="80px"></el-table-column>
      <el-table-column prop="money" label="分期金额" width="80px"></el-table-column>
      <el-table-column prop="className" label="课程名称"></el-table-column>
      <el-table-column prop="creatTime" label="创建时间" width="100px"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="100px"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="100px"></el-table-column>
      <el-table-column prop="status" label="审核状态" width="80px"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <van-button type="primary" size="mini" @click="detailHandle(scope.row)">详情/审核</van-button>
          <van-button type="info" size="mini" @click="deleteHandle">删除</van-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background style="margin: 40px auto; text-align: center;" layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'vorder',
  props:['detail'],
  data() {
    return {
      value: '',
      value1: '',
      tableData: [
        {
          id: '23433131232',
          name: '王小虎',
          code: '152527199411130989',
          times: '3',
          money: '2000',
          className: '这里是课程名称',
          creatTime: '2020-09-09',
          startTime: '2020-09-09',
          endTime: '2020-09-09',
          status: '审核中'
        },
        {
          id: '23433131232',
          name: '王小虎',
          code: '152527199411130989',
          times: '3',
          money: '2000',
          className: '这里是课程名称',
          creatTime: '2020-09-09',
          startTime: '2020-09-09',
          endTime: '2020-09-09',
          status: '审核中'
        },
        {
          id: '23433131232',
          name: '王小虎',
          code: '152527199411130989',
          times: '3',
          money: '2000',
          className: '这里是课程名称',
          creatTime: '2020-09-09',
          startTime: '2020-09-09',
          endTime: '2020-09-09',
          status: '审核中'
        },
        {
          id: '23433131232',
          name: '王小虎',
          code: '152527199411130989',
          times: '3',
          money: '2000',
          className: '这里是课程名称',
          creatTime: '2020-09-09',
          startTime: '2020-09-09',
          endTime: '2020-09-09',
          status: '审核中'
        },
        {
          id: '23433131232',
          name: '王小虎',
          code: '152527199411130989',
          times: '3',
          money: '2000',
          className: '这里是课程名称',
          creatTime: '2020-09-09',
          startTime: '2020-09-09',
          endTime: '2020-09-09',
          status: '审核中'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selectValue: ''
    };
  },
  methods: {
    getCode() {},
    onSearch() {},
    detailHandle(data){
      this.$emit("detail", data);
    },
    deleteHandle() {
      this.$confirm('是否确定要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
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
</style>
