import React, {useState} from "react";
import { Col, Row } from "react-bootstrap";
import api from '../utils/api'

const TodoItem = ({item, getTasks}) => {
  const [isDone, setIsDone] = useState(false)
  const [editable, setEditable] = useState(false)
  const [editValue, setEditValue] = useState('')

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
            : <div className="todo-content">{item.task}</div>
          }            

          <div style={{display:'flex', alignItems:"center"}}>
            <div style={{fontSize:'20px'}}>{(item.author)? `by ${item.author?.username}` : ''}</div>
            <button 
              onClick={deleteItem}
            className="button-delete">삭제</button>
            <button
              onClick={handleDone} 
            className="button-done">{isDone? '안끝남' :'끝남'}</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
