<template>
    <div class="card">
        <span class="timer-loader">Loading&#8230;</span>
        <p>请稍后 . . .</p>
    </div>
</template>
<style>
.card{
    text-align: center;
    padding-top:350px;
}
.card p{
    color: #fff;
    font-weight: 900;
    font-size: 18px;
    margin-top: 5px;
}
@-moz-keyframes timer-loader {
  0% {
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes timer-loader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes timer-loader {
  0% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
/* :not(:required) hides this rule from IE9 and below */
.timer-loader:not(:required) {
  border: 6px solid #c8d;
  -moz-border-radius: 24px;
  -webkit-border-radius: 24px;
  border-radius: 30px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  overflow: hidden;
  position: relative;
  text-indent: -9999px;
  width: 60px;
  height: 60px;
}
.timer-loader:not(:required)::before {
  -moz-animation: timer-loader 1250ms infinite linear;
  -webkit-animation: timer-loader 1250ms infinite linear;
  animation: timer-loader 1250ms infinite linear;
  -moz-transform-origin: 3px 3px;
  -ms-transform-origin: 3px 3px;
  -webkit-transform-origin: 3px 3px;
  transform-origin: 3px 3px;
  background: #c8d;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  content: '';
  display: block;
  position: absolute;
  width: 6px;
  height: 21.2px;
  left: 20px;
  top: 21px;
}
.timer-loader:not(:required)::after {
  -moz-animation: timer-loader 15000ms infinite linear;
  -webkit-animation: timer-loader 15000ms infinite linear;
  animation: timer-loader 15000ms infinite linear;
  -moz-transform-origin: 3px 3px;
  -ms-transform-origin: 3px 3px;
  -webkit-transform-origin: 3px 3px;
  transform-origin: 3px 3px;
  background: #c8d;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  content: '';
  display: block;
  position: absolute;
  width: 6px;
  height: 18px;
  left: 20px;
  top: 21px;
}


</style>

