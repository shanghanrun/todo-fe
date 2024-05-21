import {create} from 'zustand'
import api from '../utils/api'

const userStore =create((set)=>({
	userInfo:{},
	setUserInfo:(val)=> set({userInfo: {...val}}),
	// getUserInfo:async()=>{
	// 	try{
	// 		const resp = await api.get('/user/me')
	// 		if(resp.status !== 200) throw new Error(resp.error)
	// 		set({userInfo: resp.data.user})
	// 	}catch(e){
	// 		console.log(e.message)
	// 	}
	// }
}))

export default userStore
