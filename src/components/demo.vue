<script>
import { ref, onMounted } from 'vue'
import LogicFlow from '@logicflow/core'
import { Menu, DndPanel, Control, SelectionSelect, InsertNodeInPolyline, Snapshot } from '@logicflow/extension'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import startPoint from '@/nodeTypeLib/startPoint'
import endPoint from '@/nodeTypeLib/endPoint'
import featureUnit from '@/nodeTypeLib/featureUnit'
import '@/css/style.css'
import fileSaver from 'file-saver'

export default {
  name: 'demoIndex',
  setup() {
    const container = ref(null)
    let lf = null
    onMounted(() => {
      // 实例化画布
      lf = new LogicFlow({
        container: container.value, // 布局容器
        grid: true, // 网格
        plugins: [Menu, DndPanel, Control, SelectionSelect, InsertNodeInPolyline, Snapshot], // 插件
        stopZoomGraph: false, // 禁止缩放
        stopScrollGraph: true, // 禁止鼠标滚动移动画布
        keyboard: {
          enabled: true // 开启键盘快捷键
        },
        edgeType: 'polyline' // 设定默认的边类型
      })

      // 注册自定义的节点类型
      // lf.register(startPoint)
      // lf.register(featureUnit)
      // lf.register(endPoint)
      lf.batchRegister([startPoint, featureUnit, endPoint]) // 批量注册

      // 初始化画布数据(可以为空)

      // 添加拖拽面板
      const patternItems = [
        {
          type: 'startPoint',
          text: '开始',
          label: '开始',
          className: 'startPoint'
        },
        {
          type: 'featureUnit',
          label: '特征单元',
          className: 'featureUnit',
          properties: {
            tableName: '特征单元',
            fields: [
              {
                key: '特征参数1',
                type: '值'
              },
              {
                key: '特征参数2',
                type: '值'
              },
              {
                key: '特征参数3',
                type: '值'
              }
            ]
          }
        },
        {
          type: 'endPoint',
          text: '结束',
          label: '结束',
          className: 'end'
        }
      ]
      lf.extension.dndPanel.setPatternItems(patternItems)

      lf.render() // 渲染数据

      lf.extension.selectionSelect.openSelectionSelect() // 开启框选功能
    })

    const saveAsJson = () => {
      const blob = new Blob([JSON.stringify(lf.getGraphData())])
      fileSaver.saveAs(blob, 'data.json')
    }

    const load = (uploadFile) => {
      const reader = new FileReader()
      reader.readAsText(uploadFile.raw)
      reader.onload = function() {
        const graphData = JSON.parse(this.result)
        lf.render(graphData)
      }
    }

    const clear = () => {
      lf.graphModel.clearData()
    }

    const saveAsPicture = () => {
      lf.extension.snapshot.getSnapshot()
    }

    return { container, saveAsJson, saveAsPicture, load, clear }
  }
}
</script>

<template>
  <div>
    <el-button type="primary" @click="saveAsJson">save as JSON</el-button>
    <el-button @click="saveAsPicture" type="primary">save as picture</el-button>
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :auto-upload="true"
      :on-change="load"
      :on-remove="clear"
      :limit="1"
    >
      <template #trigger>
        <el-button type="success">加载流程图</el-button>
      </template>
    </el-upload>
  </div>
  <div ref="container" class="box">LogicFlow-DEMO</div>
</template>

<style scoped lang="less">
.box {
  width: 1000px;
  height: 500px;
  margin: 50px auto;
  background-color: pink;
}

.upload-demo {
  margin-top: 20px;
}

/* dnd面板样式 */
:deep(.startPoint>.lf-dnd-shape) {
  background-image: url('@/assets/svg/start.svg');
  background-size: cover;
}

:deep(.featureUnit>.lf-dnd-shape) {
  background-image: url('@/assets/svg/featureUnit.svg');
  background-size: cover;
}

:deep(.end>.lf-dnd-shape) {
  background-image: url('@/assets/svg/end.svg');
  background-size: cover;
}
</style>
