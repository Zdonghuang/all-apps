<template>
    <div class="home">
        <div class="content">
            <h2>火车票查询</h2>
            <el-tabs type="border-card" @tab-click="handleClick">
                <el-tab-pane label="站站查询">
                    <div class="search-1">
                        <el-input v-model="tocity" placeholder="出发城市"></el-input>--
                        <el-input v-model="arrivecity" placeholder="到达城市"></el-input>
                    </div>
                    <el-checkbox v-model="gt" >是否高铁</el-checkbox>
                    <el-button type="primary" @click="searchStation" :disabled="cansearch">查询</el-button>
                </el-tab-pane>
                <el-tab-pane label="车次查询" class="search-2">
                    车次查询 
                    <el-input v-model="station" placeholder="请输入内容"></el-input>
                    <el-button type="primary" @click="searchNo" :disabled="cansearch2">查询</el-button>
                </el-tab-pane>
                <el-tab-pane label="余票查询">
                    <div class="search-1">
                        <el-input v-model="tocityTicket" placeholder="出发城市"></el-input>--
                        <el-input v-model="arrivecityTicket" placeholder="到达城市"></el-input>
                    </div>
                    <span>日期&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="dateVal"
                    type="date"
                    :picker-options="pickerOptions0"
                    placeholder="选择日期">
                    </el-date-picker>
                    <el-button type="primary"  @click="searchTicket" :disabled="cansearch3">查询</el-button>
                </el-tab-pane>
            </el-tabs>
            <div class="list-card">
                <div v-if="limit&&error&&noinfo">
                    <div class="info" v-if="infos.length<1">
                        <img src="/static/logo.png" alt="" width="100">
                        <img src="/static/font.png" width="400">
                    </div>
                    <div class="all" v-if="infos.length>0&&tabs==0">
                        <table>
                            <thead>
                                <tr>
                                    <th>车次</th>
                                    <th>类型</th>
                                    <th>出发站/到达站</th>
                                    <th>出发时间/到达时间</th>
                                    <th>用时</th>
                                    <th>票价</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in infos" :key="index">
                                    <td class="bold">{{item.trainno}}</td>
                                    <td class="top">{{item.type}}</td>
                                    <td class="station">
                                        <p><span>始</span>{{item.station}}</p>
                                        <p><span>终</span>{{item.endstation}}</p>
                                    </td>
                                    <td class="time">
                                        <p>{{item.departuretime}}</p>
                                        <p>{{item.arrivaltime}}</p>
                                    </td>
                                    <td>{{item.costtime}}</td>
                                    <td>
                                      <p v-show='item.pricesw'>商务票：{{item.pricesw}}</p>  
                                      <p v-show='item.pricetd'>特等座：{{item.pricetd}}</p>  
                                      <p v-show='item.pricegr1'>高级软卧上：{{item.pricegr1}}</p>  
                                      <p v-show='item.pricegr2'>高级软卧下：{{item.pricegr2}}</p>  
                                      <p v-show='item.pricerw1'>软卧上：{{item.pricerw1}}</p>  
                                      <p v-show='item.pricerw2'>软卧下：{{item.pricerw2}}</p>  
                                      <p v-show='item.priceyw1'>硬卧上：{{item.priceyw1}}</p>  
                                      <p v-show='item.priceyw2'>硬卧中：{{item.priceyw2}}</p>  
                                      <p v-show='item.priceyw3'>硬卧下：{{item.priceyw3}}</p>  
                                      <p v-show='item.priceyd'>一等座：{{item.priceyd}}</p>  
                                      <p v-show='item.priceed'>二等座：{{item.priceed}}</p>  
                                      <p v-show='item.pricerz'>软座：{{item.pricerz}}</p>  
                                      <p v-show='item.priceyz'>硬座：{{item.priceyz}}</p>  
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="all" v-if="infos.length>0&&tabs==1">
                        <table>
                            <thead>
                                <tr>
                                    <th>站次</th>
                                    <th>站名</th>
                                    <th>到达时间</th>
                                    <th>停留时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in infos" :key="index">
                                    <td class="bold">{{item.sequenceno}}</td>
                                    <td class="top">{{item.station}}</td>
                                    <td>{{item.arrivaltime}}</td>
                                    <td>{{item.stoptime}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="all" v-if="infos.length>0&&tabs==2">
                        <table>
                            <thead>
                                <tr>
                                    <th>车次</th>
                                    <th>类型</th>
                                    <th>出发站/到达站</th>
                                    <th>出发时间/到达时间</th>
                                    <th>用时</th>
                                    <th>余票</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in infos" :key="index">
                                    <td class="bold">{{item.trainno}}</td>
                                    <td class="top">{{item.type}}</td>
                                    <td class="station ss">
                                        <p><span>始</span>{{item.station}}</p>
                                        <p><span>终</span>{{item.endstation}}</p>
                                    </td>
                                    <td class="time">
                                        <p>{{item.starttime}}</p>
                                        <p>{{item.endtime}}</p>
                                    </td>
                                    <td>{{item.costtime}}</td>
                                    <td>
                                      <p v-show='item.sw!="--"'>商务票：{{item.sw}}</p>  
                                      <p v-show='item.td!="--"'>特等座：{{item.td}}</p>  
                                      <p v-show='item.gr!="--"'>高级软卧：{{item.gr}}</p>  
                                      <p v-show='item.rw!="--"'>软卧：{{item.rw}}</p>  
                                      <p v-show='item.yw!="--"'>硬卧：{{item.yw}}</p>  
                                      <p v-show='item.yd!="--"'>一等座：{{item.yd}}</p>  
                                      <p v-show='item.ed!="--"'>二等座：{{item.ed}}</p>  
                                      <p v-show='item.rz!="--"'>软座：{{item.rz}}</p>  
                                      <p v-show='item.yz!="--"'>硬座：{{item.yz}}</p>  
                                      <p v-show='item.wz!="--"'>无座：{{item.wz}}</p>  
                                      <p v-show='item.qt!="--"'>其他：{{item.qt}}</p>  
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="info" v-if="!limit">
                    <img src="/static/logo.png" alt="" width="100">
                    <img src="/static/limit.png" width="400">
                </div>
                <div class="info" v-if="!error">
                    <img src="/static/logo.png" alt="" width="100">
                    <img src="/static/three.png" width="400">
                </div>
                <div class="info" v-if="!noinfo">
                    <img src="/static/logo.png" alt="" width="100">
                    <img src="/static/no.png" width="400">
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
            tocity:'',
            arrivecity:'',
            tocityTicket:'',
            arrivecityTicket:'',
            gt:false,
            dateVal:'',
            station:'',
            limit:true,
            error:true,
            noinfo:true,
            infos:[],
            cansearch:true,
            cansearch2:true,
            cansearch3:true,
            tabs:0,
            pickerOptions0: { 
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
                }
            }
        }
    },
    watch:{
        tocity(){
　　　　　　(this.tocity&&this.arrivecity)?this.cansearch=false:this.cansearch=true;
　　　　},
        arrivecity(){
　　　　　　(this.tocity&&this.arrivecity)?this.cansearch=false:this.cansearch=true;
　　　　},
        station(){
            this.station?this.cansearch2=false:this.cansearch2=true;
        },
        tocityTicket(){
            (this.tocityTicket&&this.arrivecityTicket&&this.dateVal)?this.cansearch3=false:this.cansearch3=true;
        },
        arrivecityTicket(){
            (this.tocityTicket&&this.arrivecityTicket&&this.dateVal)?this.cansearch3=false:this.cansearch3=true;
        },
        dateVal(){
            (this.tocityTicket&&this.arrivecityTicket&&this.dateVal)?this.cansearch3=false:this.cansearch3=true;
        }
    },
    mounted(){
       
    },
    methods:{
        searchStation(){
            var gtval = 0;
            (this.gt == false)?(gtval=0):(gtval=1);
            this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/train_station2s?start='+this.tocity+'&end='+this.arrivecity+'&ishigh='+gtval+'&appId=0be3e9ce-c440-4518-b5dd-3ad2d113f01e').then((res)=>{
            //    console.log(res);
               if(res.status==200){
                    if(res.data.code!='10000'){
                        this.error=false;
                        this.limit=true;
                        this.noinfo=true;
                    }else{
                        this.error=true;
                        if(res.data.result.status=='104'){
                            this.limit=false;
                            this.noinfo=true;
                        }else if(res.data.result.status=='203'||res.data.result.status=='202'){
                            this.noinfo=false;
                            this.limit=true;
                        }else{
                            this.limit=true;
                            this.noinfo=true;
                            // 成功
                            this.infos=res.data.result.result;
                        }
                    }
                }
            })
        },
        searchNo(){
            this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/train_line?trainno='+this.station+'&appId=0be3e9ce-c440-4518-b5dd-3ad2d113f01e').then((res)=>{
            //    console.log(res);
               if(res.status==200){
                    if(res.data.code!='10000'){
                        this.error=false;
                        this.limit=true;
                        this.noinfo=true;
                    }else{
                        this.error=true;
                        if(res.data.result.status=='104'){
                            this.limit=false;
                            this.noinfo=true;
                        }else if(res.data.result.status=='203'||res.data.result.status=='202'){
                            this.noinfo=false;
                            this.limit=true;
                        }else{
                            this.limit=true;
                            this.noinfo=true;
                            // 成功
                            this.infos=res.data.result.result.list;
                        }
                    }
                }
            }) 
        },
        searchTicket(){
            // console.log(this.dateVal);
            this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/train_ticket?start='+this.tocityTicket+'&end='+this.arrivecityTicket+'&date='+this.dateVal+'&appId=0be3e9ce-c440-4518-b5dd-3ad2d113f01e').then((res)=>{
            //    console.log(res);
               if(res.status==200){
                    if(res.data.code!='10000'){
                        this.error=false;
                        this.limit=true;
                        this.noinfo=true;
                    }else{
                        this.error=true;
                        if(res.data.result.status=='104'){
                            this.limit=false;
                            this.noinfo=true;
                        }else if(res.data.result.status=='203'||res.data.result.status=='202'){
                            this.noinfo=false;
                            this.limit=true;
                        }else{
                            this.limit=true;
                            this.noinfo=true;
                            // 成功
                            this.infos=res.data.result.result;
                        }
                    }
                }
            })
        },
        handleClick(tab) {
            this.tabs=tab.index;
            // 切换tab重置数据
            this.infos=[];
            this.noinfo=true;
            this.limit=true;
            this.error=true;
            this.tocity='';
            this.arrivecity='';
            this.tocityTicket='';
            this.arrivecityTicket='';
            this.gt=false;
            this.dateVal='';
            this.station='';
            // console.log(tab.index);
        }
    }
}
</script>
<style >
    .home{
        width: 100%;
        min-width: 1300px;
        min-height: 900px;
        position: relative;
        background: #000;
        background-image: url('/static/headbg.jpeg');
        background-size: cover;
    }
    .home h2{
        font-size: 24px;
        color: #fff;
        text-align: center;
        padding: 2rem 0;
        margin: 0;
    }
    .content{
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 80px;
    }
    .search-1{
        overflow: hidden;
        float: left;
        margin-right: 2rem;
    }
    .search-1 .el-input{
        width: 180px;
    }
    .search-1 .el-input:first-child{
        margin-right: 12px;
    }
    .search-1 .el-input:last-child{
        margin-left: 10px;
    }
    .el-checkbox{
        margin-top: 10px;
    }
    .search-2 .el-input{
        margin-left: 15px;
        width: 250px;
    }
    .el-button{
        margin-left: 20px;
    }
    .list-card{
        margin-top: 3rem;
        background: #fff;
        border: 1px solid #dcdfe6;
        padding: 50px 0;
    }
    .info{
        width: 515px; 
        margin: 0 auto;
        padding: 30px 0;
    }
    .info img:last-child{
      margin-bottom: 25px;
      margin-left: 10px;
    }
    .all{
        width: 900px;
        margin: 0 auto;
    }
    table{
        width: 100%;
    }
    thead>tr>th{
        padding-bottom: 15px;
    }
    td{
        text-align: center;
        padding:10px 5px;
    }
    .bold{
        font-weight: bold;
    }
    .top{
        position: relative;
        top: -2px;
    }
    .station{
        text-align: left;
    }
    .station>p{
        position: relative;
        left: 28px;
    }
    .ss>p{
        position: relative;
        left: 47px;
    }
    .station>p>span{
        text-align: center;
        display: inline-block;
        width: 20px;
        height: 20px;
        background-color: #609D5A;
        color: #fff;
        margin-right: 10px;
    }
    .station>p:last-child>span{
        background-color: #F10B0B;
    }
    .time>p{
        font-size: 20px;
    }
    .time>p:last-child{
        font-size: 17px;
        color: #999;
    }
</style>


