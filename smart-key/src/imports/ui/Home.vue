<template>
    <div>
        <!-- <div style="height:60px; background:#000"></div>
        <div class="banner_customer">
            <h2>智能钥匙管理系统</h2>
        </div> -->
        <div class="customer_text" >
            <div>
                <h3>应用场景</h3>
                <p>在一些有大量钥匙需要集中管理的重要部门和场所，如政府部门、军事机关、仓库、监狱、金融银行、交通运输、博物馆、公寓、办公场所等，对钥匙进行科学化的集中管理，能对所授权的钥匙进行严格的管理，并记录钥匙使用者的情况。</p>
            </div>
        </div>
        <div class="customer_text" >
            <div>
                <h3>产品方案</h3>
                <p>定制开发的智能钥匙柜，可以存储25~50把钥匙，多个钥匙柜可以级联扩展更多储存空间。钥匙柜内嵌指纹管理、RFID射频识别设备，可以对使用人以及钥匙进行精准管理。钥匙柜与数据中心进行通讯，可以满足管理人员的远程监控和参数配置。</p>
                <img src="../app3(1).jpeg" width="50%" height="100%" style="margin-bottom:10px;">
                <img src="../app3(2).jpeg" width="50%" height="100%">
            </div>
        </div>
        <div class="customer_text" >
            <div>
                <h3>产品特点</h3>
                <p>解决了人与物的管理问题，传统情况下钥匙由具体责任人单一管理，借出借入缺乏有效的管理。本系统排除了人为的客观因素，将使用权限、期限问题细化到人，并根据需求实时更改使用人的权限配置。指纹身份认证，实现人与物的无缝对接，确保钥匙操作安全。支持服务器平台、手机APP访问，远程控制、数据管理、一键开启等功能。配置应急报警开关，遇到紧急情况可触动开关，实现远程报警。</p>
                <p>整个系统结构简单，安装，维护方便。由于采用了iLeapCloud.com云平台，省去了在本地部署，维护服务器硬件及操作系统软件的繁琐工作。云平台运行的应用可靠性高，可以在任何地点安全访问。iLeapCloud.com高效的应用框架也使得应用的开发，升级及维护变得异常轻松。</p>
            </div>
        </div>
        <footer>
            <div>
                <span>如您对此方案有兴趣，请联系我们：</span>
                <span>电话 86-18519561618</span>
                <span>邮箱 leezinfo@lenovo.com</span>
            </div>
        </footer>
    </div>

</template>
<script>
export default {
    name:'clientCase2',
    mounted(){
        window.scrollTo(0,0);
    }
}
</script>

<style scoped>
    .img {
        margin: 0 auto;
        display: block;
    }
    /* 案例 */
.banner_customer {
  background-image: url(../banner2.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 200px;
}
.banner_customer h2 {
  width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
  font-size: 28px;
  color: #fff;
}
.customer_text {
  padding: 35px;
  color: #333;
}
.customer_text > div {
  width: 1200px;
  margin: 0 auto;
}
.customer_text h3 {
  border-left: 4px solid rgba(0, 114, 166, 1);
  padding-left: 10px;
  margin-bottom: 39px;
}
.customer_text p {
  line-height: 25px;
}
.customer_text > div img {
  display: block;
  margin: 0 auto;
}
.customer_text:nth-child(odd) {
  background: #f5f5f5;
}
.customer_text:nth-child(even) {
  background: #fff;
}
footer{
    background-color: #40B883;
    padding: 20px 0;
    color: #fff;
}
footer>div{
    width: 1200px;
    margin: 0 auto;
}
footer>div>span:not(:first-child){
    margin-left: 30px;
}
</style>
