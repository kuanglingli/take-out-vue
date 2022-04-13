<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                       <el-form-item label="商品id">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="商品名称">
                        <span>{{ props.row.itemName }}</span>
                      </el-form-item>
                      <el-form-item label="商铺名称">
                        <span>{{ props.row.shopName }}</span>
                      </el-form-item>
                      <el-form-item label="商品编码">
                        <span>{{ props.row.itemId }}</span>
                      </el-form-item>
                      <el-form-item label="商铺编码">
                        <span>{{ props.row.shopId }}</span>
                      </el-form-item>
                      <el-form-item label="商品价格">
                        <span>{{ props.row.price }}</span>
                      </el-form-item>
                      <el-form-item label="制作时长（分）">
                        <span>{{ props.row.makeTime }}</span>
                      </el-form-item>
                      <el-form-item label="商品介绍">
                        <span>{{ props.row.itemDesc }}</span>
                      </el-form-item>
                      <el-form-item label="商铺地址">
                        <span>{{ props.row.shopAddress }}</span>
                      </el-form-item>
                      <el-form-item label="">
                        <span></span>
                      </el-form-item>
                      <!-- <el-form-item label="商品评分">
                        <span>{{ props.row.rating }}</span>
                      </el-form-item> -->
                      <!-- <el-form-item label="商品分类" v-if="isShow = false">
                        <span>{{ props.row.itemType }}</span>
                      </el-form-item>
                      <el-form-item label="商品分类">
                        <span>{{ props.row.itemTypeName }}</span>
                      </el-form-item> -->
                      <!-- <el-form-item label="月销量">
                        <span>{{ props.row.month_sales }}</span>
                      </el-form-item> -->
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="商品名称"
                  prop="itemName"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="商品介绍"
                  prop="itemDesc"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="所属商铺"
                  prop="shopName"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="商品价格"
                  prop="price"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="销售量"
                  prop="sellCount"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="制作时长"
                  prop="makeTime"
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
                    <el-form-item label="商品名称" label-width="100px" prop="itemName">
                        <el-input v-model="selectTable.itemName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" label-width="100px" prop="price">
                        <el-input v-model="selectTable.price" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="制作时长（分）" label-width="100px" prop="makeTime">
                        <el-input v-model="selectTable.makeTime" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品介绍" label-width="100px">
                        <el-input v-model="selectTable.itemDesc"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="商品分类" label-width="100px" prop="itemType">
	                    <el-select v-model="selectTable.itemType" :placeholder="selectMenu.label">
						    <el-option
						      v-for="item in menuOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
                    </el-form-item> -->
                    <el-form-item label="商品图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="imgUpload"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.itemImgUrl" :src="baseImgUrl + selectTable.itemImgUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <!-- <el-row style="overflow: auto; text-align: center;">
	                <el-table
				    :data="specs"
				    style="margin-bottom: 20px;"
				    :row-class-name="tableRowClassName">
					    <el-table-column
					      prop="specs"
					      label="规格">
					    </el-table-column>
					    <el-table-column
					      prop="packing_fee"
					      label="包装费">
					    </el-table-column>
					    <el-table-column
					      prop="price"
					      label="价格">
					    </el-table-column>
					    <el-table-column label="操作" >
					    <template slot-scope="scope">
					        <el-button
					          size="small"
					          type="danger"
					          @click="deleteSpecs(scope.$index)">删除</el-button>
					    </template>
					    </el-table-column>
					</el-table>
					<el-button type="primary" @click="specsFormVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
				</el-row> -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateFood('selectTable')">确 定</el-button>
              </div>
            </el-dialog>


            <!-- <el-dialog title="添加规格" v-model="specsFormVisible">
			  	<el-form :rules="specsFormrules" :model="specsForm">
				    <el-form-item label="规格" label-width="100px" prop="specs">
				     	<el-input v-model="specsForm.specs" auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="包装费" label-width="100px">
						<el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
					</el-form-item>
					<el-form-item label="价格" label-width="100px">
						<el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
					</el-form-item>
			  	</el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="specsFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addspecs">确 定</el-button>
			  </div>
			</el-dialog> -->
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    // import {baseUrl, baseImgPath} from '@/config/env'
    // import {getFoods, getFoodsCount, getMenu, updateFood, deleteFood, getResturantDetail, getMenuById} from '@/api/getData'
    export default {
        data(){
            return {
              imgUpload:"/shiro/upload/imgUpload",
				      baseImgUrl:"/shiro",
              // baseUrl,
              // baseImgPath,
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
              itemName: [
                { required: true, message: '请输入商品名称', trigger: 'blur' },
              ],
              price: [
                { required: true, message: '请输入商品价格', trigger: 'blur',type:'string' },
                {
                  pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
                  message: '请输入正确额格式,可保留两位小数'
                }
              ],
              makeTime: [
                { required: true, message: '请输入商品制作时长', trigger: 'blur' },
                {
                  pattern:/^[+]{0,1}(\d+)$/,
                  message:"请输入整数"
                }
              ],
              itemType: [
                { required: true, message: '请选择商品类型', trigger: ['change'],type: 'number' },
              ]
    			  },
		        specsFormVisible: false,
            expendRow: [],
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
      watch:{
      $route(){
        //跳转到该页面后需要进行的操作
        this.getItems();
      }
    },
      methods: {
        getItems(){
          this.$axios({
            method: "POST",
            url: "/shiro/item-do/page",
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
    //         async initData(){
    //             try{
    //                 const countData = await getFoodsCount({shopId: this.shopId});
    //                 if (countData.status == 1) {
    //                     this.count = countData.count;
    //                 }else{
    //                     throw new Error('获取数据失败');
    //                 }
    //                 this.getFoods();
    //             }catch(err){
    //                 console.log('获取数据失败', err);
    //             }
    //         },
    //         async getMenu(){
    //         	this.menuOptions = [];
    //             try{
    //                 const menu = await getMenu({shopId: this.selectTable.shopId, allMenu: true});
    //                 menu.forEach((item, index) => {
    //                     this.menuOptions.push({
    //                     	label: item.name,
    //                     	value: item.id,
    //                     	index,
    //                     })
    //                 })
    //             }catch(err){
    //                 console.log('获取商品种类失败', err);
    //             }
    //         },
    //         async getFoods(){
    //             const Foods = await getFoods({offset: this.offset, limit: this.limit, shopId: this.shopId});
    //             this.tableData = [];
    //             Foods.forEach((item, index) => {
    //                 const tableData = {};
    //                 tableData.name = item.name;
    //                 tableData.itemId = item.itemId;
    //                 tableData.itemDesc = item.itemDesc;
    //                 tableData.rating = item.rating;
    //                 tableData.month_sales = item.month_sales;
    //                 tableData.shopId = item.shopId;
    //                 tableData.category_id = item.category_id;
    //                 tableData.image_path = item.image_path;
    //                 tableData.specfoods = item.specfoods;
    //                 tableData.index = index;
    //                 this.tableData.push(tableData);
    //             })
    //         },
    //         tableRowClassName(row, index) {
	// 	        if (index === 1) {
	// 	        	return 'info-row';
	// 	        } else if (index === 3) {
	// 	        	return 'positive-row';
	// 	        }
	// 	        return '';
	// 	    },
	// 	    addspecs(){
	// 			this.specs.push({...this.specsForm});
	// 			this.specsForm.specs = '';
	// 			this.specsForm.packing_fee = 0;
	// 			this.specsForm.price = 20;
	// 			this.specsFormVisible = false;
	// 		},
	// 		deleteSpecs(index){
	// 			this.specs.splice(index, 1);
	// 		},
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
                url: "/shiro/item-do/delete",
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
                      url: "/shiro/item-do/update",
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
