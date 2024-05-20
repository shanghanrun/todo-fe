import React, {useState, useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import api from '../utils/api'
import ReplyList from "./ReplyList";
import userStore from "../store/userStore";

const TodoItem = ({item, getTasks}) => {
  const [isDone, setIsDone] = useState(false)
  const [editable, setEditable] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [replyList, setReplyList] = useState([])
  const {userInfo} = userStore()

  const deleteItem= async (e)=>{
    e.stopPropagation()
    try{
      const resp = await api.delete(`/tasks/${item._id}`)
      if(resp.status === 200){
        console.log(resp.data.message)
      }
      await getTasks()

    }catch(e){
      console.log(e.message)
    }
  }
  const handleDone = async (e)=>{
    e.stopPropagation()
    try{
      const resp = await api.put(`/tasks/${item._id}`)
      if(resp.status === 200){
        console.log(resp.data)
      }
      setIsDone(!isDone)
      getTasks()

    }catch(e){
      console.log(e.message)
    }
  }
  const editItem=()=>{
    setEditable(true)
  }
  const handleInputChange =(e)=>{
    setEditValue(e.target.value)
  }
  const handleKeyPress = async(e)=>{
    if(e.key === 'Enter'){
      e.preventDefault()
      try{
        const resp = await api.put(`/tasks/${item._id}`,{task:editValue})
        if(resp.status === 200){
          console.log('업데이트된 데이터 : ', resp.data.data)
        }
        await getTasks()
        setEditable(false)
        setEditValue('')
      }catch(e){
        console.log(e.message)
      }
    }
  }

  // async function getReplyList(){
  //   const resp = await api.get(`/reply/${item._id}` )
  //   setReplyList(resp.data.data)
  // }

  // useEffect(()=>{
  //   getReplyList()
  //   console.log('item.author? :', item.author)
  // },[])
  return (
    <Row>
      <Col xs={12}>
        <div 
          onClick={editItem}
          className={`todo-item ${isDone? 'item-complete': ''}
                    ${editable? 'editable':''}`}          
                    >
          {editable ?
            <input 
              type='text' value={editValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress} autoFocus
            />
            : <div style={{fontSize:'20px'}}className="todo-content">{item.task}</div>
          }            

          <div style={{display:'flex', alignItems:"center"}}>
            <div style={{fontSize:'20px', marginRight:'10px'}}>{(item.authorId)? `by ${item.authorId?.username}` : ''}</div>

            
              { (item.authorId?._id === userInfo._id) ?
                <div>
                  <button 
                    onClick={deleteItem}
                    className="button-delete">삭제</button>
                  <button
                    onClick={handleDone} 
                    className="button-done">{isDone? '안끝남' :'끝남'}</button>
                </div>
                : null
              }
          </div>
        </div>
        
        
        {/* <ReplyList item={item} replyList={replyList} getReplyList={getReplyList} /> */}
        <ReplyList item={item} />
      </Col>
    </Row>
  );
};

export default TodoItem;
