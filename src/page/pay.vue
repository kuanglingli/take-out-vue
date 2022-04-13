<template>
    <div class="fillcontain">
        
        <p class="explain_text">支付成功</p>
        <el-button type="text" class="button-back" @click="goBack">返回首页</el-button>
    </div>
</template>

<script>
	
    export default {
    	methods:{
            goBack(){
                this.$router.push("/");
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>
