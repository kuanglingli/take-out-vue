<template>
  <div class="hello">
    
<header class="head-li" style="height:60px;">
  
<div class="home_title">小李外卖平台</div>
<el-button type="text" class="button-back" @click="goBack">返回首页</el-button>
      <div class="home_userinfoContainer">
        <el-dropdown v-if="this.getCurrentUser()" style="margin-right:15px; font-size:25px;">
          <span class="el-dropdown-link home_userinfo" @click="goToPay" v-if="this.shoppingCar.length>0">
            结算
          </span>
        </el-dropdown>
        <el-dropdown v-if="!this.getCurrentUser()">
          <span class="el-dropdown-link home_userinfo" @click="login">
            登录
          </span>
          <span class="el-dropdown-link home_userinfo" @click="register">
            注册
          </span>
        </el-dropdown>
        
        <el-dropdown @command="handleCommand" v-if="this.getCurrentUser()">
          
  <span class="el-dropdown-link home_userinfo">
    {{this.getCurrentUser()}}
    <i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="MyHome">个人中心</el-dropdown-item>
            <el-dropdown-item command="MyArticle">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
</header>
      <el-row class="carousel-div">
    <div id="hot-div">
      <el-row>
        <div class="hot-title" v-if="!this.getCurrentShopName()">
          热门商品
        </div>
        <div class="hot-title" v-if="this.getCurrentShopName()">
          {{this.getCurrentShopName()}},欢迎您！
        </div>
      </el-row>
      <el-row>
        <el-col :span="4" v-for="(item, index) in itemList" :key="item.id" :offset="index % 5 == 0 ? 0 : 1">
          <el-card :body-style="{ padding: '0px' }" class="item-card">
            <img v-if="item.itemImgUrl" :src="baseImgUrl + item.itemImgUrl" class="image">
            <div style="padding: 14px;">
              <span>{{item.itemName}}</span>
              <div class="bottom clearfix">
                <div class="time">{{ item.shopDesc}}</div>
                <div class="price">￥{{ item.price}}</div>
                <div class="item-quantity">
                  <div class="select-self select-self-open">
                        <div class="quentity">
                            <!-- 绑定事件 v-on：click 也可以 @click
                            调用方法的同时 我们需要把商品的对象传递过去 item
                            第二个参数 -1 减 1 加
                            -->
                            <a href="javascript:;" v-on:click="reduceShoppingCar(item)"> - </a>
                            <!--文本框 放入当前商品数量 v-model   -->
                            <input type="text" disabled v-model="item.shoppingCount">
                            <a href="javascript:; " @click=" addShoppingCar(item) "> + </a>
                        </div>
                  </div>
                  
              </div>
                <!-- <el-button type="text" class="button" @click="addShoppingCar(index)">加入购物车</el-button> -->
              </div>
            </div>
          </el-card>  
        </el-col>
      </el-row>
    </div>
      </el-row>
      
    <div class="tit-ui">
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      baseImgUrl:"/shiro",
      imgList:[
      ],
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["large"],
      currentDate: new Date(),
      shopList:[
      ],
      itemList:[
      ],
      currentUser:null,
      shoppingCar:[],
    }
  },
  mounted(){

  },
  created(){
    this.goToHotItems();
  },
  methods:{
    getCurrentShopName(){
      return localStorage.getItem("shopName");
    },
    getCurrentShopId(){
      return localStorage.getItem("shopId");
    },
    goToHotItems(){
      // console.log(this.$route.params.shop.shopId)
      let data = {
        shopId:''
      };
      if(this.getCurrentShopId()){
        data.shopId = this.getCurrentShopId();
      }
      this.$axios({
        method: "POST",
        url: "/shiro/item-do/hotList",
        data:data,
        headers: {
          
        }
      }).then(result => {
        
        if (result.status == 200) {
          const data = result.data;
        if (data.code === "0") {
          if(data.data){
            this.itemList=data.data;
          }
        } else {
          this.$message({
          showClose: true,
          message: data.msg,
          type: "error",
          duration: "3000"
          });
        }
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
    goToHotShop(){
      this.$axios({
        method: "POST",
        url: "/shiro/shop-do/hotList",
        headers: {
          
        }
      }).then(result => {
        if (result.status == 200) {
        const data = result.data;
        if (data.code === "0") {
          if(data.data){
            this.shopList=data.data;
          }
        } else {
          this.$message({
          showClose: true,
          message: data.msg,
          type: "error",
          duration: "3000"
          });
        }
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
    getCurrentUser(){
      return this.getUserName();
    },
    getCurrentType(){
      return this.getUserType();
    },
    login(){
      this.$router.push("Login");
    },
    register(){
      this.$router.push("Register");
    },
    goToPay(){
      this.$router.push({name:'shoppingCart',params:{shoppingCar:this.shoppingCar}});
    },
    addShoppingCar(item){
      if(!this.getToken()){
        this.$message({
            showClose: true,
            message: "请先登录",
            type: "error",
            duration: "3000"
        });
        this.$router.push({ path: "/" });
      }
      // const item = this.itemList[index];
      // item.shoppingCount = 1;
      // console.log(item.id)
      item.shoppingCount++;
      let flag = false;
      
      if(this.shoppingCar.length<=0){
        this.shoppingCar.push(item);
        return true;
      }
      for (let i = 0; i < this.shoppingCar.length; i++) {
        const element = this.shoppingCar[i];
        if(element.id==item.id){
          flag = true;
          let count = item.shoppingCount;
          this.$set(this.shoppingCar,i,{
            ...this.shoppingCar[i],
            shoppingCount:count
          });
        }
        
      }
      if(!flag){
        this.shoppingCar.push(item);
      }
      // console.log(this.shoppingCar)
    },
    reduceShoppingCar(item){
      if(item.shoppingCount<=0){
        return true;
      }
      item.shoppingCount--;
      let flag = false;
      
      for (let i = 0; i < this.shoppingCar.length; i++) {
        const element = this.shoppingCar[i];
        if(element.id==item.id){
          flag = true;
          let count = item.shoppingCount;
          if(count==0){
            this.shoppingCar.splice(i,1);
          }else{
            this.$set(this.shoppingCar,i,{
              ...this.shoppingCar[i],
              shoppingCount:count
            });
          }
          
        }
        
      }
      // if(!flag){
      //   this.shoppingCar.push(item);
      // }
      // console.log(this.shoppingCar)
    },
    handleCommand(command) {
      if (command == 'logout') {
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
						this.$router.push({ path: "/" });
						} else {
						this.$message({
							showClose: true,
							message: "操作失败，请联系管理员",
							type: "error",
							duration: "3000"
						});
          }
        });
      }else if(command == 'MyArticle'){
        this.$router.push("updatePassword");
      }else if(command == 'MyHome'){
        this.$router.push("manage");
      }
    },
    goBack(){
      this.$router.push("/");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.home_title {
  color: #fff;
  font-size: 22px;
  display: inline-block;
  margin-left: 10px;
}

.home_userinfo {
  color: #fff;
  cursor: pointer;
}

.home_userinfoContainer {
  display: inline-block;
  margin-right: 20px;
}
.head-li {
  background-color: #20a0ff;
  color: #333;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.carousel-div {
  background-color: blanchedalmond;
}

.el-main {
  padding: 0% !important;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 314.5px;
  height: 315px;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.hot-title{
  font-size: 35px;
  margin-bottom: 10px;
}

.shop-title{
  font-size: 35px;
  margin-bottom: 10px;
  margin-top: 20px;
}

.button-more{
  font-size: 20px;
}

.button-back{
  font-size: 20px;
  color: white;
  margin-right: 5px;
}

.time{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
  font-size: 90%;
}

.item-card{
  margin-bottom: 15px;
}
.price{
  margin-top: 3px;
  color: red;
}

.end{
  color: lightslategrey;
  font-size: 30px;

}

.li-carousel{
  height: 600px !important;
  width: 80%;
  margin-left: 10%;
  margin-top: 10px;
}

.li-carousel-item{
  height: 600px !important;
  width: 100%;
}

.item-quantity{
  margin-top: 10px;
  font-size: 20px;
}

</style>
