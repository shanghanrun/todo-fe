import React, {useState} from "react";
import Reply from "./Reply";
import api from '../utils/api'

const ReplyList = ({item, replyList, getReplyList}) => {
	const [replyValue, setReplyValue] =useState('')
	

	async function addReply(){
		try{
			const resp = await api.post('/reply', {itemId: item._id, content:replyValue })

		if(resp.status === 200){
			console.log('성공')
			console.log('db에 추가된 데이터:', resp.data.data)
		} else{
			throw new Error('task can not be added')
		}
		} catch(e){
		console.log(e.message)
		}
		//서버로부터 전체 데이터 다시 받기(추가한 값 보기)
		await getReplyList()
		setReplyValue('')
	}

  return (
    <div style={{color:'#0048ff', margin:'10px 10px', border:'1px solid pink', borderRadius:'10px'}}>
      <h5 style={{padding: '5px'}}>댓글들</h5>
	  
	  <div style={{margin:'10px'}}>
			{ replyList? (replyList.map((reply)=>(
				<Reply key={reply._id} reply={reply} getReplyList={getReplyList} />
			)))
			: (<h2>There is no reply to show</h2>)
			}
	  </div>
	  <div style={{marginLeft: '20px', marginBottom:'10px', display:'flex', alignItems:'center'}}>
			<input
				type="text"
				placeholder="댓글을 입력하세요"
				className="input-box"
				value={replyValue}
				onChange={(e)=> setReplyValue(e.target.value)}
			/>
			<button  style={{width:'200px', margin:'0 20px'}}
				onClick={addReply}
				className="button-add">추가</button>
	  </div>
      
    </div>
  );
};

export default ReplyList;