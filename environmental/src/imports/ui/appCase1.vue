<template>
  <div class="home">
    <div class="customer_text" >
        <div>
            <h3>应用场景</h3>
            <p>现代农业智能化包括了育种育苗、植物栽种管理、土壤及环境管理，农业科技设施等多个方面实施程序化和计算机软件的参与，农业的高科技电子智能控制设备，在我国农业战线基本是一个空白。而国外的产品价格极为昂贵，且并非安全适用。利用高科技技术，促进农业产量提高、品质提升、成本下降都有积极意义。</p>
            <p>智能农业气象站为农业领域推出的一款低成本、高性能远程环境采集监控系统。气象站专业用于采集空气中温度、湿度、风向、风速、日照强度、太阳辐射、降雨量、大气压力等气象参数。实现对林业、农业、园林等综合生态信息自动监控、对环境监控实行自动化控制和智能化管理。</p>
        </div>
    </div>
    <div class="customer_text" >
        <div>
            <h3>产品方案</h3>
            <img style="margin-bottom:20px;" src="/weather.jpg" width="80%" height="80%">
            <p>智能气象站由气象传感器、气象数据记录仪、电源系统、野外防护箱和不锈钢支架等部分构成。风速、风向、雨量、蒸发量、空气温度、空气湿度、太阳辐射等传感器为气象专用传感。传感器的性能直接决定智能气象站的整体运行的稳定性，所以选择具有高精度高可靠性的气象传感器至关重要。气象数据仪具有气象数据采集、气象数据定时存储、参数设定、和标准通讯传输功能。</p>
            <p>气象综合数据管理软件采用iLeapCloud.com平台，功能丰富、性能稳定，组态灵活，方便扩展与升级。通过对各站点的检测数据实时进行采集、显示、记录、数据存储、打印、报警等。也可以显示各站点检测数据的历史曲线及实时记录曲线。可以进行声光、短信报警等功能。</p>
        </div>
    </div>
    <div class="customer_text" >
        <div>
            <h3>产品特点</h3>
            <p>整个系统成本低，功能丰富，性能稳定。系统结构简单，安装，维护方便。由于采用了iLeapCloud.com云平台，省去了在本地部署，维护服务器硬件及操作系统软件的繁琐工作。云平台运行的应用可靠性高，可以在任何地点安全访问。iLeapCloud.com高效的应用框架也使得应用的开发，升级及维护变得异常轻松。</p>
        </div>
    </div>
    <div class="footer">
      <div>
        <span>如您对此方案有兴趣，请联系我们：</span>
        <span>电话 86-18519561618</span>
        <span>邮箱 leezinfo@lenovo.com</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.banner_customer h2 {
  width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
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
  font-size:1.4rem;
  font-weight: normal;
}
.customer_text p {
  font-weight: 300;
  line-height: 25px;
  font-size:15px;
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
.footer{
  background: #40b883;
  padding:20px;
  color: #fff;
  overflow: hidden;
}
.footer>div{
  width: 1200px;
  margin:0 auto;
}
.footer span:nth-child(1){
  font-size: 16px;
}
.footer span{
   float: left;
   margin-left: 20px;
   font-size: 14px;
   line-height: 30px;
}
</style>
