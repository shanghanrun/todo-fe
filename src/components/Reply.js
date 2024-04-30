import React, {useState, useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import api from '../utils/api'
import userStore from "../store/userStore";

const Reply = ({reply, getReplyList}) => {
	const [editValue, setEditValue] = useState(reply.content)
	const [editable, setEditable] = useState(false)
	const {userInfo} = userStore()

	const deleteReply= async (e)=>{
		e.stopPropagation()
		try{
		const resp = await api.delete(`/reply/${reply._id}`)
		if(resp.status === 200){
			console.log(resp.data.message)
		}
		await getReplyList()

		}catch(e){
		console.log(e.message)
		}
	}

	const handleInputChange =(e)=>{
		setEditValue(e.target.value)
	}

  	const editReply = async (e)=>{
		e.stopPropagation()
		if(!editable){
			setEditable(true)
		} else {  //editable true라서 입력난이 나타나서 입력했을 경우
			try{
				const resp = await api.put(`/reply/${reply._id}`, {content: editValue})
				if(resp.status === 200){
					console.log('업데이트된 댓글 : ', resp.data.data)
				}
				await getReplyList()
				setEditable(false)
				setEditValue(resp.data.data.content)
			}catch(e){
				console.log(e.message)
			}
		}
	}

	useEffect(()=>{
		console.log('reply.author :', reply.author)
		console.log('userInfo._id :', userInfo._id)
	},[])

	return (
		<Row>
		<Col xs={12}>
			<div style={{display:'flex'}}>
			{editable ? ''
			: <div style={{width:'800px'}} className="todo-content">{reply.content}</div>  
			}

			<div style={{display:'flex', alignItems:"center"}}>
				<div className={editable? 'editable': ''}>
					{editable?
						<input
							type='text' value={editValue}
							onChange={handleInputChange}
							autoFocus
							style={{width: '500px', marginLeft:'15px'}}
						/>
						:
						<div>{(reply.author)? `by ${reply.author?.username}` : ''}</div>
					}	
				</div>

				{ (reply.author._id === userInfo._id )?
					<div>
						<button style={{marginLeft:'20px'}}
							onClick={editReply}
							className="button-delete">{editable? "저장" : "수정"}</button>
						<button style={{marginLeft:'20px'}}
							onClick={deleteReply}
							className="button-delete">삭제</button>
					</div>
					: ""
				}
				
			</div>
			</div>
		</Col>
		</Row>
	);
};

export default Reply;
