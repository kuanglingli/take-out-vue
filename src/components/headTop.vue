<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" menu-align='start'>
			<img src="../assets/user.png" class="avator">
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="home" v-if="this.getCurrentType()=='3'">商品首页</el-dropdown-item>
					<el-dropdown-item command="signout">退出</el-dropdown-item>
				</el-dropdown-menu>
			
		</el-dropdown>
    </div>
</template>

<script>

    export default {
    	data(){
    		return {
    			token: this.getToken()
    		}
    	},
    	created(){
    		
    	},
    	computed: {
    		
    	},
		methods: {
			handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/');
				}else if(command == 'signout'){
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
				}
			},
			getCurrentType(){
				return this.getUserType();
			},	
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
