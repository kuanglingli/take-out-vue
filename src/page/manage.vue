<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="$route.path" style="min-height: 100%;"
					theme="dark" router>
					<el-menu-item index="manage" class="mg-menu"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="userList" v-if="this.getCurrentType()=='1'">用户列表</el-menu-item>
						<el-menu-item index="shopList" v-if="this.getCurrentType()=='1'">商家列表</el-menu-item>
						<el-menu-item index="foodList" v-if="this.getCurrentType()!='3'">商品列表</el-menu-item>
						<el-menu-item index="orderList">订单列表</el-menu-item>
						<el-menu-item index="addressList" v-if="this.getCurrentType()=='3'">地址管理</el-menu-item>
						<!-- <el-menu-item index="adminList">管理员列表</el-menu-item> -->
					</el-submenu>
					<el-submenu index="3" v-if="this.getCurrentType()!='1'">
						<template slot="title" ><i class="el-icon-plus"></i>添加数据</template>
						<!-- <el-menu-item index="addShop">添加商铺</el-menu-item> -->
						<el-menu-item index="addGoods" v-if="this.getCurrentType()!='3'">添加商品</el-menu-item>
						<el-menu-item index="addAddress" v-if="this.getCurrentType()=='3'">添加地址</el-menu-item>
					</el-submenu>
					<!-- <el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>图表</template>
						<el-menu-item index="visitor">用户分布</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>编辑</template>
						<el-menu-item index="vueEdit">文本编辑</el-menu-item>
					</el-submenu> -->
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="passwordSet">修改密码</el-menu-item>
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
					</el-submenu>
					<!-- <el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu> -->
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		components: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
		methods: {
			getCurrentUser(){
				return this.getUserName();
			},
			getCurrentType(){
				return this.getUserType();
			},
		}
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
</style>