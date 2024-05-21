import React, {useState, useEffect} from "react";
import { Col, Row, Button } from "react-bootstrap";
import userStore from "../store/userStore";
import replyStore from '../store/replyStore'

const Reply = ({replyId}) => {
	console.log('replyId', replyId)
	const {deleteReply, updateReply} = replyStore()
	const [editValue, setEditValue] = useState(replyId.content)
	const [editable, setEditable] = useState(false)
	const {userInfo} = userStore()
	console.log('userInfo :',userInfo)
	

	const removeReply= async (e)=>{
		e.stopPropagation()
		await deleteReply(replyId._id)
	}

	const handleInputChange =(e)=>{
		setEditValue(e.target.value)
	}

  	const editReply = async (e)=>{
		e.stopPropagation()
		if(!editable){
			setEditable(true)
		} else {  //editable true라서 입력난이 나타나서 입력했을 경우
			await updateReply(replyId._id, editValue)
			
			setEditable(false)
			setEditValue(replyId.content)
		}
	}

	useEffect(()=>{
		console.log('userInfo._id :', userInfo._id)
	},[])

	return (
		<Row>
		<Col xs={12}>
			<div style={{display:'flex'}}>
			{editable ? ''
			: <div style={{width:'800px'}} className="todo-content">{replyId?.content}</div>  
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
						<div style={{width:'100px'}}>by {replyId.author} </div>
					}	
				</div>

				{ (replyId?.authorId === userInfo._id )?
					<div style={{width:'200px'}}>
						<Button variant="success" style={{marginLeft:'20px'}}
							onClick={editReply}
							className="button-delete">{editable? "저장" : "수정"}</Button>
						<Button variant="danger" style={{marginLeft:'20px'}}
							onClick={removeReply}
							className="button-delete">삭제</Button>
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
