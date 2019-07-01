<template>
    <div class="home">
        <div class="bgbox">
            <h2>企业查询</h2>
            <div class="search_box">
                <ul>
                    <li v-for="(item,index) in searchList" :key="index" @click="listShow(item.type,index)" 
                    :class="{this_show:index==thisIndex}">{{item.name}}</li>
                </ul>
                <div class="search">
                    <input type="text" placeholder="请输入企业名称，高管，产品等关键字" v-model="company"><button @click="search">查一查</button>
                </div>
            </div>
            <div class="box" v-loading="loading">
                <div class="text" v-if="showMsg">
                    <p>企业<span>查询</span></p>
                    <p>信息<span>显示 ...</span></p>
                </div>
                <!-- 公司信息显示 -->
                <div class="company_msg" v-else>
                    <div class="title_list">
                        <p>共找到 <span>{{datalist.length}}</span> 家符合条件的企业</p>
                    </div>
                   <div class="content" v-for="(item,index) in datalist" :key="index">
                       <h2>{{item.name}}</h2>
                       <div class="bread">
                           <p>
                               <span>企业法人: {{item.frname}}</span>
                               <span>注册资本: {{item.regcap+"万"+item.regcapcur}}</span>
                               <span>成立时间: {{item.esdate}}</span>
                               <span>企业注册号: {{item.regno}}</span>
                            </p>
                            <p>
                                <span>地址: {{item.dom}}</span>
                            </p>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'appCase4',
    data(){
        return{
           loading: false,
           showMsg:true,
           searchList:[{name:'全部',type:4},
                        {name:'企业名称',type:1},
                        {name:'法人/高管',type:2},
                        {name:'产品/品牌',type:3},
                        {name:'股东',type:5}],
            thisIndex:0 ,
            thisType:4,
            company:'',
            datalist:[]
        }
    },
    mounted(){
       
    },
    methods:{
        listShow(type,index){
            this.thisIndex = index;
            this.thisType = type;
        },
        search(){
            this.loading=true;

            let _this = this;
            if(this.company!=""){
                _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/entityQuery?kw='+this.company+'&type='+this.thisType+'&appId=4698aaf2-b491-4d86-8a8c-59efc79885aa').then((res)=>{
                    if(res.status == 200){
                        if(res.data.code == 10000){
                            if(res.data.result.code == 200){
                                this.loading=false;
                                this.showMsg=false;
                                this.datalist = res.data.result.data.rsData
                            }else if(res.data.result.code =='10040'){
                                this.$message({
                                    message:res.data.result.msg,
                                    type: 'warning'
                                });
                            }
                        }else{
                            this.$message({
                                message:"第三方API提示: " + res.data.msg,
                                type: 'warning'
                            });
                            this.loading=false;
                        }
                    }else if(res.status == 500){
                        this.$message({
                            message:"第三方接口超时",
                            type: 'warning'
                        });
                    }
                })
            }else{
                this.loading=false;
                this.$message({
                    message:"请填写此字段",
                    type: 'warning'
                });
            }
        }
    }
}
</script>
<style >
    .home{
        width: 100%;
        background-image:url('/static/img.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 900px;
        position: relative;
    }
    .bgbox{
        width: 100%;
        min-height: 900px;
        background-color: rgba(255, 255, 255, 0)
    }
    .bgbox>h2{
        text-align: center;
        color: #fff;
        font-weight: 500;
        padding: 50px 0;
        margin: 0;
        text-shadow: 4px 1px 6px #575555;
    }
    .box{
        width:800px;
        margin:0 auto;
        border: 1px solid #e4e3e3;;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
        max-height: 600px;
        overflow: hidden;
        overflow-y: scroll;
        margin-top: 50px;
    }
    .text{
        text-align: center;
    }
    .text p{
        font-size: 20px;
        color: #006bbd;
        display: inline-block;
        font-weight: 800;
    }
    .text p:nth-child(2){
        color: #e4af2f;
    }
    .text p span{
        color: #373434;
    }
    .search_box{
        overflow: hidden;
        color: #fff;
        width: 712px;
        margin: 0 auto;
    }
    .search_box ul {
        padding: 0;
        overflow: hidden;
        list-style: none;
        width: 80%;
        margin: 0 auto;
        padding-bottom: 10px
    }
    .search_box ul li{
        text-align: center;
        float: left;
        padding: 4px 10px;
        margin: 0 10px;
        cursor: pointer;
        position: relative;
    }
    
    .search input{
        width: 590px;
        outline: none;
        padding: 10px 0;
        padding-left: 10px;
        font-size: 14px;
        border: 1px solid #ddd;
    }
    .search button{
        background: #616DFF;
        font-size: 18px;
        color: white;
        padding: 5px 25px 5px;
        border: none;
        height: 40px;
        border-radius: 0px;
        outline: none;
        cursor: pointer;
    }
    .search button:hover{
        background: rgb(70, 82, 212);
    }
    .el-loading-mask{
        background-color: rgba(255,255,255,0.3);
    }
    .company_msg{
        color: #333;
    }

    .title_list ,.content{
        border-top: 1px solid #eaeef1; 
    }
    .title_list p{
        text-indent: 10px;
    }
    .title_list p>span{
        color: #b92929;
    }
    .content{
        padding: 0 10px;
    }
    .content h2{
        font-size: 20px;
    }
    .bread{
        color: #525151;
    }
    .bread p>span{
        margin-right: 10px;
    }

    /* 高亮 */
    .search_box ul li:hover, .this_show{
        border-radius: 4px;
        background: #fff;
        color: #333;
    }
    .search_box ul li:hover::before, .this_show::before{
        content: " ";
        width: 0;
        height: 0;
        border-width: 6px 6px 0px;
        border-style: solid;
        position: absolute;
        bottom: -6px;
        border-color: #fff transparent transparent;
        left: 50%;
        margin-left: -6px;
    }


</style>


