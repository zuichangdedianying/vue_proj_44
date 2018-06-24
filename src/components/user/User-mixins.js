export default {
    data() {
      return {
        queryinfo: {
          query:'',
          pagenum:1,
          pagesize:2

        },
        total:0,
        userlist: [],
        addDialogVisible: false,
        // 添加用户的表单数据
        addForm: {
            username: '',
            passward:'',
            email:'',
            mobile:''
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
        }
  
   }
  }
//   ctrl 加 k 加 0 折叠
//  ctrl 加 k 加 j  展开
