<template>
<div class="index">
  <div class="home">
    <div class="title">
      <img src="/password.jpg" class="image">
      <span>随机密码生成</span>
    </div>
    <div class="container">
      <table border="1" cellspacing="0">
        <tbody>
          <tr>
            <th>所用字符</th>
            <th>
              <input type="checkbox" :checked="AZ" @change="AZ=!AZ">A-Z
              <input type="checkbox" :checked="az" @change="az=!az">a-z
              <input type="checkbox" :checked="num" @change="num=!num">0-9&nbsp;
              <input type="checkbox" :checked="text" @click="text=!text">特殊字符
            </th>
          </tr>
          <tr>
            <th>密码长度</th>
            <th>
              <select class="select" @change="setlength()">
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16" selected>16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34">34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
                <option value="46">46</option>
                <option value="47">47</option>
                <option value="48">48</option>
                <option value="49">49</option>
                <option value="50">50</option>
                <option value="51">51</option>
                <option value="52">52</option>
                <option value="53">53</option>
                <option value="54">54</option>
                <option value="55">55</option>
                <option value="56">56</option>
                <option value="57">57</option>
                <option value="58">58</option>
                <option value="59">59</option>
                <option value="60">60</option>
                <option value="61">61</option>
                <option value="62">62</option>
                <option value="63">63</option>
                <option value="64">64</option>
                <option value="65">65</option>
                <option value="66">66</option>
                <option value="67">67</option>
                <option value="68">68</option>
                <option value="69">69</option>
                <option value="70">70</option>
                <option value="71">71</option>
                <option value="72">72</option>
                <option value="73">73</option>
                <option value="74">74</option>
                <option value="75">75</option>
                <option value="76">76</option>
                <option value="77">77</option>
                <option value="78">78</option>
                <option value="79">79</option>
                <option value="80">80</option>
                <option value="81">81</option>
                <option value="82">82</option>
                <option value="83">83</option>
                <option value="84">84</option>
                <option value="85">85</option>
                <option value="86">86</option>
                <option value="87">87</option>
                <option value="88">88</option>
                <option value="89">89</option>
                <option value="90">90</option>
                <option value="91">91</option>
                <option value="92">92</option>
                <option value="93">93</option>
                <option value="94">94</option>
                <option value="95">95</option>
                <option value="96">96</option>
                <option value="97">97</option>
                <option value="98">98</option>
                <option value="99">99</option>
              </select>&nbsp;位
            </th>
          </tr>
          <tr>
            <th>生成结果</th>
            <th>
              <br>
              <div v-if="password">
                <textarea cols="40" rows="6" v-text="password" disabled></textarea><br>
                强度：{{i}}/4
                <p :style="color">{{tips}}</p>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
      <button class="btn" @click="getpassword">生成密码</button>
    </div>
  </div>
</div>
</template>

<script>
import { HTTP } from 'meteor/http'
export default {
  data () {
    return {
      text:false,
      AZ:true,
      az:true,
      num:true,
      password:'',
      length:16,
      tips:'',
      i:1,
      color:'color:red'
    }
  },
  methods: {
    setlength(){
      this.length = document.getElementsByClassName('select')[0].value
    },
    getpassword(){
      if(this.text || this.AZ || this.az || this.num){
          HTTP.call('POST',`https://api.ileapcloud.com/tools/PasswordGenerator/generatePassword?digital=${this.num}&lower=${this.az}&passwordLength=${this.length}&symbol=${this.text}&upper=${this.AZ}`,{},(error,res)=>{
          if(res.data.status === 'ok'){
            let i = 0;
            if(this.num){
              i++;
            }
            if(this.text){
              i++;
            }
            if(this.AZ){
              i++;
            }
            if(this.az){
              i++;
            }
            if(i==1){
              if(!this.text){
                this.tips = '密码太不安全啦!';
                this.color = 'color:red';
                this.i = 1;
              } else {
                this.tips = '密码安全级别：中级!';
                this.color = 'color:yellow';
                this.i = 3;
              }
            } else if(i==2){
              this.i = 2;
              this.tips = '密码安全级别：低级!';
              this.color = 'color:rgb(190, 70, 33)';
            } else if(i==3){
              this.i = 3;
              this.tips = '密码安全级别：中级!';
              this.color = 'color:yellow';
            } else if(i==4){
              this.i = 4;
              this.tips = '密码安全级别：高级!';
              this.color = 'color:green';
            }
            this.password = res.data.result;
          }
        });
      } else {
        alert('请选择“所用字符”');
      }
    }
  },
}
</script>

<style lang="less" scoped>
.index{
  -webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
  .home{
    padding: 100px;
    .title{
      width: 300px;
      font-size: 30px;
      margin: 0 auto;
      .image{
        width: 90px;
        border-radius: 14px;
        vertical-align: middle;
      }
      span{
        vertical-align: middle;
      }
    }
    .container{
      width: 600px;
      margin: 50px auto 0;
      table{
        tbody{
          tr{
            th:first-child{
              padding: 20px;
              background-color: rgb(245, 245, 245);
            }
            th:last-child{
              width: 430px;
              .select{
                height: 28px;
                font-size: 18px;
                background-color: rgb(200, 200, 216);
                border-radius: 4px;
              }
            }
          }
        }
      }
      .btn{
          width: 90px;
          background-color: rgb(53, 102, 167);
          height: 30px;
          line-height: 30px;
          padding: 0;
          margin: 40px 0 0 255px;
        }
    }
  }
}
main{
  min-width: 600px !important;
  margin:0 auto !important;
  padding: 0 !important;
}
</style>
