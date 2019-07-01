<template>
    <div class="home">
        <div class="menuNav">
            <div class="clearfloat">
                <span>菜谱大全</span>
                <input type="text" v-model="search" @keyup.enter="searchMenu">
                <div class="search" @click="searchMenu"></div>
            </div>
        </div>
        <div class="contents">
            <div v-for="(item,index) in recommend" :key="index" class="menuItem clearfloat" @click="detail(item.id)">
                <div>
                    <img :src="item.pic" alt="" onerror="this.src='../no.jpg'">
                </div>
                <div>
                    <p>{{item.name}}</p>
                    <p class="tag">{{item.tag}}</p>
                    <p class="time">{{item.cookingtime}}</p>
                    <p class="people">{{item.peoplenum}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'menus',
    data(){
        return{
            num:0,
            kindData:[],
            recommend:[],
            search:''
        }
    },
    watch:{
       recommend(curVal,oldVal){
// 　　　　　  console.log(curVal);
           curVal==undefined&&this.kind();
　　　　},
    },
    created(){

    },
    mounted(){
        if(this.$route.query.search){
            this.search=this.$route.query.search;
            this.searchMenu();
        }else{
            this.kind();
        }
    },
    methods:{
        kind(){ 
            let _this = this;
            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/cpfl?appId=02e15871-fea6-4602-b614-0b4d7e353d7b').then((res)=>{
                // console.log(res.data.result.result);
                if(res.status==200){
                    this.kindData=res.data.result.result;
                    let length=this.kindData.length;
                    this.num=this.RandomNumBoth(parseInt(this.kindData[0].classid),parseInt(this.kindData[length-1].classid)+this.kindData[length-1].list.length-10);
                    this.getkinds();
                }
            })            
        },
        getkinds(){
            let _this = this;
            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/cpfl_class?classid='+this.num+'&start=0&num=10&appId=02e15871-fea6-4602-b614-0b4d7e353d7b').then((res)=>{
                // console.log(res.data.result.result);
                if(res.status==200){
                   this.recommend=res.data.result.result.list;
                }
            })
        },
        detail(index){
            // console.log(index);
            this.$router.push({path:'/detail',query:{id:index}});
        },
        searchMenu(){
            // https://api.ileapcloud.com/jdapi/wxapi/query/cpdq?keyword=白菜&num=10
            if(this.search){
                let _this = this;
                _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/cpdq?keyword='+this.search+'&num=10&appId=02e15871-fea6-4602-b614-0b4d7e353d7b').then((res)=>{
                    console.log(res.data.result.result);
                    if(res.status==200){
                       this.recommend=res.data.result.result.list;
                    }
                })
            }else{
                this.$router.push('/');
                this.kind();
            }
        },
        // 随机数
        RandomNumBoth(Min,Max){
            var Range = Max - Min;
            var Rand = Math.random();
            var num = Min + Math.round(Rand * Range); //四舍五入
            return num;
        },
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        /* background-color:#EEECE9; */
        background-color:#FAE8C8;
        min-height: 100vh;
        position: relative;
    }
    .menuNav{
        /* background-color: #FFFAF7; */
        background-color: #A1000E;
        width: 100%;
    }
    .menuNav>div{
        width: 960px;
        margin: 0 auto;
        padding: 50px 0;
    }
    .menuNav span{
        /* color: #993300; */
        color: #fff;
        font-size: 26px;
        float: left;
        margin-left: 250px;
    }
    .menuNav input{
        border: 1px solid #EEECE9;
        outline: none;
        padding: 5px;
        margin-left: 30px;
        float: left;
    }
    .search{
        width: 100px;
        height: 34px;
        /* background: #930 url(../search.png) no-repeat center center; */
        background: #993300 url(../search.png) no-repeat center center;
        border-right: 1px solid #fff;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        background-size: 20px;
        float: left;
    }
    .contents{
        width: 960px;
        margin: 0 auto;
        padding: 20px 0 80px 0;
    }
    .contents>div:hover{
        cursor: pointer;
    }
    .menuItem{
        box-sizing: border-box;
        padding: 30px 60px;
        background-color: #fff;
        margin-top: 30px;
        border-radius: 5px;
    }
    .menuItem>div{
        float: left;
    }
    .menuItem>div:last-child{
        margin-left: 50px;
    }
    .menuItem>div:last-child>p:first-child{
        font-size: 22px;
        margin-top: 0;
    }
    .menuItem img{
        width:230px;
    }
    .tag{
        color: #666;
        font-size: 18px;
        width: 550px;
    }
    .time{
        font-size: 16px;
    }
    .people{
        font-size: 16px;
        margin-top: 25px;
    }
    /*清除浮动代码*/
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}

</style>


