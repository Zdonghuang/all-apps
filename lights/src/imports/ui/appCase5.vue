<template>
    <div class="home">
        <h2>某某区路灯智能监控</h2>
        <div class="light_content">
            <div class="light_box_map">
               <img :src="2>item.num?'/road_light_bad.png':'/road_light_normal.png'"  width="20" class="light" 
                    v-for="(item,index) in newlights" :key="index" :style="item.style" @click="showHint(item)">
            </div>
            <div class="light_msg">
                <div class="box_1">
                    <h2>状态信息</h2>
                    <div>
                        <ul class="list_info">
                            <li v-for="(item,index) in lights" :key="index">
                                <p>
                                    <span>状态:</span>
                                    <span :class="2>item.num?'green':'red'">{{2>item.num?'损坏':'正常'}}</span>
                                </p>
                                <p>
                                    <span>编号:</span>
                                    <span>{{item.code}}</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box_2">
                    <h2>建设路灯监控</h2>
                    <div>
                        <ul>
                            <li>
                                <h5>某某路路灯总数</h5>
                                <img src="/loop_1.png" alt="">
                                <span>{{RoadLights.length}}</span>
                            </li>
                            <li>
                                <h5>路灯正常数</h5>
                                <img src="/loop_2.png" alt="">
                                <span>{{badlights.length}}</span>
                            </li>
                            <li>
                                <h5>已坏路灯数</h5>
                                <img src="/loop_3.png" alt="">
                                <span>{{normallights.length}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box_3">
                    <h5>已坏路灯编号</h5>
                    <ul>
                        <li v-for="(item,index) in badlights" :key="index">编号:&nbsp; {{item.code}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="hint" v-for="(item,index) in lights" :key="index" :style="item.hintStyle" v-if="item.show">
            <img :src="2>item.num?'/light_box_bad.png':'/light_box_normal.png'" width="80px">
            <img :src="2>item.num?'/light_box1_bad.png':'/light_box_norma.png'" alt="" width="100">
            <div class="hint_info">
                <p>编号：<span>{{item.code}}</span></p>
                <p>状态：<span :class="2>item.num?'red':''">{{2>item.num?'损坏':"正常"}}</span></p>
            </div>
        </div>
        <div class="road">
            <img :src="item.img" alt="" v-for="(item,index) in road" :key="index" :style="item.style" v-if="item.show">
        </div>
    </div>
</template>
<script>
// 2盏灯 1盏灯提醒 2盏灯为好的 0盏为坏的
var data= [{code:'JSLA0021',style:"top:102px;left:28px;", num:2, hintStyle:'top: 194px;left: 69px;',show:false},
                    {code:'JSLA0022',style:"top: 80px;left: 95px;", num:1, hintStyle:'top: 173px;left: 137px;',show:false,road:'road3'},
                    {code:'JSLA0023',style:"top: 32px;left: 186px;", num:0,hintStyle:'top: 126px;left: 224px;',show:false,road:'road3'},
                    {code:'JSLA0024',style:"top: -1px;left: 229px;", num:1, hintStyle:'top: 91px;left: 270px;',show:false,road:'road3'},
                    {code:'JSLA0025',style:"top: 131px;left: 238px;", num:0,hintStyle:'top: 223px;left: 278px;',show:false,road:'road1'},
                    {code:'JSLA0026',style:"top: 165px;left: 140px;", num:2,hintStyle:'top: 259px;left: 181px;',show:false,road:'road2'},
                    {code:'JSLA0027',style:"top: 233px;left: 140px;", num:2,hintStyle:'top: 325px;left: 181px;',show:false,road:'road3'},
                    {code:'JSLA0028',style:"top: 196px;left: 242px;", num:1,hintStyle:'top: 287px;left: 281px;',show:false,road:'road1'},
                    {code:'JSLA0029',style:"top: 287px;left: 222px;", num:0,hintStyle:'top: 378px;left: 264px;',show:false,road:'road3'},
                    {code:'JSLA0030',style:"top: 391px;left: 245px;", num:0,hintStyle:'top: 482px;left: 285px;',show:false,road:'road3',},
                    {code:'JSLA0031',style:"top: 443px;left: 140px;", num:1,hintStyle:'top: 537px;left: 179px;',show:false,road:'road2'},
                    {code:'JSLA0032',style:"top: 545px;left: 27px;", num:2,hintStyle:'top: 639px;left: 69px;',show:false,road:'road2'},
                    {code:'JSLA0033',style:"top: 165px;left: 341px;", num:1,hintStyle:'top: 256px;left: 380px;',show:false,road:'road1'},
                    {code:'JSLA0034',style:"top: 165px;left: 438px;", num:0,hintStyle:'top: 256px;left: 480px;',show:false,road:'road1'},
                    {code:'JSLA0035',style:"top: 45px;left: 367px;", num:0,hintStyle:'top: 135px;left: 409px;',show:false,road:'road1'},
                    {code:'JSLA0036',style:"top: 18px;left: 487px;", num:1,hintStyle:'top: 113px;left: 525px;',show:false,road:'road2'},
                    {code:'JSLA0037',style:"top: 41px;left: 761px;", num:2,hintStyle:'top: 132px;left: 802px;',show:false,road:'road6'},
                    {code:'JSLA0038',style:"top: 223px;left: 367px;", num:2,hintStyle:'top: 316px; left: 408px;',show:false,road:'road1'},
                    {code:'JSLA0039',style:"top: 344px;left: 774px;", num:1,hintStyle:'top: 436px;left: 814px;',show:false,road:'road2'},
                    {code:'JSLA0040',style:"top: 465px;left: 774px;", num:1,hintStyle:'top: 558px;left: 815px;',show:false,road:'road6'},
                    {code:'JSLA0041',style:"top: 344px;left: 774px;", num:1,hintStyle:'top: 435px;left: 815px;',show:false,road:'road6'},
                    {code:'JSLA0042',style:"top: 344px;left: 627px;", num:2,hintStyle:'top: 436px;left: 663px;',show:false,road:'road2'},
                    {code:'JSLA0043',style:"top: 344px;left: 494px;", num:0,hintStyle:'top: 436px;left: 534px;',show:false,road:'road2'},
                    {code:'JSLA0044',style:"top: 450px;left: 455px;", num:2,hintStyle:'top: 543px; left: 496px;',show:false,road:'road3'},
                    {code:'JSLA0045',style:"top: 143px;left: 587px;", num:0,hintStyle:'top: 233px;left: 626px',show:false,road:'road2'},
                    {code:'JSLA0046',style:"top: 436px;left: 598px;", num:0,hintStyle:'top: 530px; left: 637px;',show:false,road:'road1'},
                    {code:'JSLA0047',style:"top: 162px;left: 702px;", num:1,hintStyle:'top: 257px;left: 740px;',show:false,road:'road2'},
                    {code:'JSLA0048',style:"top: 214px;left: 499px;", num:2,hintStyle:'top: 305px;left: 542px;',show:false,road:'road1'},
                    {code:'JSLA0049',style:"top: 519px;left: 702px;", num:0,hintStyle:'top: 610px;left: 742px;',show:false,road:'road3'},
                    {code:'JSLA0050',style:"top: 495px;left: 520px;", num:1,hintStyle:'top: 585px;left: 559px;',show:false,road:'road2'},
                    {code:'JSLA0051',style:"top: 195px;left: 798px;", num:2,hintStyle:'top: 290px;left: 835px;',show:false,road:'road6'},
                    {code:'JSLA0052',style:"top: 580px;left: 800px;", num:0,hintStyle:'top: 672px;left: 841px;',show:false,road:'road6'},
                    {code:'JSLA0053',style:"top: 582px;left: 682px;", num:1,hintStyle:'top: 676px;left: 720px;',show:false,road:'road4'},
                    {code:'JSLA0054',style:"top: 582px;left: 524px;", num:1,hintStyle:'top: 677px;left: 564px;',show:false,road:'road4'},
                    {code:'JSLA0055',style:"top: 534px;left: 377px;", num:0,hintStyle:'top: 626px;left: 417px;',show:false,road:'road4'},
                    {code:'JSLA0056',style:"top: 369px;left: 366px;", num:2,hintStyle:'top: 460px; left: 406px;',show:false,road:'road2'},
                    {code:'JSLA0057',style:"top: 573px;left: 265px;", num:2,hintStyle:'top: 665px;left: 306px;',show:false,road:'road4'},
                    {code:'JSLA0058',style:"top: 629px;left: 472px;", num:1,hintStyle:'top: 721px;left: 513px;',show:false,road:'road5'},
                    {code:'JSLA0059',style:"top: 608px;left: 347px;", num:0,hintStyle:'top: 701px;left: 386px;',show:false,road:'road3'},
                    {code:'JSLA0060',style:"top: 596px;left: 92px;", num:1,hintStyle:'top: 688px;left: 132px;',show:false,road:'road2'},
                    {code:'JSLA0061',style:"top: 664px;left: 213px;", num:0,hintStyle:'top: 753px;left: 257px;',show:false,road:'road4'},
                    {code:'JSLA0062',style:"top: 622px;left: 621px;", num:2,hintStyle:'top: 716px;left: 660px;',show:false,road:'road5'},
                    {code:'JSLA0063',style:"top: 4px;left: 627px;", num:1,hintStyle:'top: 96px;left: 666px;',show:false,road:'road1'},
                    {code:'JSLA0064',style:"top: 658px;left: 735px;", num:0,hintStyle:'top: 751px;left: 774px;',show:false,road:'road5'}];

export default {
    name:'appCase5',
    data(){
        return{
            lights:data,
            road:[{img:'/road_1.png',style:'top: 148px;left: 345px;width: 351px;',show:false,name:'road1'},
                  {img:'/road_2.png',style:'top: 519px;left: 27px;width: 882px;',show:false,name:'road2'},
                  {img:'/road_3.png',style:'top: 257px;left: 132px; width: 275px;',show:false,name:'road3'},
                  {img:'/road_4.png',style:'top: 691px;left: 256px;width: 654px;',show:false,name:'road4'},
                  {img:'/road_5.png',style:'top: 789px;left: 387px;width: 523px;',show:false,name:'road5'},
                  {img:'/road_6.png',style:'top: 149px;left: 798px;width: 46px;',show:false,name:'road6'}
            ],
            badlights:[],
            normallights:[],
            showIndex:-1,
            road2:[],
            road3:[],
            road4:[],
            road5:[],
            road6:[],
            road1:[],
            RoadLights:[],//正常的街道灯总数
            newlights:[] //实时变换的灯
        }
    },
    created(){
        
    },
    mounted(){
        this.newlights=this.lights;
        this.datachange();
        
    },
    methods:{
        datachange(){
            this.$nextTick(()=>{
                setInterval(()=>{
                    this.newlights=[];
                    this.road2=[];
                    this.road1=[];  
                    this.road4=[];  
                    this.road5=[];
                    this.road6=[];
                    this.road3=[];
                    this.showRoadLight()

                    for(var i =0; i<this.lights.length; i++){
                        var randomNum = Math.random()*2;
                        var dynum = Math.floor(randomNum);
                        if(this.lights[i].num==2){
                            this.lights[i].num-= dynum
                        }else{
                            this.lights[i].num += dynum
                        }
                        this.newlights.push(this.lights[i]);
                        //重新赋值
                        // if(this.lights[i].num<2)this.badlights.push(this.lights[i])
                        // if(this.lights[i].num==2)this.normallights.push(this.lights[i]);

                        //道路 
                        // if(this.lights[i].road=='road3')this.road2.push(this.lights[i])
                    }
                    //道路获取
                    for( index in this.newlights){
                        switch(this.newlights[index].road){
                            case 'road1':
                                this.road1.push(this.newlights[index]);
                                break;
                            case 'road2':
                                this.road2.push(this.newlights[index]);
                                break;
                            case 'road3':
                                this.road3.push(this.newlights[index]);
                                break;
                            case 'road4':
                                this.road4.push(this.newlights[index]);
                                break;
                            case 'road5':
                                this.road5.push(this.newlights[index]);
                                break;
                            case 'road6':
                                this.road6.push(this.newlights[index]);
                                break;
                            default:
                                break;
                        }
                    }
                },5000)
            })
        },
        showRoadLight(){
            var index = 0;
            this.$nextTick(()=>{  
            var timer=setInterval(()=>{   
                    // 变换的街道
                   index++ 
                   if(index>this.road.length-1)index=0
                   for(var i=0; i<this.road.length; i++){
                       this.road[i].show=false;
                       this.road[i].name
                   }
                    this.road[index].show=true;

                    //各个街道变换的灯
                    this.badlights=[];
                    this.normallights=[];
                    if(this.road[1].show==true){
                        this.RoadLights = this.road2;
                        for( indx in this.road2){
                            if(this.road2[indx].num<2){this.badlights.push(this.road2[indx])}
                            if(this.road2[indx].num==2)this.normallights.push(this.road2[indx]);
                        }
                    }else if(this.road[2].show==true){
                        this.RoadLights = this.road3;
                        for( indx in this.road3){
                            if(this.road3[indx].num<2){this.badlights.push(this.road3[indx])}
                            if(this.road3[indx].num==2)this.normallights.push(this.road3[indx]);
                        }
                    }else if(this.road[0].show==true){
                        this.RoadLights = this.road1;
                        for( indx in this.road1){
                            if(this.road1[indx].num<2){this.badlights.push(this.road1[indx])}
                            if(this.road1[indx].num==2)this.normallights.push(this.road1[indx]);
                        }
                    }else if(this.road[3].show==true){
                        this.RoadLights = this.road4;
                        for( indx in this.road4){
                            if(this.road4[indx].num<2){this.badlights.push(this.road4[indx])}
                            if(this.road4[indx].num==2)this.normallights.push(this.road4[indx]);
                        }
                    }else if(this.road[4].show==true){
                        this.RoadLights = this.road5;
                        for( indx in this.road5){
                            if(this.road5[indx].num<2){this.badlights.push(this.road5[indx])}
                            if(this.road5[indx].num==2)this.normallights.push(this.road5[indx]);
                        }
                    }else if(this.road[5].show==true){
                        this.RoadLights = this.road6;
                        for( indx in this.road6){
                            if(this.road6[indx].num<2){this.badlights.push(this.road6[indx])}
                            if(this.road6[indx].num==2)this.normallights.push(this.road6[indx]);
                        }
                    }
                },5000)
            }) 
        },
        showHint(item){
            item.show = true;
            setTimeout(()=>{
                item.show=false 
            },3000)
        }
    },
    watch:{
        'lights':function(val){
            console.log(val);
        }
    }
}
</script>
<style scoped>
    h2,h5{
        color:#029adb;
        font-weight: 500;
        text-align: center;
        margin: 0;
    }
    .home{
        width: 100%;
        height: 900px;
        background-image: url('/lightbg.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
    }
    .home>h2{
        text-align: center;
        padding: 50px 0;
        color:#029adb;
        font-weight: 500;
    }
    .light_content{
        overflow: hidden;
        width: 1480px;
        margin-left: 30px;
    }
    .light_box_map{
        float: left;
        width: 874px;
        height: 696px;
        background-image: url('/road_light_Map.png');
        background-size:cover;
        background-repeat: no-repeat;
        margin-right: 40px;
        margin-top: 20px;
        position: relative;
    }
    .light_box_map img{
        z-index: 33;
        cursor: pointer;
    }
    .light_msg{
        float: left;
    }
    .box_1>div{
        width: 552px;
        height: 258px;
        background-image: url('/Statusinformationbox.png');
        background-size: cover;
        overflow: hidden;
        overflow: hidden;
        overflow-y: scroll;
    }
    .list_info {
        padding: 10px;
        overflow: hidden;
    }
    .list_info li{
        list-style: none;
        color: #029adb;
        float: left;
        font-size: 12px;
        padding: 12px;
    }
    .list_info li p{
        margin: 0;
    }
    .box_1,.box_2{
        margin-bottom: 30px;
    }
    .box_2{
        position: relative;
        height: 210px;
        color: #029adb;
    }
    .box_2>div{
        background-image: url('/road_light_box_1hover.png');
        background-size: cover;
        width: 559px;
        height: 76px;
        overflow: hidden;
    }
    .box_2>div ul {
        margin-top: 25px;
        overflow: hidden;
        position: absolute;
        padding: 0;
        top: 30px;
        left: 27px;
    }
    .box_2>div ul li{
        position: relative;
        list-style: none;;
        float: left;
        margin-left:45px;
    }
    .box_2>div li img{
        width: 108px;
        height: 108px;
    }
    .box_2 li h5{
        margin-bottom: 10px;
    }
    .box_2 span{
        position: absolute;
        top: 69px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 20px;
        font-weight: 900;
    }
    .box_3{
        width: 558px;
        height: 136px;
        background-image: url('/road_light_box_2.png');
        background-size: cover;
        background-repeat: no-repeat;
        overflow: hidden;
        overflow-y: scroll;
    }
    .box_3 h5{
        margin-top: 10px;
    }
    .box_3 ul{
        overflow: hidden;
        padding:0 27px;
        margin: 0;
    }
    .box_3 ul li{
        padding: 8px;
        float: left;
        list-style: none;
        color: #029adb;
        font-size: 12px;
    }
    .light{
        position: absolute;
    }

    /* 提示框 */
    .hint{
        position: absolute;
        top:0;
        left: 0;
    }
    .hint>img:first-child{
        position: absolute;
        left: 0;
        top:14px;
    }
    .hint>img:nth-child(2){
        position: absolute;
        left: 90px;
        top:0;
    }
    .hint .hint_info{
        color: #fff;
        position: absolute;
        top: 12px;
        left: 101px;
        width: 81px;
        font-size: 11px;
        font-weight: 900;
    }
    .road {
        overflow: hidden;
    }
    .road img {
       position: absolute;
    }
    /* js类名 */
    .green{
        color: #06c72b;
        font-weight: 700;
    }
    .red {
        color: #b70905;
        font-weight: 700;
    }
</style>


