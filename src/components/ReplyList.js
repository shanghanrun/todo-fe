import React, {useState, useEffect} from "react";
import Reply from "./Reply";
import api from '../utils/api'
import replyStore from '../store/replyStore'

const ReplyList = ({item}) => {
	const [replyValue, setReplyValue] =useState('')
	const {replyList, createReply, getReplyList} = replyStore()
	

	async function addReply(){
		createReply({taskId:item?._id, content:replyValue})
		console.log('taskId : ', item._id)
		//서버로부터 전체 데이터 다시 받기(추가한 값 보기)
		await getReplyList(item?._id)
		setReplyValue('')
	}
	
	useEffect(()=>{
		getReplyList(item?._id)
	},[])

  return (
    <div style={{color:'#0048ff', margin:'10px 10px', border:'1px solid pink', borderRadius:'10px'}}>
      <h5 style={{padding: '5px'}}>댓글들</h5>
	  
	  <div style={{margin:'10px'}}>
			{ replyList? (replyList.map((reply)=>(
				<Reply key={reply._id} item={item} reply={reply} getReplyList={getReplyList} />
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