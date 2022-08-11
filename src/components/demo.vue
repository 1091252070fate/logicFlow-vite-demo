<script>
import { ref, onMounted } from 'vue'
import LogicFlow from '@logicflow/core'
import { Menu, DndPanel, Control, SelectionSelect, InsertNodeInPolyline } from '@logicflow/extension'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import startPoint from '@/nodeTypeLib/startPoint'
import endPoint from '@/nodeTypeLib/endPoint'
import featureUnit from '@/nodeTypeLib/featureUnit'
import '@/assets/style.css'

export default {
  name: 'demoIndex',
  setup() {
    const container = ref(null)
    onMounted(() => {
      // 实例化画布
      const lf = new LogicFlow({
        container: container.value, // 布局容器
        grid: true, // 网格
        plugins: [Menu, DndPanel, Control, SelectionSelect, InsertNodeInPolyline], // 插件
        stopZoomGraph: false, // 禁止缩放
        stopScrollGraph: true // 禁止鼠标滚动移动画布
      })

      // 注册自定义的节点类型
      lf.register(startPoint)
      lf.register(featureUnit)
      lf.register(endPoint)

      // 初始化画布数据
      const graphData = {
        nodes: [
          {
            id: '1',
            type: 'startPoint',
            x: 300,
            y: 100,
            text: '节点1'
          },
          {
            id: '2',
            type: 'circle',
            x: 800,
            y: 400,
            text: '节点2'
          },
          {
            id: '3',
            type: 'featureUnit',
            x: 850,
            y: 200,
            properties: {
              tableName: 'Users',
              fields: [
                {
                  key: 'id',
                  type: 'string'
                },
                {
                  key: 'name',
                  type: 'string'
                },
                {
                  key: 'age',
                  type: 'integer'
                }
              ]
            }
          }
        ],
        edges: [
          {
            sourceNodeId: '1',
            targetNodeId: '3',
            type: 'bezier',
            text: ''
          },
          {
            sourceNodeId: '3',
            targetNodeId: '2',
            type: 'bezier',
            text: ''
          }
        ]
      }

      // 添加拖拽面板
      const patternItems = [
        {
          type: 'startPoint',
          text: '开始',
          label: '开始'
        }
      ]
      lf.extension.dndPanel.setPatternItems(patternItems)

      lf.render(graphData) // 渲染数据
      lf.extension.selectionSelect.openSelectionSelect() // 开启框选功能
    })

    return { container }
  }
}
</script>
<template>
  <div ref="container" class="box">LogicFlow-DEMO</div>
</template>

<style lang="less" scoped>
.box {
  width: 1000px;
  height: 500px;
  margin: 50px auto;
  background-color: pink;
}
</style>
