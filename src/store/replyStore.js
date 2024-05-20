import {create} from 'zustand'
import api from '../utils/api'

const replyStore = create((set,get)=>({
	replyList:[],
	createReply: async ({taskId,content})=>{
		try{
			const resp = await api.post('/reply',{taskId, content})
			if(resp.status !== 200) throw new Error(resp.error)
			set({replyList: resp.data.data})
		}catch(e){
			console.log(e.message)
		}
	},
	getReplyList:async(taskId)=>{
		try{
			
		}catch(e){

		}
	},
}))

export default replyStore;