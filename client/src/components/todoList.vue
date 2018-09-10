<template>
  <div>
    <el-row>
      <el-col :xs="{span: 22, offset:2}" :sm="{span: 6, offset: 9}">
        <span class="title">{{ username }} 你好</span>
        <el-input v-model="event" @keyup.enter.native="addData" placeholder="请输入待办事项"></el-input>
      </el-col>
      <el-col :xs="{span: 22, offset:2}" :sm="{span: 10, offset: 7}">

        <el-tabs>
          <el-tab-pane label="待完成事项">
            <el-col v-show="isTable">
               <el-table :data="tableData" style="width: 100%"  @select-all="selectAll">
                <el-table-column type='selection' align="center">
                </el-table-column>
                <el-table-column label="日期" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" align="center">
                  <template slot-scope="scope">{{ scope.row.event }}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">完成</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col v-show="!isTable">
              暂无事件
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="已完成事项">
            <el-col v-show="isComplete">
              <el-table :data="completeData" style="width: 100%"  @select-all="selectAll">
                <el-table-column type='selection' align="center">
                </el-table-column>
                <el-table-column label="日期" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" align="center">
                  <template slot-scope="scope">{{ scope.row.event }}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">撤销</el-button>
                    <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col v-show="!isComplete">
              暂无完成事件
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  mounted() {
    let token = localStorage.getItem('token')
    let Payload = jwt.decode(token)
    this.username = Payload.username // 解密用户名
  },
  data() {
    return {
      event: '',
      username: '',
      activeName: 'first',
      tableData: [
        {
          eId: 1,
          date: '2018-1-1',
          event: 'jsonwebtoken'
        },
        {
          eId: 2,
          date: '2018-1-2',
          event: '深复制'
        }
      ],
      completeData: [],
      selectEvent: []
    }
  },
  computed: {
    isTable() {
      if (this.tableData.length > 0) {
        return true
      } else {
        return false
      }
    },
    isComplete() {
      if (this.completeData.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleEdit(index, row) {
      // 点击完成
      //index 表格位置  row 行信息
      this.tableData.map((element, index) => {
        if (element.eId === row.eId) {
          this.tableData.splice(index, 1) // 删除等待完成事项
        }
      })
      this.completeData.push(row) // 加入已经完成的事项
    },
    selectAll() {
      // 多选暂时不写
      arguments[0].map(e => {
        this.selectEvent.push(e.eId)
      })
      console.log(this.selectEvent)
    },
    addData() {
      console.log();
      let event  = {
        date: this.getNowFormatDate(),
        event: this.event,
      }
      // this.$axios.post('/api/addTodoList', event)
      // .then((data) => {
      //   console.log(data);
      // })
    },
    getNowFormatDate() {
      var date = new Date()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = `${date.getFullYear()}-${month}-${strDate}`
      return currentdate
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 25px;
  line-height: 50px;
}
.el-table th {
  text-align: center;
}
</style>
