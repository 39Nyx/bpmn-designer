import axios from 'axios'

export function getPizzaCollaborationBpmn() {
  return axios.get('/bpmn/pizza-collaboration.bpmn')
}
