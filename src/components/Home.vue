<template>
   <el-container class="home-container">
  <el-header>
    <div class="logo_tile">
      <img src="../assets/heima_logo.png" alt="">
      <h2>电商后台管理系统</h2>
    </div>
     <el-button type="info">退出</el-button>
  </el-header>
  <el-container>
    <el-aside :width="iscollapse ? '65px' : '200px'">
       <div class="toggleBar" @click="iscollapse=!iscollapse">|||</div>
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      unique-opened
      router
      :collapse="iscollapse"
      :collapse-transitioniscollapse="false"
      active-text-color="#409EFF">

      <el-submenu
      :index="item.id + ''"
      v-for="(item, i) in menus"
      :key="item.id"
      :class="iscollapse ? 'el_submenu_small': 'el_submenu_large'">
        <template slot="title">
         <i :class="['iconfont', iconlist[i]]"></i>
          <span>{{item.authName}}</span>
        </template>
         <el-menu-item :index="'/' + subitem.path" v-for="subitem in item.children" :key="subitem.id">
              <i class="el-icon-menu"></i>
              {{subitem.authName}}
            </el-menu-item>

      </el-submenu>
      </el-menu>
    </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menus: [],
      iconlist: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'],
      iscollapse: false
    }
  },
  created() {
    this.getmenus()
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      // 强制跳转到登陆页面
      this.$router.push('/login')
    },
    async getmenus(){ 
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('获取左侧菜单列表失败')
      this.menus = res.data
    }
  }
}
</script>

<style lang="less" scoped>
   .home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  user-select: none;
  .logo_tile {
    display: flex;
    align-items: center;
    color: white;
    h2 {
      font-weight: 200;
      margin-left: 15px;
    }
  }
  .el-button {
    margin-right: 10px;
  }
}

.el-aside {
  background-color: #333744;
  user-select: none;
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 8px;
}

.toggleBar {
  color: #fff;
  font-size: 12px;
  line-height: 24px;
  background-color: #4a5064;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  user-select: none;
}

.el_submenu_large {
  width: 200px;
}
.el_submenu_small {
  width: 65px;
}
</style>
