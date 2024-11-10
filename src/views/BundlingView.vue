<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import BpmnViewer from 'bpmn-js'
import { getPizzaCollaborationBpmn } from '@/api/bunding'
import type { Canvas } from 'bpmn-js/lib/features/context-pad/ContextPadProvider'

const container: Ref<HTMLCanvasElement | null> = ref(null)

onMounted(() => {
  if (container.value) {
    const viewer = new BpmnViewer({
      container: container.value,
    })
    getPizzaCollaborationBpmn().then((res) => {
      viewer
        .importXML(res.data)
        .then((result) => {
          const { warnings } = result
          if (warnings.length) {
            console.warn('告警信息:', warnings)
          }
          const canvas = viewer.get<Canvas>('canvas')
          canvas.zoom('fit-viewport')
        })
        .catch(function (err) {
          const { warnings, message } = err
          console.error('错误信息:', warnings, message)
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
</style>
