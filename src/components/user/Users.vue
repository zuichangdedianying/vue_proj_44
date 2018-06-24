<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
   </el-breadcrumb>
 <!-- 卡片视图 -->
 <el-card class="box-card">
  <el-row :gutter="20">
    <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryinfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
  </el-row>

  <!-- 表格 -->
   <el-table
   :data="userlist"
    border
    stripe
    style="width: 100%"
   >
    <el-table-column
      type="index"
      width="55">
    </el-table-column>
    <el-table-column
     prop="username"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
     <el-table-column
          prop="role_name"
          label="角色">
        </el-table-column>
        <el-table-column
          label="状态">
          <!-- 让这一行的开关，把状态绑定到 这一行数据的 mg_state 上 -->
          <el-switch
            v-model="scope.row.mg_state"
            slot-scope="scope">
          </el-switch>
        </el-table-column>
         <el-table-column
          width="185"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="show.EditDialog(scope)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"  @click="remove(scope)"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
  </el-table>
  <!-- 分页区域 -->
  <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
   </el-pagination>
</el-card>

     <!-- 添加弹框 -->

<el-dialog
        title="提示"
        :visible.sync="addDialogVisible"
        width="30%"
        @close="addDialogClosed">
        <!-- 添加用户表单 -->
       <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
           <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
       </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
</el-dialog>
   <!--编辑用户的对话框 -->
     <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed">
      <!-- 编辑用户的表单 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
  // 在data() , 且 return 之前, 自定义一些校验规制
    var checkEmail = (rule, value, callback) => {
    if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value) === false) {
        return callback(new Error('邮箱地址不正确'))
      }
      // 校验通过
      callback()
    }
    var checkMobile = (rule, value, callback) => {
      if (/^1\d{10}$/.test(value) === false) {
        return callback(new Error('手机号不正确'))
      }
      callback()
    }
    return {
      queryinfo: {
        query: '',
        pagenum: 1,
        pagesize: 2

      },
      total: 0,
      userlist: [],
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        passward:'',
        email:'',
        mobile:''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
         password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
         email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // 使用自定义的邮箱校验规则
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          // 使用自定义的手机号验证规则
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
       // 控制 编辑对话框的显示和隐藏
      editDialogVisible: false,
      // 编辑的表数据
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      }
    }
    
  },
 created() {
   this.getUserList()
  },
 methods: {
  async getUserList() {
    const {data:res} = await this.$http.get('users',{params: this.queryinfo})
    if (res.meta.status !==200) return this.$message.error('请求用户列表失败')
    console.log(res)
    this.userlist = res.data.users
  //  为总页数赋值
  console.log(res.data.total)
  this.total = res.data.total
  },
  handleSizeChange(newSize) {
    // 把最新的 pagesize 赋值给 this.queryinfo
    this.queryinfo.pagesize = newSize
    this.getUserList()
  },
// 监听 页码值 的变化
    handleCurrentChange(newPageNum) {
        this.queryinfo.pagenum = newPageNum  
        this.getUserList()
    },
    addDialogClosed() {
        // 重置表单
        this.$refs.addFormRef.resetFields()
    },
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return 

        const {data: res} = await this.$http.post('users',this.addForm)
        console.log(res)
        if (res.meta.status !==201) return this.$message.error('添加用户失败')

        this.$message.success('添加用户成功')   
            // 刷新列表
          this.getUserList()
          this.addDialogVisible = false
    
      })
    },
    addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },
    // 重置编辑表单
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    },
    // 点击 编辑展示编辑的对话框
    async showEditDialog(scope) {
      console.log(scope.row.id)
      const { data: res} = await this.$http.get('users/'+scope.row.id)

      if(res.meta.status !== 200) return this.$message.error('获取用户信息失败')
    //   数据的赋值
        this.editForm.id = res.data.id
       this.editForm.username = res.data.username
       this.editForm.email = res.data.email
       this.editForm.mobile = res.data.mobile
       // 显示编辑对话框
       this.editDialogVisible = true
      
    },
    editUser() {
      this.$refs.editUser.validator(async valid => {
        if (!valid) return

        const {data : res} = await this.$http.put('users/'+ this.editForm.id, this.editForm)
        if(res.meta.status !==200) return this.$message.error('编辑用户失败')

        this.$message.success('编辑用户成功')

        this.getUserList()
        this.editDialogClosed = false
      })
    },
    // 删除用户
    async remove(scope) {
     const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !=='confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      const {data: res} = await this.$http.delete('users/' + scope.row.id)
      if (res.meta.status !== 200) return this.$message.error('删除用户失败')
      this.$message.success('删除用户成功')
      this.getUserList()
    }
  }
}
//   ctrl 加 k 加 0 折叠
//  ctrl 加 k 加 j  展开

</script>
