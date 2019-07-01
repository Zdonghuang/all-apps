<template>
  <div class="home">
    <div class="customer_text" >
        <div>
            <h3>应用场景</h3>
            <p>在企业场景中，越来越多的工作任务需要在移动设备上完成，用户需要快速的注册移动设备，移动设备在进入工作场地时需要快速安全切换到工作模式、访问数据，企业和用户都需要适应一种全新使用习惯：移动设备既是生产力工具，又是个人生活娱乐的载体。</p>
        </div>
    </div>
    <div class="customer_text" >
        <div>
            <h3>产品方案</h3>
            <!-- <img style="margin-bottom:20px;" src="/bigData.jpg" width="80%" height="80%"> -->
            <p>用户通过快速注册，30秒之内快速注册移动设备。手机/工卡合一，手机作为门卡，减少携带物品数量。刷手机门禁的时候，手机切换到工作模式（呈现特定的手机桌面、保密区禁用摄像头等等）。利用大数据平台分析各个时间段，公司App使用情况和移动设备电量之间的关系。分析工作效率，为办公App优化提供指导。</p>
        </div>
    </div>
    <div class="customer_text" >
        <div>
            <h3>产品特点</h3>
            <p>功能全面覆盖工作场景，整合微信、门禁、EMM、移动大数据平台。从全新的角度分析并提高办公场景中的移动设备使用体验。整个系统成本低，功能丰富，性能稳定。系统结构简单，安装，维护方便。由于采用了iLeapCloud.com云平台，省去了在本地部署，维护服务器硬件及操作系统软件的繁琐工作。云平台运行的应用可靠性高，可以在任何地点安全访问。iLeapCloud.com高效的应用框架也使得应用的开发，升级及维护变得异常轻松。</p>
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
  width: 100%;
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
