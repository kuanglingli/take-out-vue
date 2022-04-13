<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{textAlign: 'center'}"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100"
                  align="center">
                </el-table-column>
                <el-table-column
                  property="id"
                  label="客户id"
                  v-if="isShow"
                  align="center">
                </el-table-column>
                <el-table-column
                  property="userName"
                  label="用户名"
                  width="320"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  property="name"
                  label="姓名"
                  width="320"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  property="tel"
                  label="联系电话"
                  width="320"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  property="registTime"
                  label="注册日期"
                  width="320"
                  align="center"
                  >
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                isShow:false
            }
        },
        components: {
          headTop,
        },
        method:{
          
        },
        created(){
            this.getUsers();
        },
        methods: {
          getUsers(){
            this.$axios({
              method: "POST",
              url: "/shiro/cust-do/custList",
              data: {
                page: this.offset,
                size: this.limit
              },
              headers: {
              token: this.getToken()
              }
            }).then(result => {
              if (result.status == 200) {
              const data = result.data;
              console.log(data)
              if (data.code === "0") {
                this.$message({
                showClose: true,
                message: data.msg,
                type: "success",
                duration: "1600"
                });
                this.tableData=data.data.records;
                this.count=data.data.total;
                this.currentPage=data.data.current;
              } else {
                this.$message({
                showClose: true,
                message: data.msg,
                type: "error",
                duration: "3000"
                });
              }
              // this.setToken("");
              // this.$router.push({ path: "/" });
              } else {
              this.$message({
                showClose: true,
                message: "操作失败，请联系管理员",
                type: "error",
                duration: "3000"
              });
              }
            });
          },
          handleSizeChange(val) {
              console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
              this.currentPage = val;
              this.offset = (val - 1)*this.limit;
              this.getUsers()
          }
      }
        
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
