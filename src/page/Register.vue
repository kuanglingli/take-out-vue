<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="user" :model="user" :rules="user.type=='1'?custRules:shopRules"  status-icon label-width="80px">
          <h3>注册</h3>
          <hr>
          <el-form-item prop="type" label="用户类型">
            <el-select v-model="user.type" placeholder="请选择">
              <el-option
                v-for="item in user.searchBarList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="userName" label="用户名">
              <el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
          <div v-if="user.type=='1'">
            <el-form-item prop="name" label="姓名">
              <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item prop="tel" label="手机号">
              <el-input v-model="user.tel" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </div>
          <div v-if="user.type=='2'"> 
            <el-form-item label="店铺名称" label-width="100px" prop="shopName">
                        <el-input v-model="user.shopName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" label-width="100px" prop="shopAddress">
                      <el-input v-model="user.shopAddress" auto-complete="off"></el-input>
                        <!-- <el-autocomplete
                          v-model="address.shopAddress"
                          placeholder="请输入地址"
                          style="width: 100%;"
                        ></el-autocomplete> -->
                    </el-form-item>
                    
                    <el-form-item label="联系电话" label-width="100px" prop="shopTel">
                        <el-input v-model="user.shopTel"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺介绍" label-width="100px" prop="shopDesc">
                        <el-input v-model="user.shopDesc"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="店铺分类" label-width="100px">
                        <el-cascader
                          :options="categoryOptions"
                          v-model="selectedCategory"
                          change-on-select
                        ></el-cascader>
                    </el-form-item> -->
                    <el-form-item label="商铺图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="imgUpload"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="user.shopImgUrl" :src="baseImgUrl+user.shopImgUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
          </div>
          
          <el-form-item>
            <el-button type="primary" icon @click="doRegister('user')">注册账号</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
 
<script>
// import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      imgUpload:"/shiro/upload/imgUpload",
      baseImgUrl:"/shiro",
      user: {
        type:'1',
        userName: "",
        tel: "",
        name: "",
        password: "",
        shopName: "",
        shopAddress: "",
        shopTel: "",
        shopImgUrl: "",  
        searchBarList:[
          {
            code:'1',
            name:'客户类型'
          },
          {
            code:'2',
            name:'商家类型'
          }
        ]
      },
      custRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur',type:'string' },
          // {
          // 	pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
          // 	message: '请输入正确额格式,可保留两位小数'
          // }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          // {
          // 	pattern:/^[+]{0,1}(\d+)$/,
          // 	message:"请输入正整数"
          // }
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message:"请输入正确手机号"
          }
        ]
      },
      shopRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur',type:'string' }
        ],
        shopName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' },
        ],
        shopAddress: [
          { required: true, message: '请输入商户地址', trigger: 'blur' },
        ],
        shopTel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message:"请输入正确手机号"
          }
        ]
      },
    };
  },
  created() {
    // console.log($);
    // console.log("1111");
  },
  methods: {
    handleServiceAvatarScucess(res) {
      if (res) {
          this.user.shopImgUrl = res;
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
    doRegister(user) {
      if(this.user.type=="1"){
        this.$refs[user].validate(async (valid) => {
          if (valid) {
						this.$axios({
							method: "post",
							url: "/shiro/cust-do/register",
							data: {
                userName: this.user.userName,
                tel: this.user.tel,
                password: this.user.password,
                name: this.user.name
              },
						}).then(result => {
							if (result.status == 200) {
								this.user = {
                  type:'1',
                  userName: "",
                  tel: "",
                  name: "",
                  password: "",
                  shopName: "",
                  shopAddress: "",
                  shopTel: "",
                  shopImgUrl: "",  
                  searchBarList:[
                    {
                      code:'1',
                      name:'客户类型'
                    },
                    {
                      code:'2',
                      name:'商家类型'
                    }
                  ]
                };
								this.$message({
									showClose: true,
									message: "注册成功",
									type: "success",
									duration: "1600"
								});
                this.$router.push({ path: "/"});
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
        }else{
          let shop = {
            userName: this.user.userName,
            password: this.user.password,
            shopName: this.user.shopName,
            shopAddress: this.user.shopAddress,
            shopTel: this.user.shopTel,
            shopDesc: this.user.shopDesc,
            shopImgUrl:this.user.shopImgUrl
          }
          this.$refs[user].validate(async (valid) => {
          if (valid) {
						this.$axios({
							method: "post",
							url: "/shiro/shop-do/register",
							data: shop,
						}).then(result => {
							if (result.status == 200) {
								this.user = {
                  type:'1',
                  userName: "",
                  tel: "",
                  name: "",
                  password: "",
                  shopName: "",
                  shopAddress: "",
                  shopTel: "",
                  shopImgUrl: "",  
                  searchBarList:[
                    {
                      code:'1',
                      name:'客户类型'
                    },
                    {
                      code:'2',
                      name:'商家类型'
                    }
                  ]
                };
								this.$message({
									showClose: true,
									message: "注册成功",
									type: "success",
									duration: "1600"
								});
                this.$router.push({ path: "/"});
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
          // this.$axios.post("/shiro/shop-dto/register/", {
          //   userName: this.user.userName,
          //   password: this.user.password,
          //   tel: this.user.tel,
          //   name: this.user.name
          // })
          // .then(res => {
          //   console.log(res);
          //   if (res.data.code == '0') {
          //     this.$message.success("注册成功");
          //     this.$router.push({ name: "Home",shop:res.data.data});
          //   } else {
          //     alert(res.data.msg);
          //   }
            // console.log("输出response.data", res.data);
            // console.log("输出response.data.status", res.data.status);
            // if (res.data.status === 200) {
            //   this.$router.push({ path: "/" });
            // } else {
            //   alert("您输入的用户名已存在！");
            // }
          // });
        }
    }
      // this.$router.push({name:'HelloWorld',params:{currentUserName:'李朝柱'}});
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 1200px;
  /* background: url("../assets/images/bg1.png") no-repeat; */
  background-size: cover;
  overflow: hidden;
}
.login-wrap {
  /* background: url("../assets/images/login_bg.png") no-repeat; */
  background-size: cover;
  width: 400px;
  height: 1200px;
  margin: 5% auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 20px;
}
 
h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}

.avatar {
  width: 300px;
  height: 500px;
  display: block;
}
 
.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>