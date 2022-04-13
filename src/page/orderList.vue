<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
			    :data="tableData"
			    
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
			    style="width: 100%">
			    <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单id">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
			          <el-form-item label="订单名称" >
			            <span>{{ props.row.orderName }}</span>
			          </el-form-item>
                <el-form-item label="制作时长" >
			            <span>{{ props.row.makeTime }} 分钟</span>
			          </el-form-item>
                <el-form-item label="配送联系人">
			            <span>{{ props.row.contact }}</span>
			          </el-form-item>
                <el-form-item label="配送电话">
			            <span>{{ props.row.delyTel }}</span>
			          </el-form-item>
			          <el-form-item label="收货地址">
			            <span>{{ props.row.address }}</span>
			          </el-form-item>
                <el-form-item label="店铺名称">
			            <span>{{ props.row.shopName }}</span>
			          </el-form-item>
			          <el-form-item label="店铺手机号">
			            <span>{{ props.row.shopTel }}</span>
			          </el-form-item>
			          <el-form-item label="店铺地址">
			            <span>{{ props.row.shopAddress }}</span>
			          </el-form-item>
                <el-form-item label="">
			            <span></span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="订单编号"
			      prop="orderId"
            align="center">
			    </el-table-column>
          <el-table-column
			      label="订单图片"
			      prop="imgList"
            align="center">
              <template scope="scope">
  　　　　        <img v-for="(item,index) in scope.row.imgList.slice(0,3)" v-bind:key="index" v-bind:src="baseImgUrl+item" width="40" height="40" class="head_pic"/>
  　　        </template>
			    </el-table-column>
			    <el-table-column
			      label="金额"
			      prop="totalFee"
            align="center">
			    </el-table-column>
			    <el-table-column
			      label="订单状态"
			      prop="orderStatusName"
            align="center"
            >
			    </el-table-column>
          <el-table-column
			      label="制作倒计时"
			      prop="doTime"
            align="center"
            >
            <template slot-scope="scope" v-if="scope.row.orderStatus=='2'">
                    {{ scope.row.doTime | jishi }}
                </template>
			    </el-table-column>
          <el-table-column
			      label="订单类型"
			      prop="orderTypeName"
            align="center">
			    </el-table-column>
          <el-table-column label="操作" width="160" align="center">
                  <template slot-scope="shopScope" >
                    <div v-if="getCurrentType()=='2'">
                      <el-button
                      size="small"
                      @click="handleEdit(shopScope.row,'2')" v-if="shopScope.row.orderStatus=='1'">接单</el-button>
                      <el-button
                      size="small"
                      @click="handleEdit(shopScope.row,'3')" v-if="shopScope.row.orderStatus=='2'">制作完成</el-button>
                      <el-button
                      size="small"
                      @click="handleEdit(shopScope.row,'5')" v-if="shopScope.row.orderStatus=='3'&&shopScope.row.orderType=='2'">配送</el-button>
                      
                      <el-button
                      size="small"
                      @click="handleEdit(shopScope.row,'6')" v-if="shopScope.row.orderStatus=='5'&&shopScope.row.orderType=='2'">配送完成</el-button>
                      <el-button
                      size="small"
                      @click="handleEdit(shopScope.row,'8')" v-if="shopScope.row.orderStatus=='7'">同意退单</el-button>
                      <el-button
                      size="small"
                      @click="handleEdit(shopScope.row,'6')" v-if="shopScope.row.orderStatus=='7'">拒绝退单</el-button>
                    </div>
                    
                  
                    <div v-if="getCurrentType()=='3'">
                        <el-button
                      size="small"
                      @click="handleEdit(shopScope.row,'6')" v-if="shopScope.row.orderStatus=='3'&&shopScope.row.orderType=='1'">取餐</el-button>
                      
                    <el-button
                      size="small"
                      @click="handleEditType(shopScope.row,'1')" v-if="(shopScope.row.orderStatus=='1'||shopScope.row.orderStatus=='2'||shopScope.row.orderStatus=='3')&&shopScope.row.orderType=='2'">到店自取</el-button>
                      
                      <el-button
                      size="small"
                      
                      @click="editTypeDialog(shopScope.row)" v-if="(shopScope.row.orderStatus=='1'||shopScope.row.orderStatus=='2'||shopScope.row.orderStatus=='3')&&shopScope.row.orderType=='1'">商家配送</el-button>
                      <el-button
                      size="small"
                      type="danger"
                      @click="handleEdit(shopScope.row,'7')" v-if="shopScope.row.orderStatus!='6'&&shopScope.row.orderStatus!='7'&&shopScope.row.orderStatus!='8'">取消</el-button>
                    </div>
                      
                    
                  </template>
                </el-table-column>
			</el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
        <el-dialog  title="配送地址选择" v-model="addressDialog">
                      <div class="checkout-title">
                        <span>配送地址</span>
                        </div>
                        <div class="addr-list-wrap">
                        <div class="addr-list">
                            <ul>
                                <li v-for="(item,index) in filterAddress " :key="index" :class="{'check':index==currenIndex}" @click="currenIndex = index">
                                    <dl>
                                        <dt >{{item.contact }}</dt>
                                        <dd class="address" > {{ item.address}}</dd>
                                        <dd class="tel" >{{ item.tel}}</dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>

                        <div slot="footer" class="dialog-footer">
                          <el-button @click="addressDialog = false">取 消</el-button>
                          <el-button type="primary" @click="handleEditType(currentOrder,'2')">确 定</el-button>
                        </div>
                        </div>
                    </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    // import {getOrderList, getOrderCount, getResturantDetail, getUserInfo, getAddressById} from '@/api/getData'
    export default {
        data(){
            return {
                baseImgUrl:"/shiro",
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                restaurant_id: null,
                expendRow: [],
                times:0,
                getCurrentTypeId:this.getCurrentType(),
                currenIndex:0,
                filterAddress:[],
                addressDialog:false,
                currentOrder:null
            }
        },
    	components: {
    		headTop,
    	},
      filters:{
        jishi(mistiming) {
          //也可以传截止的具体时间，改一下参数
          // var newtime = new Date() //获取当前时间
          // var storptime = new Date(storptimes) //获取截止时间
          // var mistiming = storptime.getTime() - newtime.getTime() //   获取截止时间距离现在的毫秒差
          if(mistiming>0){
          var days = Math.floor(mistiming / 1000 / 60 / 60 / 24); //获取天数
          var hours = Math.floor(mistiming / 1000 / 60 / 60 % 24); // 获取小时
          var minutes = Math.floor(mistiming / 1000 / 60 % 60); //获取分钟数
          var seconds = Math.floor(mistiming / 1000 % 60); //获取秒数

          // 判断天、时、分、秒是不是两位数，如果是直接输出，如果不是在前边加个0;
          days < 10 ? days = "0" + days : days;
          hours < 10 ? hours = "0" + hours : hours;
          minutes < 10 ? minutes = "0" + minutes : minutes;
          seconds < 10 ? seconds = "0" + seconds : seconds;

          // 第一种连接方法
          // var rels = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
          // 第二种连接方法
          var rels = `${days}天${hours}时${minutes}分${seconds}秒`}

          // 判断时间差是不是正数，就是截止时间是不是比现在的时间晚
          var mis = mistiming > 0 ? rels : "已超时"
          return mis
      }
      },
      watch:{
      $route(){
        //跳转到该页面后需要进行的操作
        this.getOrders();
      }
    },
      created(){
        this.getOrders();
        
        
      },
      mounted(){

      },
        methods: {
          editTypeDialog(row){
            this.currentOrder = row;
            this.$axios({
            method: "POST",
            url: "/shiro/address-do/list",
            headers: {
            token: this.getToken()
            }
          }).then(result => {
              console.log(result)
            if (result.status == 200) {
            const data = result.data;
            if (data.code === "0") {
              this.$message({
              showClose: true,
              message: data.msg,
              type: "success",
              duration: "1600"
              });
              this.filterAddress = data.data;
              this.addressDialog = true;
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
          handleEditType(row,type){
            let data =  {
                  id:row.id,
                  orderType:type,
                  totalFee:row.totalFee
                }
            if(type=='2'){
              data = {
                  id:row.id,
                  orderType:type,
                  totalFee:row.totalFee,
                  contact:this.filterAddress[this.currenIndex].contact,
                  delyTel:this.filterAddress[this.currenIndex].tel,
                  address:this.filterAddress[this.currenIndex].address
                }
            }
            console.log(data)
              this.$axios({
                method: "POST",
                url: "/shiro/order-do/updateType",
                data:data,
                headers: {
                  token: this.getToken()
                }
              }).then(result => {
                console.log(result)
                if (result.status == 200) {
                const data = result.data;
                
                if (data.code === "0") {
                  this.$message({
                  showClose: true,
                  message: data.msg,
                  type: "success",
                  duration: "1600"
                  });
                  this.addressDialog = false;
                  location.reload();
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
          handleEdit(row,orderStatus){
            this.$axios({
                method: "POST",
                url: "/shiro/order-do/update",
                data: {
                  id:row.id,
                  orderStatus:orderStatus
                },
                headers: {
                  token: this.getToken()
                }
              }).then(result => {
                console.log(result)
                if (result.status == 200) {
                const data = result.data;
                
                if (data.code === "0") {
                  let msgs = data.msg;
                  if(orderStatus == '8'){
                    msgs = "退款完成";
                  }
                  this.$message({
                  showClose: true,
                  message: msgs,
                  type: "success",
                  duration: "1600"
                  });
                  
                  location.reload();
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
          daojishi(row) {
            row.doTime = row.doTime - new Date().getTime();
            row.countDown = setInterval(() => {
              if(row.doTime>0){
                row.doTime = row.doTime - 1000;}
              else{
                  clearInterval(row.countDown)
                  }
            }, 1000);
          },
        // 清除所有定时器
        clearAll(list){
          list.forEach(el=>{
            clearInterval(el.countDown)
          })
   },
    //         async initData(){
    //             try{
    //                 const countData = await getOrderCount({restaurant_id: this.restaurant_id});
    //                 if (countData.status == 1) {
    //                     this.count = countData.count;
    //                 }else{
    //                     throw new Error('获取数据失败');
    //                 }
    //                 this.getOrders();
    //             }catch(err){
    //                 console.log('获取数据失败', err);
    //             }
    //         },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getOrders()
            },
            getOrders(){
              this.$axios({
                method: "POST",
                url: "/shiro/order-do/page",
                data: {
                  page: this.offset,
                  size: this.limit
                },
                headers: {
                  token: this.getToken()
                }
              }).then(result => {
                console.log(result)
                if (result.status == 200) {
                const data = result.data;
                
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
                  //给每一列生成一个时间戳
                  this.tableData.forEach(el=>{
                    
                    this.daojishi(el);//调用定时器
                  })
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
            getCurrentType(){
              return this.getUserType();
            },
    //         async expand(row, status){
    //         	if (status) {
    //         		const restaurant = await getResturantDetail(row.restaurant_id);
	//             	const userInfo = await getUserInfo(row.user_id);
	//             	const addressInfo = await getAddressById(row.address_id);

	//                 this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}});
    //                 this.$nextTick(() => {
    //                     this.expendRow.push(row.index);
    //                 })
	//             }else{
    //                 const index = this.expendRow.indexOf(row.index);
    //                 this.expendRow.splice(index, 1)
    //             }
    //         },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
  @import '../style/base2';
  @import '../style/checkout';
  @import '../style/modal';
    .table_container{
        padding: 20px;
    }
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

  .checkout-title{
      margin-top: 0px !important;
  }

  .addr-list-wrap{
    margin-bottom: 0px;
}

  .cart[data-v-8a24ae90] {
      padding: 0 0 54px 0;
  }
</style>
