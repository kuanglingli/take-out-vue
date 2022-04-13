<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="user" :model="user" :rules="userRules"  status-icon label-width="80px">
          <h3>修改密码</h3>
          <hr>
            <el-form-item prop="oldPassword" label="密码">
              <el-input v-model="user.oldPassword" show-password placeholder="请输入原始密码"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="againPassword" label="密码确认">
              <el-input v-model="user.againPassword" show-password placeholder="再次输入密码"></el-input>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" icon @click="doUpdate('user')">提交</el-button>
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
      user: {
        oldPassword:"",
        password: "",
        againPassword:""
      },
      userRules: {
          oldPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur',type:'string' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur',type:'string' },
        ],
        againPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur',type:'string' },
          { validator: this.validatePass, trigger: "blur", required: true },
          // {
          // 	pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
          // 	message: '请输入正确额格式,可保留两位小数'
          // }
        ]
      }
    };
  },
  created() {
    // console.log($);
    // console.log("1111");
  },
  methods: {
      validatePass(rule, value, callback) {
      if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    doUpdate(user) {
      this.$refs[user].validate(async (valid) => {
          if (valid) {
            this.$axios({
                method: "post",
                url: "/shiro/user-do/updatePw",
                data: {
                oldPassword:this.user.oldPassword,
                password:this.user.password
                },
                headers: {
                    token: this.getToken()
                }
            }).then(result => {
                if (result.status == 200) {
                    this.user = {
                        oldPassword:"",
                        password: "",
                        againPassword:""
                    };
            this.$message({
                showClose: true,
                message: "更新成功",
                type: "success",
                duration: "1600"
            });
            this.$axios({
						method: "POST",
						url: "/shiro/sys/logout",
						data: {},
						headers: {
						token: this.getToken()
						}
					}).then(result => {
						if (result.status === 200) {
						const data = result.data;
						if (data.status === 200) {
							this.$message({
							showClose: true,
							message: data.msg,
							type: "success",
							duration: "1600"
							});
						} else {
							this.$message({
							showClose: true,
							message: data.msg,
							type: "error",
							duration: "3000"
							});
						}
						this.setToken("");
                        localStorage.removeItem("userName");
                        localStorage.removeItem("userType");
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
    }
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