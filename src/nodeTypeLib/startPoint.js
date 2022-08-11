import { h, RectNode, RectNodeModel } from '@logicflow/core'

class startPointModel extends RectNodeModel {
  // 样式属性重写
  getNodeStyle() {
    const style = super.getNodeStyle()
    // style属性的重写实际上是对svg的重写，常见属性如下：
    // stroke 属性定义了给定图形元素的外轮廓的颜色
    // stroke-dasharray 用来控制描边打点划线的图案样式
    // stroke-width 属性指定了当前对象轮廓的宽度
    // fill 用来定义图形内部的颜色
    // fill-opacity 指定了填色的不透明度、对象内容物的不透明度
    // font-size 定义了文本字体大小
    // color 定义文本颜色
    style.stroke = 'blue'
    style.strokeDasharray = '3 3'

    return style
  }

  // 形状属性重写(仅在初始化时调用)
  initNodeData(data) {
    // width: 节点的宽度
    // height：节点的高度
    // radius: 矩形特有的，节点的圆角
    // r：圆形节点特有的，半径
    // rx、ry: 椭圆节点和菱形节点存在，水平、垂直圆角的半径
    // points: 多边形特有的，多边形的各个顶点
    super.initNodeData(data)
    this.width = 150
    this.height = 150
    this.radius = 10

    // 文本自定义
    const { x, y, height } = this
    this.text.value = '开始'
    this.text.x = x - 10
    this.text.y = y - height / 2 + 18
    this.text.draggable = false
    this.text.editable = true
  }

  // setAttributes() 每当properties发生变化时，都会调用该函数

  // setProperties() 初始化节点的自定义属性

  // 初始化文本样式
  getTextStyle() {
    const style = super.getTextStyle()
    style.fontSize = 16
    style.color = 'red'
    return style
  }

  // 自定义锚点样式
  getDefaultAnchor() {
    const { width, x, y, id } = this
    return [
      {
        x: x - width / 2,
        y,
        type: 'left',
        edgeAddable: false, // 控制节点是否可以从此锚点手动创建连线，默认为true
        id: `${id}_0`
      },
      {
        x: x + width / 2,
        y,
        type: 'right',
        id: `${id}_1`
      }
    ]
  }

  getAnchorStyle(anchorInfo) {
    const style = super.getAnchorStyle(anchorInfo)
    if (anchorInfo.type === 'left') {
      style.fill = 'transparent'
      style.hover.fill = 'red'
      style.hover.stroke = 'red'
    } else {
      style.fill = 'transparent'
      style.hover.fill = 'green'
      style.hover.stroke = 'green'
    }
    return style
  }
}

class startPointView extends RectNode {
  // 渲染需要自定义的svg图形函数
  getLabelShape() {
    const { model } = this.props
    const { x, y, width, height } = model
    const style = model.getNodeStyle()
    return h(
      'svg',
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 25,
        height: 25,
        viewBox: '0 0 1274 1024'
      },
      h('path', {
        fill: style.stroke,
        d: 'M655.807326 287.35973m-223.989415 0a218.879 218.879 0 1 0 447.978829 0 218.879 218.879 0 1 0-447.978829 0ZM1039.955839 895.482975c-0.490184-212.177424-172.287821-384.030443-384.148513-384.030443-211.862739 0-383.660376 171.85302-384.15056 384.030443L1039.955839 895.482975z'
      })
    )
  }

  getShape() {
    const { model } = this.props
    const { x, y, width, height, radius } = model
    const style = model.getNodeStyle()
    return h('g', {}, [
      h('rect', {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height
      }),
      this.getLabelShape()
    ])
  }
}

export default {
  type: 'startPoint',
  view: startPointView,
  model: startPointModel
}
