import {create} from 'zustand'

const userStore =create((set)=>({
	userInfo:{},
	setUserInfo:(val)=> set({userInfo: {...val}})
}))

export default userStore
