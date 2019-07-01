<template>
    <div class="device_content">
        <div class="content">
            <div class="device_table">
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>Model</th>
                            <th>checked</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in listdata" :key="index">
                            <td>{{item.name}}</td>
                            <td>{{item.model}}</td>
                            <td><input type="checkbox" v-model="checkedId" :value="item"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button @click="next">下一步</button>
        </div>
    </div>
</template>
<script>
export default {
    name:'scene',
    data(){
        return{
            listdata:[],
            checkedId:[],
        }
    },
    mounted(){
        this.showlist();   
    },
    methods:{
        showlist(){
            let _this = this;
            _this.$ajax.get('ciot/device/list',{headers:{'Authorization': localStorage.getItem("token")}}).then((res)=>{
                if(res.status == '200'){
                    this.listdata = res.data.result
                }
            })
        },
        next(){
            this.checkedId.filter((x,index)=>{
                localStorage.setItem('UUid'+(index+1),x.uuid)
            })
           this.$router.push('/scene')
        }
    }
}
</script>
<style scoped>
.device_content {
   background: #fafafa;
}
.content{
    width: 1200px;
    margin: 0 auto;
}

.device_table{
    width: 100%;
    background: #fff;
    padding: 20px 40px;
    margin: 4rem auto;
}
table{
    width: 100%;
    border-collapse: collapse;
}
table th, table td{
    padding: 10px;
}
th{
    text-align: inherit;
}
tbody tr:nth-child(odd){
    background: #f2f2f2;
}
tbody tr:hover{
    background: #e8e8e8;
}
.device_content button{
    float: right;
    width: 100px;
}
input[type="checkbox"] {
    cursor: pointer;
}
</style>


