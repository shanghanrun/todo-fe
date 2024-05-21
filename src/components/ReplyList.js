import React, {useState} from "react";
import Reply from "./Reply";
import replyStore from '../store/replyStore'

const ReplyList = ({task}) => {
	const [replyValue, setReplyValue] =useState('')
	const {createReply} = replyStore()
	

	async function addReply(){
		createReply(task?._id,replyValue)
		console.log('taskId : ', task._id)
		setReplyValue('')
	}

  return (
    <div style={{color:'#0048ff', margin:'10px 20px', border:'1px solid pink',background:'hsl(350, 54%, 87%)', borderRadius:'10px'}}>
      <h5 style={{padding: '10px'}}>댓글들</h5>
	  
	  <div style={{margin:'10px'}}>
			{ (task?.replyIds)? 
			task.replyIds.map((replyId)=>(
				<Reply key={replyId._id} replyId={replyId} />
			))
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