<template>
<div id="app-shopping">
    <div class="checkout-addr" style="margin-top:20px;">
        <div class="checkout-title">
            <span>配送方式</span>
        </div>
        <div class="shipping-method-wrap">
            <div class="shipping-method">
                <ul>
                    <li  :class="{'check': orderType == 1}" @click="setOrderType(1)">
                        <div class="name">到店自取</div>
                        <div class="price">0</div>
                    </li>
                    <li :class="{'check':orderType == 2}" @click="setOrderType(2)">
                        <div class="name">商家配送</div>
                        <div class="price">3</div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="orderType==2">
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

            <div class="shipping-addr-more">
                <!-- limitNum = addressList.length 这个方法和 @click="loadMore"是一样的
                这页面中 一律不要使用 this
                -->
                <a class="addr-more-btn up-down-btn" href="javascript:;"  @click="loadMore">
                    more
                    <i class="i-up-down">
                        <i class="i-up-down-l"></i>
                        <i class="i-up-down-r"></i>
                    </i>
                </a>
            </div>
        </div>

        <!-- shipping method-->
        
            </div>
        </div>
        <div class="container">
            <div class="cart">
                <div class="checkout-title">
                    <span>购物车</span>
                </div>

                <!--商品信息-->
                <div class="item-list-wrap">
                    <div class="cart-item">
                        <div class="cart-item-head">
                            <ul>
                                <li>商品信息</li>
                                <li>商品金额</li>
                                <li>商品数量</li>
                                <li>金额</li>
                                <!-- <li>编辑</li> -->
                            </ul>
                        </div>
                        <!--商品列表信息-->

                        <ul class="cart-item-list">
                            <li v-for="(item,index) in productList" :key="index"> <!--item of productList 这两个是一样的-->
                                <!--
                                这块的 index 是让自己知道
                                这块的index 是表示索引的值 和 js原声的 forEach(function(value,index){ }) 是一样的
                                jq的 $.each(function(index ,value ){ }) 和它们是相反的
                                -->
                                <div class="cart-tab-1">
                                    <div class="cart-item-check">
                                        <!--v-bind:class="" 里面一定是 一个对象或者是数组的形式
                                         v-bind:class="{ }"  v-bind:class="[ ]"
                                         -->
                                        <a href="javascript:;" class="item-check-btn" v-bind:class="{'check':item.checked} " @click="selectedProduct(item,index)">
                                            <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
                                        </a>
                                    </div>
                                    <!--图片-->
                                    <div class="cart-item-pic">
                                        <img  v-bind:src="baseImgUrl + item.itemImgUrl">
                                        <!--<img src="{{item.itemImgUrl}}" alt=""> 会在浏览器加载时 vue实例没有渲染完是，把它当作图片路径来加载-->
                                    </div>
                                    <!--图片后面的文字-->
                                    <div class="cart-item-title">
                                        <div class="item-name">
                                            {{ item.itemName + "--我是index的值"+index}}
                                        </div>
                                    </div>
                                    
                                </div>
                                <!--第二列-->
                                <div class="cart-tab-2">
                                    <!-- 过滤器的使用方法 | 加方法 -->
                                    <div class="item-price"> {{ item.price | formatMoney }}</div>
                                </div>
                                <!--第三列-->
                                <div class="cart-tab-3">
                                    <div class="item-quantity">
                                        <div class="select-self select-self-open">
                                             <div class="quentity">
                                                 <!-- 绑定事件 v-on：click 也可以 @click
                                                 调用方法的同时 我们需要把商品的对象传递过去 item
                                                  第二个参数 -1 减 1 加
                                                 -->
                                                 <a href="javascript:;" v-on:click=" changeMoney(item,-1)"> - </a>
                                                 <!--文本框 放入当前商品数量 v-model   -->
                                                 <input type="text" disabled v-model="item.shoppingCount">
                                                 <a href="javascript:; " @click=" changeMoney(item,1) "> + </a>
                                             </div>
                                        </div>
                                        <div class="item-stock"> 有货 </div>
                                    </div>
                                </div>
                                <!--第四列-->
                                <div class="cart-tab-4">
                                    <!-- 总金额是当前的单价乘以商品总数-->
                                    <div class="item-price-total">{{item.price*item.shoppingCount | formatMoney}}</div>

                                </div>
                                <!-- 第五列
                                <div class="cart-tab-5">
                                    <div class="cart-item-opration">
                                        <a href="javascript:;" class="item-edit-btn" @click="delConfirm(item)">
                                            <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                                        </a>
                                    </div>
                                </div> -->

                            </li>
                        </ul>
                    </div>
                </div>

                <!--footer-->
                <div class="cart-foot-wrap">
                    <!--footer 左边的-->
                    <div class="cart-foot-l">
                        <div class="item-all-check">
                            <a href="javascript:;">
                            <!--v-bind:class 的简写  :class-->
                            <span class="item-check-btn" :class="{'check': checkAllFlag}" @click="checkAll(true)">
                                <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
                            </span>
                            <span @click="checkAll(true)"> 全选 </span>
                            </a>
                        </div>
                        <div class="item-all-del">
                            <a href="javascript:;" @click="checkAll(false)"> 取消全选</a>
                        </div>
                    </div>
                    <!--footer 右边的-->
                    <div class="cart-foot-r">
                        <div class="item-total">
                            总价：<span class="total-price"> {{ totalMoney | formatMoney }}</span>
                        </div>
                        <div  class="next-btn-wrap">
                            <el-button type="text" class="btn btn--red" @click="pay()">支付</el-button>
                            <!-- <a href="address.html" class="btn btn--red" > 支付 </a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--模态框-->
        <div class="md-modal modal-msg md-modal-transtion " id="showModal" :class="{'md-show': delFlag}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="delFlag= false"> 关闭 </button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <p id="cusLanInfo" lan="Cart.Del.Confirm">你确认删除此订单信息吗?</p>
                    </div>
                    <div class="btn-wrap col-2">
                        <button class="btn btn--m" id="btnModalConfirm" @click=" delProduct()"> YES</button>
                        <button class="btn btn--m  btn--red" id="btnModalCancel" @click=" delFlag = false" > NO</button>
                    </div>
                </div>
            </div>
        </div>
        <!--遮罩层-->
        <div class="md-overlay" id="showOverLay" v-if=" delFlag"></div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data(){
      return {
        baseImgUrl:"/shiro",
        totalMoney:0,         // 总金额
        productList:[],       // 定义一个数组
        checkAllFlag:false,   // 定义是否全选
        curProduct:'',        // 保存删除的商品信息
        delFlag:false,         // 默认弹出框为false
        addressList:[],     // 定义新的数组
        limitNum: 3,        //定义当前显示的条数
        currenIndex:0,      //
        orderType:  1,
        deliveryFee:0
      }
  },
  filters:{ // 过滤器 对数据实现转换 可以定义全局的 也可以定义局部的 这个是局部的 只有vue的实例才可以使用
        formatMoney:function (value) { // 默认接收一个参数
            return "¥ " + parseFloat(value).toFixed(2) +" 元"; // 返回一个¥ 加上2位小数
        }
    },
    computed:{ // 数组过滤器
        filterAddress:function () {
            // slice() 返回一个全新的数组 和 之前的数组没有关系
            return this.addressList.slice(0,this.limitNum); //分隔数组前3个
        }
    },
    // 这个方法就相当于jq的ready()方法
    mounted:function () { //生命周期的一部分，在实例化创建完成后，需要查询某一个方法 需要定义一个mounted 方法
        this.cartView();
        this.checkAll(true);
        this.getAddressList();
    },
    methods:{   // 所有事件的绑定都会在 methods 中定义
    pay(){
        this.$axios({
            method: "POST",
            url: "/shiro/order-do/pay",
            data:{
                orderType:this.orderType,
                itemList:this.productList,
                address:this.addressList[this.currenIndex],
                totalMoney:this.totalMoney
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
                this.$router.push("/pay");
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
    getAddressList:function () {
            // var _this = this;
            // this.$http.get("data/address.json").then(function (response) {
            //     var res = response.data;
            //     if( res.status == 0){ // 先判断是否请求成功
            //         _this.addressList = res.result;
            //     }
            // });
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
              this.addressList=data.data;
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
        // 点击更多的方法
        loadMore:function () {
            this.limitNum = this.addressList.length;
        },
        // 点击设置为默认地址
        // setDefault:function (addressId) {
        //     var _this = this;
        //     _this.addressList.forEach(function (item,index) {
        //         if(item.addressId == addressId){
        //             item.isDefault = true;
        //         }else {
        //             item.isDefault = false;
        //         }
        //     })
        // },
        // cartView() 请求当前的商品的信息
        cartView:function () {
            // 通过this 来调用这个 http方法
            // 通过.then 方法来接受回调  res 就是我们最终拿到的结果
            // 这个也是可以传递参数的
            var _this = this;
            var res = {
                status:1,
                result:{
                    totalMoney:0,
                    list:[
                    // {
                    //     productId:"600100002115",
                    //     itemName:"黄鹤楼香烟",
                    //     price:19,
                    //     shoppingCount:1,
                    //     itemImgUrl:"../assets/goods-1.jpg",
                    //     parts:[
                    //     {
                    //         partsId:"10001",
                    //         partsName:"打火机"
                    //     },
                    //     {
                    //         partsId:"10002",
                    //         partsName:"吸管"
                    //     }
                    //     ]
                    // },
                    // {
                    //     productId:"600100002120",
                    //     itemName:"加多宝",
                    //     price:8,
                    //     shoppingCount:5,
                    //     itemImgUrl:"../assets/goods-2.jpg",
                    //     parts:[
                    //     {
                    //         partsId:"20001",
                    //         partsName:"吸管"
                    //     }
                    //     ]
                    // },
                    // {
                    //     productId:"600100002130",
                    //     itemName:"可口可乐",
                    //     price:10,
                    //     shoppingCount:3,
                    //     itemImgUrl:"../assets/goods-3.jpg",
                    //     parts:[
                    //     {
                    //         partsId:"20001",
                    //         partsName:"吸管"
                    //     }
                    //     ]
                    // },
                    // {
                    //     productId:"600100002140",
                    //     itemName:"中华香烟",
                    //     price:100,
                    //     shoppingCount:1,
                    //     itemImgUrl:"../assets/goods-4.jpg",
                    //     parts:[
                    //     {
                    //         partsId:"10001",
                    //         partsName:"打火机"
                    //     }
                    //     ]
                    // }
                    ]
                },
                message:""
                }
                res.result.list = this.$route.params.shoppingCar
                // res.result.totalMoney = 0;
                _this.productList = res.result.list; // 获取result.list 然后赋值给productList 数组
                _this.totalMoney = res.result.totalMoney;
            // this.$http.get("data/cartData.json",{"id":123}).then(function (res) {
            //     // 这块的 body里面是我们要用的数据 这是vue-resource 插件封装好的
            //     _this.productList = res.body.result.list; // 获取result.list 然后赋值给productList 数组
            //     _this.totalMoney = res.body.result.totalMoney;
            // })
            /**
            ES 6 语法
            let _this = this;
             this.$http.get("data/cartData.json",{"id":123}).then(res=>{ // 这块的=>就表示的是一个function { }里面就相当与函数体
                this.productList = res.body.result.list;  // 好处是 不用吧this 声明到外边来 里面的作用域和外面的作用域是一样的
                this.totalMoney = res.body.result.totalMoney;
             })
            * */
        },

        setOrderType(type){
            if(type==1){
                this.orderType = 1;
                this.deliveryFee = 0;
            }else{
                this.orderType = 2;
                this.deliveryFee = 3;
            }
            this.checkAll(true);
        },
        // 点击 加减 的方法
        changeMoney:function (product, way) {
            if( way >0 ){ //当 way>0 就是点击的 +
                product.shoppingCount++; // 数量增加  就相当于 item 的shoppingCount
            }else {
                product.shoppingCount--; // 否则数量减少
                if(product.shoppingCount <0 ){ //
                    product.shoppingCount =0;
                }
            }
            this.caleTotalPrice();
        },
        //如何让Vue 监听一个不存在的变量 单选操作
        selectedProduct:function (item,index) { // 接收的参数
            if( typeof item.checked == 'undefined'){ // 怎样判断一个对象的变量存不存在 看他的typeof == undedined
                /**
                 * 两种全局注册和局部注册  让vue 来监听
                 * 第一个参数 要添加的对象
                 * 第二个参数 添加的变量
                 * 第三个参数 添加的值是什么
                 * 意思是我们通过 Vue全局注册 往item变量中注册一个checked 属性 它的值是 true
                 *
                 * this.$set(item,"checked",true)  局部注册
                 */
                // Vue.set(item,"checked",true);
                this.productList[index].checked = true;
            }else {
                item.checked = !item.checked;
            }
            this.caleTotalPrice();
        },
        // 定义全选 函数
        checkAll:function (flag) {
            this.checkAllFlag = flag ;
            var _this = this;
            this.productList.forEach(function (item,index) { // 用forEach来遍历 productList
                if(typeof item.checked == 'undefined'){ // 先判断 是否有这个 item.checked
                    item.checked = true;
                    // Vue.set(item,"checked",_this.checkAllFlag);  // 没有 先注册
                }else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.caleTotalPrice();
        },
        // 计算选中商品的总价
        caleTotalPrice:function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item,index) {
               if(item.checked){
                   _this.totalMoney += item.price * item.shoppingCount;
                   _this.totalMoney += _this.deliveryFee;
               }
            });
        },
        // 点击删除 出现弹框
        delConfirm:function (item) {
            this.delFlag = true;
            this.curProduct = item; // 保存当前删除的对象
        },
        // 点击弹框里面的 ok 确认删除
        delProduct:function () {
            // 通过indexof 来搜索当前选中的商品 找到索引 index
            var index = this.productList.indexOf(this.curProduct);
            // 获取索引 后删除元素 splice(index，1) 两个参数  第一个参数索引 第二个参数 删除个数
            this.productList.splice(index ,1);// 从当前索引开始删，删除一个元素
            this.delFlag = false; // 删除后 弹框消失
        }
    }
}
</script>

<style lang="less" scoped>
@import '../style/base2';
@import '../style/checkout';
@import '../style/modal';

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