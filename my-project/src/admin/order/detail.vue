<template>
  <div class="detail">
<el-row :gutter="20">
  <el-col :span="12">
    <div class="left">
      <h3>分期信息</h3>
      <p></p>
      <p></p>
    </div>
    </el-col>
  <el-col :span="12"><div class="right"></div></el-col>
  
</el-row>
  </div>
</template>

<script>
export default {
  name: 'vorder',
  props:[],
  data() {
    return {

    };
  },
  methods: {

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
