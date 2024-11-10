import axios from 'axios'

export function getPizzaCollaborationBpmn() {
  return axios.get('/bpmn-designer/bpmn/pizza-collaboration.bpmn')
}
