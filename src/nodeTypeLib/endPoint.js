import { h, CircleNode, CircleNodeModel } from '@logicflow/core'

class endPointView extends CircleNode {
  // 渲染需要自定义的svg图形函数
  getLabelShape() {
    const { model } = this.props
    const { x, y } = model
    const style = model.getNodeStyle()
    return h(
      'svg',
      {
        x: x - 36,
        y: y - 16,
        width: 25,
        height: 25,
        viewBox: '0 0 1024 1024'
      },
      [h('path', {
        fill: style.stroke,
        d: 'M512.275957 90.714489a421.46112 421.46112 0 1 1-421.46112 421.46112 421.912686 421.912686 0 0 1 421.46112-421.46112m0-80.278309a501.739429 501.739429 0 1 0 501.739428 501.739429 501.739429 501.739429 0 0 0-501.739428-501.739429z'
      }),
      h('path', {
        fill: style.stroke,
        d: 'M370.233524 655.22152c0 39.687589 28.147582 55.99412 62.717429 36.024891l247.608408-143.045911a38.082023 38.082023 0 0 0 0-72.099956L432.800431 333.004459c-34.419325-20.069577-62.717429-3.612524-62.717428 36.075065 0.150522 0.301044 0.150522 286.141996 0.150521 286.141996z'
      })
      ]
    )
  }

  getShape() {
    const { model } = this.props
    const { x, y, r } = model
    const style = model.getNodeStyle()
    return h('g', {}, [
      h('circle', {
        ...style,
        cx: x,
        cy: y,
        r: r
      }),
      this.getLabelShape()
    ])
  }
}

class endPointModel extends CircleNodeModel {
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
    style.stroke = 'red'
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
    this.r = 50

    // 文本自定义
    const { x } = this
    this.text.value = '结束'
    this.text.x = x + 16
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
    const { r, x, y, id } = this
    return [
      {
        x: x - r,
        y,
        type: 'left',
        id: `${id}_0`
      },
      {
        x: x + r,
        y,
        type: 'right',
        id: `${id}_1`,
        edgeAddable: false // 控制节点是否可以从此锚点手动创建连线，默认为true
      }
    ]
  }

  getAnchorStyle(anchorInfo) {
    const style = super.getAnchorStyle(anchorInfo)
    if (anchorInfo.type === 'right') {
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

export default {
  type: 'endPoint',
  view: endPointView,
  model: endPointModel
}
