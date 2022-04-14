<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                       <el-form-item label="地址id">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="联系人">
                        <span>{{ props.row.contact }}</span>
                      </el-form-item>
                      <el-form-item label="联系电话">
                        <span>{{ props.row.tel }}</span>
                      </el-form-item>
                      <el-form-item label="配送地址">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="联系人"
                  prop="contact"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="联系电话"
                  prop="tel"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="配送地址"
                  prop="address"
                  align="center">
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改商品信息" v-model="dialogFormVisible">
                <el-form :model="selectTable" :rules="foodrules" ref="selectTable">
                    <el-form-item label="联系人" label-width="100px" prop="contact">
                        <el-input v-model="selectTable.contact" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="100px" prop="tel">
                        <el-input v-model="selectTable.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="配送地址" label-width="100px" prop="address">
                        <el-input v-model="selectTable.address" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateFood('selectTable')">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        data(){
            return {
              shopId: null,
              city: {},
              offset: 0,
              limit: 20,
              count: 0,
              tableData: [],
              currentPage: 1,
              selectTable: {},
              dialogFormVisible: false,
              menuOptions: [{
                label:"实物商品",
                value:"1"
              },{
                label:"配送费",
                value:"2"
              }],
              selectMenu: {},
              selectIndex: null,
              specsForm: {
              specs: '',
              packing_fee: 0,
              price: 20,
		        },
            foodrules: {
              contact: [
                { required: true, message: '请输入联系人', trigger: 'blur' },
            ],
            tel: [
                { required: true, message: '请输入联系电话', trigger: 'blur',type:'string' },
                {
                    pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message:"请输入正确手机号"
                }
            ],
            address: [
                { required: true, message: '请输入详细地址', trigger: 'blur' },
            ],
    			  },
		        specsFormVisible: false,
            expendRow: [],
            }
        },
        watch:{
      $route(){
        //跳转到该页面后需要进行的操作
        this.getItems();
      }
    },
        created(){
        	this.getItems();
        },
    //     computed: {
    //     	specs: function (){
    //     		let specs = [];
    //     		if (this.selectTable.specfoods) {
	//         		this.selectTable.specfoods.forEach(item => {
	//         			specs.push({
	//         				specs: item.specs_name,
	//         				packing_fee: item.packing_fee,
	//         				price: item.price,
	//         			})
	//         		})
    //     		}
    //     		return specs
    //     	}
    //     },
    	components: {
    		headTop,
    	},
      methods: {
        getItems(){
          this.$axios({
            method: "POST",
            url: "/shiro/address-do/page",
            data: {
              page: this.currentPage,
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
                this.getItems()
            },
            expand(row, status){
              console.log(row)
              console.log(status)
            	if (status) {
            		this.getSelectItemData(row)
            	}else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
            handleEdit(row) {
            	this.getSelectItemData(row, 'edit')
                this.dialogFormVisible = true;
            },
            async getSelectItemData(row, type){
              // console.log(row)
            	// const restaurant = await getResturantDetail(row.shopId);
            	// const category = await getMenuById(row.category_id)
              this.selectTable = row;

              this.selectMenu = {label: row.itemTypeName, value: row.itemType}
              this.tableData.splice(row.index, 1, {...this.selectTable});
              this.$nextTick(() => {
                  this.expendRow.push(row.index);
              })
              // if (type == 'edit' && this.shopId != row.shopId) {
              // 	this.getMenu();
              // }
            },
            handleSelect(index){
            	this.selectIndex = index;
            	this.selectMenu = this.menuOptions[index];
            },
            handleDelete(index, row) {
              this.$axios({
                method: "post",
                url: "/shiro/address-do/delete",
                data: {id:row.id},
                headers: {
                token: this.getToken()
                }
              }).then(result => {
                if (result.status == 200) {
                  this.$message({
                    showClose: true,
                    message: "删除成功",
                    type: "success",
                    duration: "1600"
                  });
                  this.tableData.splice(index, 1);
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
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            updateFood(selectTable){
                this.dialogFormVisible = false;
                this.$refs[selectTable].validate(async (valid) => {
                  if (valid) {
                    this.$axios({
                      method: "post",
                      url: "/shiro/address-do/update",
                      data: this.selectTable,
                      headers: {
                      token: this.getToken()
                      }
                    }).then(result => {
                      if (result.status == 200) {
                        this.$message({
                          showClose: true,
                          message: "更新成功",
                          type: "success",
                          duration: "1600"
                        });
                        this.getItems();
                      } else {
                        this.$message({
                        showClose: true,
                        message: "操作失败，请联系管理员",
                        type: "error",
                        duration: "3000"
                        });
                      }
                    });
                  } else {
                    this.$notify.error({
                      title: '错误',
                      message: '请检查输入是否正确',
                      offset: 100
                    });
                    return false;
                  }
                })
            },
      }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
