<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import Viewer from 'bpmn-js/lib/Modeler'
import { getPizzaCollaborationBpmnColor } from '@/api/color'
import type { Canvas } from 'bpmn-js/lib/features/context-pad/ContextPadProvider'
import type { ElementRegistry } from 'bpmn-js/lib/features/auto-place/BpmnAutoPlaceUtil'
import type { ElementLike } from 'diagram-js/lib/model/Types'
import type Overlays from 'diagram-js/lib/features/overlays/Overlays'
import type Modeling from 'bpmn-js/lib/features/modeling/Modeling'
import type { Element } from 'bpmn-js/lib/model/Types'
// 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

const container: Ref<null | HTMLDivElement> = ref(null)

/**
 * 更改颜色通过覆盖层
 * @param viewer
 */
function changeColorByOverlay(viewer: Viewer) {
  const elementRegistry: ElementRegistry = viewer.get<ElementRegistry>('elementRegistry')
  const overlays = viewer.get<Overlays>('overlays')
  const shape: ElementLike | undefined = elementRegistry.get('CalmCustomerTask')
  if (shape) {
    const div: HTMLDivElement = document.createElement('div')
    div.style.width = shape.width + 'px'
    div.style.height = shape.height + 'px'
    div.className = 'highlight-overlay'

    overlays.add('CalmCustomerTask', {
      position: {
        top: 0,
        left: 0,
      },
      html: div,
    })
  }
}

/**
 * 更改颜色通过modeling扩展
 * @param viewer
 */
function changeColorByExtension(viewer: Viewer) {
  const elementRegistry: ElementRegistry = viewer.get<ElementRegistry>('elementRegistry')
  const elementToColor = elementRegistry.get('SelectAPizzaTask') as Element
  const modeling = viewer.get<Modeling>('modeling')
  console.log(modeling)
  console.log(elementToColor)
  if (elementToColor) {
    modeling.setColor([elementToColor], {
      stroke: 'green',
      fill: 'rgb(152, 203, 152)',
    })
  }
}

/**
 * 设置节点的颜色
 * @param viewer
 */
function changeColorByMarker(viewer: Viewer) {
  const canvas = viewer.get<Canvas>('canvas')
  canvas.addMarker('OrderReceivedEvent', 'highlight')
}

onMounted(() => {
  if (container.value) {
    const viewer = new Viewer({
      container: container.value,
    })

    getPizzaCollaborationBpmnColor().then((res) => {
      viewer
        .importXML(res.data)
        .then(() => {
          viewer.get<Canvas>('canvas').zoom('fit-viewport')
          changeColorByOverlay(viewer)
          changeColorByExtension(viewer)
          changeColorByMarker(viewer)
        })
        .catch((err) => {
          console.error(err)
        })
    })
  }
})
</script>

<template>
  <div ref="container" class="container"></div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

:deep(.highlight-overlay) {
  background-color: green;
  opacity: 0.4;
  pointer-events: none;
  border-radius: 10px;
}

:deep(.highlight) {
  &:not(.djs-connection) .djs-visual > :nth-child(1) {
    fill: green !important; /* color elements as green */
  }
}
</style>
