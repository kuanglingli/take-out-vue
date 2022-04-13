<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
  				
	  			<header class="form_header">添加地址</header>
	  			<el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
	  				<el-form-item label="联系人" prop="contact">
						<el-input v-model="foodForm.contact"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" prop="tel">
						<el-input v-model="foodForm.tel"></el-input>
					</el-form-item>
					
					<el-form-item label="配送地址" prop="address">
						<el-input v-model="foodForm.address"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addFood('foodForm')">确认添加地址</el-button>
					</el-form-item>
	  			</el-form>
	  			
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    
    export default {
    	data(){
    		return {
    			
    			restaurant_id: 0,
    			
    			foodForm: {
    				contact: '',
    				tel: '',
    				address: ''
    				
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
		          	tel: 20,
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
            
    		
    	},
    	computed: {
    		selectValue: function (){
    			return this.foodForm.categoryList[this.foodForm.itemType]||{}
    		}
    	},
    	methods: {
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
		    addFood(foodForm){
		    	this.$refs[foodForm].validate(async (valid) => {
					if (valid) {
						this.$axios({
							method: "post",
							url: "/shiro/address-do/save",
							data: this.foodForm,
							headers: {
							token: this.getToken()
							}
						}).then(result => {
							if (result.status == 200) {
								this.foodForm = {
									contact: '',
									tel: '',
									address: ''
								};
								this.$message({
									showClose: true,
									message: "添加成功",
									type: "success",
									duration: "1600"
								});
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
