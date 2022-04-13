<template>
  <div class="hello">
    
<header class="head-li" style="height:60px;">
<div class="home_title">小李外卖平台</div>
      <div class="home_userinfoContainer">
        
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
        <div>
      <el-carousel class="li-carousel">
    <el-carousel-item v-for="(item, index) in itemList.slice(0,3)" :key="index" class="li-carousel-item">
      <img :src="baseImgUrl + item.itemImgUrl" style="height:100%;width:100%;" alt="图片丢失了" :title="item.itemId" />
    </el-carousel-item>
  </el-carousel>
    </div>
    <div id="card-div">
      <el-row>
        <div class="shop-title">
          人气店铺
        </div>
      </el-row>
      <el-row>
        <el-col :span="4" v-for="(item, index) in shopList.slice(0,5)" :key="index" :offset="index % 5 == 0 ? 0 : 1">
          <el-card :body-style="{ padding: '0px' }">
            <img v-if="item.shopImgUrl" :src="baseImgUrl + item.shopImgUrl" class="image">
            <div style="padding: 14px;">
              <span>{{item.shopName}}</span>
              <div class="bottom clearfix">
                <div class="time">{{ item.shopDesc}}</div>
                <el-button type="text" class="button" @click="goToShop(index)">进入店铺</el-button>
              </div>
            </div>
          </el-card>  
        </el-col>
      </el-row>
      <el-row>
        <el-button type="text" @click="goToMoreShop" class="button-more">更多店铺...</el-button>
      </el-row>
    </div>
    <div id="hot-div">
      <el-row>
        <div class="hot-title">
          热门商品
        </div>
      </el-row>
      <el-row>
        <el-col :span="4" v-for="(item, index) in itemList.slice(0,30)" :key="item.id" :offset="index % 5 == 0 ? 0 : 1">
          <el-card :body-style="{ padding: '0px' }" class="item-card">
            <img v-if="item.itemImgUrl" :src="baseImgUrl + item.itemImgUrl" class="image">
            <div style="padding: 14px;">
              <span>{{item.itemName}}</span>
              <div class="bottom clearfix">
                <div class="time">{{ item.shopDesc}}</div>
                <div class="price">￥{{ item.price}}</div>
                <el-button type="text" class="button" @click="goToShopItem(index)">进入店铺</el-button>
              </div>
            </div>
          </el-card>  
        </el-col>
      </el-row>
      <el-row>
        <el-button type="text" class="button-more" @click="goToHotItems">更多商品...</el-button>
      </el-row>
    </div>
      </el-row>
      <el-row class="carousel-div">
         <div class="end">
           小李外卖平台，欢迎您！
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
      currentUser:null
    }
  },
  created(){
    this.getHotItems();
    this.getHotShop();
  },
  methods:{
    getHotItems(){
      this.$axios({
        method: "POST",
        url: "/shiro/item-do/hotList",
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
    getHotShop(){
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
    goToHotItems(){
      this.$router.push({name:'Item'});
    },
    goToMoreShop(){
      this.$router.push({name:'Shop'});
    },
    goToShop(index){
      localStorage.setItem("shopName",this.shopList[index].shopName);
      localStorage.setItem("shopId",this.shopList[index].shopId);
      this.$router.push({name:'shopItem',params:{shop:this.shopList[index]}});
    },
    goToShopItem(index){
      const items = this.itemList;
      const shops = this.shopList.filter(function(shop){
        return shop.shopId == items[index].shopId;
      })
      localStorage.setItem("shopName",shops[0].shopName);
      localStorage.setItem("shopId",shops[0].shopId);
      this.$router.push({name:'shopItem',params:{shop:shops[0]}});
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
						location.reload();
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


</style>
