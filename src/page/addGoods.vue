<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
  				<!-- <header class="form_header">选择商品种类</header>
	  			<el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
		  			<el-row class="category_select">
		  				<el-form-item label="商品种类">
			  				<el-select v-model="categoryForm.itemType" :placeholder="selectValue.label" style="width:100%;">
							    <el-option
							      	v-for="item in categoryForm.categoryList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
						  	</el-select>
						</el-form-item>
					</el-row> -->
					<!-- <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
						<div class="add_category">
							<el-form-item label="商品种类" prop="name">
								<el-input v-model="categoryForm.name"></el-input>
							</el-form-item>
							<el-form-item label="种类描述" prop="description">
								<el-input v-model="categoryForm.description"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>
							</el-form-item>
						</div>
					</el-row> -->
					<!-- <div class="add_category_button" @click="addCategoryFun">
						<i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
						<i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
						<span>添加商品</span>
					</div> -->
	  			<!-- </el-form> -->
	  			<header class="form_header">添加商品</header>
	  			<el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
	  				<el-form-item label="商品名称" prop="itemName">
						<el-input v-model="foodForm.itemName"></el-input>
					</el-form-item>
					<!-- <el-form-item label="商品种类" prop="itemType">
						<el-select v-model="foodForm.itemType" :placeholder="selectValue.label" style="width:100%;">
							<el-option
								v-for="item in foodForm.categoryList"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item> -->
					<el-form-item label="商品价格" prop="price">
						<el-input v-model="foodForm.price"></el-input>
					</el-form-item>
					<el-form-item label="制作时长（分）" prop="makeTime">
						<el-input v-model="foodForm.makeTime"></el-input>
					</el-form-item>
					<!-- <el-form-item label="商品活动" prop="activity">
						<el-input v-model="foodForm.activity"></el-input>
					</el-form-item> -->
					<el-form-item label="商品描述" prop="itemDesc">
						<el-input v-model="foodForm.itemDesc"></el-input>
					</el-form-item>
					<el-form-item label="上传商品图片">
						<el-upload
						  class="avatar-uploader"
						  :action="imgUpload"
						  :show-file-list="false"
						  :on-success="uploadImg"
						  :before-upload="beforeImgUpload">
						  <img v-if="foodForm.itemImgUrl" :src="baseImgUrl+foodForm.itemImgUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					
					<el-form-item>
						<el-button type="primary" @click="addFood('foodForm')">确认添加商品</el-button>
					</el-form-item>
	  			</el-form>
	  			<!-- <el-dialog title="添加规格" v-model="dialogFormVisible">
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
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addspecs">确 定</el-button>
				  </div>
				</el-dialog> -->
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    // import {getCategory, addCategory, addFood} from '@/api/getData'
    // import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			imgUpload:"/shiro/upload/imgUpload",
				baseImgUrl:"/shiro",
    			// baseImgPath,
    			restaurant_id: 0,
    			// categoryForm: {
    			// 	categoryList: [{
				// 		label:"实物商品",
				// 		value:"1"
				// 	},{
				// 		label:"配送费",
				// 		value:"2"
				// 	}],
    			// 	itemType: '',
    			// 	name: '',
    			// 	description: '',
    			// },
    			foodForm: {
					categoryList: [{
						label:"实物商品",
						value:"1"
					},{
						label:"配送费",
						value:"2"
					}],
					itemType: '1',
    				itemName: '',
    				price: '',
    				makeTime: '',
    				itemDesc: '',
    				itemImgUrl:"",
    			},
    			foodrules: {
    				itemName: [
						{ required: true, message: '请输入商品名称', trigger: 'blur' },
					],
					price: [
						{ required: true, message: '请输入商品价格', trigger: 'blur',type:'string' },
						{
							pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
							message: '请输入正确额格式,可保留两位小数'
						}
					],
					makeTime: [
						{ required: true, message: '请输入商品制作时长', trigger: 'blur' },
						{
							pattern:/^[+]{0,1}(\d+)$/,
							message:"请输入正整数"
						}
					],
					itemType: [
						{ required: true, message: '请选择商品类型', trigger: ['change'],type: 'number' },
					]
    			},
    			attributes: [{
		          	value: '新',
		          	label: '新品'
		        }, {
		          	value: '招牌',
		          	label: '招牌'
		        },],
    			showAddCategory: false,
    			foodSpecs: 'one',
    			dialogFormVisible: false,
		        specsForm: {
		          	specs: '',
		          	packing_fee: 0,
		          	price: 20,
		        },
		        specsFormrules: {
		        	specs: [
						{ required: true, message: '请输入规格', trigger: 'blur' },
					],
		        }
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
			this.foodForm = {
					categoryList: [{
						label:"实物商品",
						value:"1"
					},{
						label:"配送费",
						value:"2"
					}],
					itemType: '1',
    				itemName: '',
    				price: '',
    				makeTime: '',
    				itemDesc: '',
    				itemImgUrl:"",
    			};
    		if (localStorage.getItem('restaurant_id')) {
    			this.restaurant_id = localStorage.getItem('restaurant_id');
    		}else{
				this.$axios({
					method: "post",
					url: "/shiro/shop-do/currentShop",
					data: {},
					headers: {
					token: this.getToken()
					}
				}).then(result => {
					if (result.status == 200) {
					const data = result.data;
					if (data.code === "0") {
						this.$message({
						showClose: true,
						message: data.msg,
						type: "success",
						duration: "1600"
						});
						if(!data.data){
							this.$message({
								showClose: true,
								message: '请选择商户',
								type: "error",
								duration: "3000"
							});
							this.$router.push('/shopList');
						}else{
							this.restaurant_id = data.data.shopId;
						}
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
    		}
    	},
    	computed: {
    		selectValue: function (){
    			return this.foodForm.categoryList[this.foodForm.itemType]||{}
    		}
    	},
    	methods: {
    // 		async initData(){
    // 			try{
    // 				const result = await getCategory(this.restaurant_id);
	//     			if (result.status == 1) {
	//     				result.category_list.map((item, index) => {
	//     					item.value = index;
	//     					item.label = item.name;
	//     				})
	//     				this.categoryForm.categoryList = result.category_list;
	//     			}else{
	//     				console.log(result)
	//     			}
    // 			}catch(err){
    // 				console.log(err)
    // 			}
    // 		},
	// 	    addCategoryFun(){
	// 	    	this.showAddCategory = !this.showAddCategory;
	// 	    },
	// 	    submitcategoryForm(categoryForm) {
	// 			this.$refs[categoryForm].validate(async (valid) => {
	// 				if (valid) {
	// 					const params = {
	// 						name: this.categoryForm.name,
	// 						description: this.categoryForm.description,
	// 						restaurant_id: this.restaurant_id,
	// 					}
	// 					try{
	// 						const result = await addCategory(params);
	// 						if (result.status == 1) {
	// 							this.initData();
	// 							this.categoryForm.name = '';
	// 							this.categoryForm.description = '';
	// 							this.showAddCategory = false;
	// 							this.$message({
	// 				            	type: 'success',
	// 				            	message: '添加成功'
	// 				          	});
	// 						}
	// 					}catch(err){
	// 						console.log(err)
	// 					}
	// 				} else {
	// 					this.$notify.error({
	// 						title: '错误',
	// 						message: '请检查输入是否正确',
	// 						offset: 100
	// 					});
	// 					return false;
	// 				}
	// 			});
	// 		},
			uploadImg(res) {
				if (res) {
					this.foodForm.itemImgUrl = res;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			beforeImgUpload(file) {
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
	// 		addspecs(){
	// 			this.foodForm.specs.push({...this.specsForm});
	// 			this.specsForm.specs = '';
	// 			this.specsForm.packing_fee = 0;
	// 			this.specsForm.price = 20;
	// 			this.dialogFormVisible = false;
	// 		},
	// 		handleDelete(index){
	// 			this.foodForm.specs.splice(index, 1);
	// 		},
	// 		tableRowClassName(row, index) {
	// 	        if (index === 1) {
	// 	        	return 'info-row';
	// 	        } else if (index === 3) {
	// 	        	return 'positive-row';
	// 	        }
	// 	        return '';
	// 	    },
		    addFood(foodForm){
				if(!localStorage.getItem('restaurant_id')){
					this.$message({
					showClose: true,
					message: '请选择商户',
					type: "error",
					duration: "3000"
				});
				this.$router.push('/shopList');
				}
				if(localStorage.getItem('restaurant_id')){
					this.restaurant_id = localStorage.getItem('restaurant_id');
				}
		    	this.$refs[foodForm].validate(async (valid) => {
					if (valid) {
						const params = Object.assign(this.foodForm,{shopId:this.restaurant_id});
						this.$axios({
							method: "post",
							url: "/shiro/item-do/save",
							data: params,
							headers: {
							token: this.getToken()
							}
						}).then(result => {
							if (result.status == 200) {
								this.foodForm = {
									categoryList: [{
										label:"实物商品",
										value:"1"
									},{
										label:"配送费",
										value:"2"
									}],
									itemType: '1',
									itemName: '',
									price: '',
									makeTime: '',
									itemDesc: '',
									itemImgUrl:"",
								};
								this.$message({
									showClose: true,
									message: "添加成功",
									type: "success",
									duration: "1600"
								});
								this.$router.push({ path: "/foodList" });
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
				});
		    }
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
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
	.cell{
		text-align: center;
	}
</style>
