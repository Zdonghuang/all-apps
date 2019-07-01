<template>
  <div class="home">
    <div class="customer_text" >
        <div>
            <h3>应用场景</h3>
            <p>电梯厂商、维修公司和物业都希望能够及时预测和发现电梯可能出现的问题，当电梯出现问题能够及时抢修。电梯监控物联网APP通过与电梯控制器联机，汇集全部全部电梯运行数据，及时掌握电梯运行数据，实现电梯预防性维护。电梯物联网APP帮助电梯企业、电梯服务商、物业提供统一的监控平台，及时掌握电梯信息，提供预防性维护和运维管理一体化平台。国内外不同的电梯厂商，提供不同的通讯协议，相对管理和监控比较封闭，同时服务控制上也很能参与分享上述信息。基于联想大数据平台的解决方案，提供标准的数据分析管理解决方案。</p>
        </div>
    </div>
    <div class="customer_text" >
        <div>
            <h3>产品方案</h3>
            <!-- <img style="margin-bottom:20px;" src="/Internet.jpg" width="80%" height="80%"> -->
            <p>基于标准物联网通讯协议，实现电梯控制器与联想大数据平台互联互通。电梯厂商、维修公司和业主分别实时查看电梯运行情况，发现异常及时通知物业和维修公司。针对长期运行数据，通过LeapAI平台分析异常电梯数据，实现电梯预防性维护。</p>
            <p>通过与电梯控制器提供标准的接入接口，按照IoT标准协议链接到联想大数据平台，实现电梯远程监控和控制。</p>
            <p>技术架构基于联想大数据平台，使用HTML5技术实现前段APP，后端通过与电梯控制芯片HTTPS集成 。实现电梯监控、电梯事件管理、电梯主数据管理等。</p>
        </div>
    </div>
    <div class="customer_text" >
        <div>
            <h3>产品特点</h3>
            <p>通过电梯物联网链接实现设备信息实时话，极大提升设备维修乡音效率，提升电梯质量保证。APP使用AI和机器学习技术监控电梯和通过机器学习技术分析过去机器数据来做预防性维护。</p>
            <p>整个系统结构简单，安装，维护方便。由于采用了LeapAI.com云平台，省去了在本地部署，维护服务器硬件及操作系统软件的繁琐工作。云平台运行的应用可靠性高，可以在任何地点安全访问。LeapAI.com高效的应用框架也使得应用的开发，升级及维护变得异常轻松。</p>
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
</style>
