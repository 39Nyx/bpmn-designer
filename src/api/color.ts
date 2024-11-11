import axios from 'axios'

export function getPizzaCollaborationBpmnColor() {
  return axios.get('/bpmn-designer/bpmn/pizza-collaboration-color.bpmn')
}
