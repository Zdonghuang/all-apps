<template>
    <div class="home">
        <div>
            <div class="box">
                <h2>单位换算</h2>
                <div class="unit">
                    <p>选择:</p>
                    <el-input
                    placeholder="请输入内容"
                    v-model="unitValue"
                    clearable>
                    </el-input >
                    <el-select v-model="unit" placeholder="请选择">
                        <el-option
                        v-for="item in units"
                        :key="item.value"
                        :value="item.value">
                        </el-option>
                    </el-select> 
                    <p>转换成为：</p>
                    <div> 
                        <el-select v-model="unitChange" placeholder="请选择" class="unit_change">
                            <el-option
                            v-for="item in unitsChange"
                            :key="item.value"
                            :value="item.value">
                            </el-option>
                        </el-select> 
                        <el-button slot="append" @click="submit">确认</el-button>
                    </div>
                    <el-input
                    placeholder="换算结果为"
                    v-model="unitCValue"
                    clearable>
                    </el-input>
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
            unitValue:'',//用户选择输入值
            units: [{
                value: '码',
                }, {
                value: '弗隆',
                }, {
                value: '毫米',
                }, {
                value: '分',
                }, {
                value: '分米',
                },{
                value:'丈'
                },{
                    value:'微米'
                },{
                    value:'公里'
                },{
                    value:'英里'
                },{
                    value:'里'
                },{
                    value:'厘米'
                },{
                    value:'米'
                },{
                    value:'英寸'
                },{
                    value:'海里'
                },{
                    value:'寸'
                },{
                    value:'厘'
                },{
                    value:'英尺'
                },{
                    value:'尺'
                },{
                    value:'英寻'
            }],
            unit:'', 
            unitsChange: [{
                value: '码',
                }, {
                value: '弗隆',
                }, {
                value: '毫米',
                }, {
                value: '分',
                }, {
                value: '分米',
                },{
                value:'丈'
                },{
                    value:'微米'
                },{
                    value:'公里'
                },{
                    value:'英里'
                },{
                    value:'里'
                },{
                    value:'厘米'
                },{
                    value:'米'
                },{
                    value:'英寸'
                },{
                    value:'海里'
                },{
                    value:'寸'
                },{
                    value:'厘'
                },{
                    value:'英尺'
                },{
                    value:'尺'
                },{
                    value:'英寻'
            }],   //用户选择输入值单位
            unitChange:'',   //用户选择转换值单位
            unitCValue:''  //转换结果值
        }
    },
    mounted(){

    },
    methods:{
        submit(){
            let _this = this;
            let reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
            let obj = JSON.stringify({
                unit:this.unit,
                value:this.unitValue
            })
            if(!this.unit){
                this.$message({
                    message: '请输入您要转换单位及值',
                    type: 'warning'
                });
            }else if(!reg.test(this.unitValue)){
                this.$message({
                    message: '只能输入数字',
                    type: 'warning'
                });
            }else if(!this.unitChange){
                this.$message({
                    message: '请选择您要转换的单位',
                    type: 'warning'
                });
            }else{
                _this.$ajax.post('https://api.ileapcloud.com/tools/UnitC/long',obj).then((res)=>{
                    var changeValueList = res.data.result;
                    this.unitCValue = changeValueList[this.unitChange]+this.unitChange;
                })
            }

        }
    }
}
</script>
<style >
    .home{
        width: 100%;
        background-image:url('/static/bglz.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 900px;
        /* position: relative; */
    }
    .home>div{
        overflow: hidden;
        width: 100%;
        background: rgba(0,0,0,0.2);
        min-height: 900px;
    }
    .box>h2{
        text-align: center;
        color: #fff;
        font-weight: 500;
    }
    .box{
        width:1000px;
        margin:0 auto;
        border: 1px solid #444242;
        background: rgba(0,0,0,0.2);
        border-radius: 5px;
        height: 600px;
        padding: 30px 50px;
        overflow: hidden;
        margin-top: 50px;
    }
    .box>div{
        width: 300px;
        margin: 0 auto;
        color: #fff;
    }
    .unit .el-input{
        margin-bottom: 30px;
    }
    .unit .el-input--suffix{
        /* width: 200px; */
    }
    .unit_change .el-input__inner{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .unit_change .el-select, .unit_change .el-input__inner:focus{
        border-right-color: transparent;
    }
    .el-button{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-left: -5px;
        margin-top: -3px;
    }
    .btn_ok{
        display: block;
        margin-top: 50px;
        width: 390px;
        height: 30px;
        padding: 0
    }

    
</style>


