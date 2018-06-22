<template>
    <div class="login-container">
     <div class="logo">
         <img src="../assets/logo.png" alt="">
     </div>
     <!-- 登陆的表单 -->
     <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef"  class="loginform_style">
       <el-form-item  prop="username">
         <el-input v-model="loginForm.username">
           <i slot="prefix" class="iconfont icon-user"></i>
         </el-input>
        </el-form-item>
        <el-form-item  prop="password">
         <el-input v-model="loginForm.password" type="password">>
           <i slot="prefix" class="iconfont icon-3702mima"></i>
         </el-input>
        </el-form-item>
     </el-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {

      },
      loginFormRules: {

      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  width: 450px;
  height: 304px;
  background-color: #fff;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;

  .logo {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 8px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-60px);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
</style>
