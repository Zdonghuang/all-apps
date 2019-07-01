<template>
    <canvas id="canvas"></canvas>
</template>
<script>
export default {
    name:'rain',
    mounted(){
        this.rainStart();
    },
    methods:{
        rainStart(){
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            var w = document.documentElement.offsetWidth;
            var h = document.documentElement.offsetHeight;
            var x = 0, y = 0,len = 30,angle = -10,count = 150;
            var rainTimer = null,drawTimer = null;

            //线条颜色
            var color = ctx.createLinearGradient(0,0,0,len);
            color.addColorStop(0,'purple');
            color.addColorStop(1,'rgba(255,255,255,0.2)');
            //ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.strokeStyle = color;
            
            function drawRain(x,y){       
                //每次绘制渐变线条 都需要找到坐标
                var color = ctx.createLinearGradient(x,y,x+angle,y+len);
                //color.addColorStop(0,'rgba(254,139,199,0.3)');
                color.addColorStop(0,'rgba(0,0,0,0.2');
                color.addColorStop(1,'rgba(255,255,255,0.3)');
                ctx.strokeStyle = color;

                ctx.beginPath()
                ctx.moveTo(x,y);
                ctx.lineWidth=1;
                ctx.lineTo(x + angle,y+len);
                ctx.stroke();
            }

            //绘制满屏的雨滴
            function fullWindowRain(){       
                var i = 0;
                for(i = 0;i < count; i++){
                    drawRain(w*Math.random(),h*Math.random());
                }
            }

            //改变大雨或者小雨
            function changeRain(){
                rainTimer = setInterval(function(){
                    count  = Math.ceil(500 + 100 * Math.random());
                },2000);
            }
            changeRain();
            reDraw();

            //重绘的频率
            function reDraw(){
                drawTimer = setInterval(function(){
                         ctx.clearRect(0,0,w,h+200);
                  fullWindowRain();
                },100);
            }
            

        }

    }
}
</script>
<style>
 canvas{
    width: 400px;
    height: 400px;
    position: absolute;
    top: 100px;
    left: 40px;
 }
</style>


