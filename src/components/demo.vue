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
        stopScrollGraph: true, // 禁止鼠标滚动移动画布
        keyboard: {
          enabled: true // 开启键盘快捷键
        }
      })

      // 注册自定义的节点类型
      lf.register(startPoint)
      lf.register(featureUnit)
      lf.register(endPoint)

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

      lf.setDefaultEdgeType('bezier') // 设置默认的曲线类型
    })

    return { container }
  }
}
</script>
<template>
  <div ref="container" class="box">LogicFlow-DEMO</div>
</template>

<style scoped lang="less">
.box {
  width: 1000px;
  height: 500px;
  margin: 50px auto;
  background-color: pink;
}
</style>
