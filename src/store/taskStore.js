import {create} from 'zustand'
import api from '../utils/api'

const taskStore = create((set, get)=>({
	taskUpdated:false,
	taskList:[],
	createTask:async(task)=>{
		try{
			const resp = await api.post('/tasks', {task})
			if (resp.status !== 200) throw new Error(resp.error)
			set((state) => ({taskUpdated: !state.taskUpdated}))
		}catch(e){
			console.log(e.error)
		}
	},
	getTasks:async()=>{
		try{
			const resp = await api.get('/tasks')
			if(resp.status !==200) throw new Error(resp.error)
			set((state)=>({taskList: resp.data.data}))
		}catch(e){
			console.log(e.error)
		}
	},
	updateTask:async(taskId, task)=>{
		// task값이 없으면 isDone 토글
		try{
			const resp = await api.put(`/tasks/${taskId}`, {task})
			if (resp.status !==200) throw new Error(resp.error)
			set((state)=>({taskUpdated: !state.taskUpdated}))
		}catch(e){
			console.log(e.error)
		}
	},
	deleteTask:async(taskId)=>{
		try{
			const resp = await api.delete(`/tasks/${taskId}`)
			if(resp.status !== 200) throw new Error(resp.error)
			set((state)=>({taskUpdated: !state.taskUpdated}))
		}catch(e){
			console.log(e.error)
		}
	}
}))

export default taskStore;