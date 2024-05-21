import React, {useState} from "react";
import { Col, Row, Button } from "react-bootstrap";
import userStore from "../store/userStore";
import taskStore from '../store/taskStore'
import ReplyList from "./ReplyList";

const TodoItem = ({task}) => {
  const [isDone, setIsDone] = useState(false)
  const [editable, setEditable] = useState(false)
  const [editValue, setEditValue] = useState('')

  const {userInfo} = userStore()
  const {deleteTask, updateTask} = taskStore()

  const deleteItem= async (e)=>{
    e.stopPropagation()
    await deleteTask(task._id)
  }

  const handleDone = async (e)=>{
    e.stopPropagation()
    await updateTask(task._id)
    
    setIsDone(!isDone)
  }

  const editItem=()=>{
    if(task.authorId._id === userInfo._id)setEditable(true)
  }

  const handleInputChange =(e)=>{
    setEditValue(e.target.value)
  }
  
  const handleKeyPress = async(e)=>{
    // if(e.key === 'Escape') { //ESC 인식안됨
    //   console.log('esc 눌렸음')
    //   setEditable(false);
    //   setEditValue(task.content); 
    //   return;
    // }
    if(e.key === 'Enter'){
      e.preventDefault()
      await updateTask(task._id,editValue)
      
      setEditable(false)
      setEditValue('')
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <div
          style={{padding:'0 10px'}} 
          onClick={editItem}
          className={`todo-item ${isDone? 'item-complete': ''}
                    ${editable? 'editable':''}`}          
                    >
          {editable ?
            <input 
              type='text' value={editValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={task.task}
              autoFocus
            />
            : <div style={{fontSize:'20px'}}className="todo-content">{task.task}</div>
          }            

          <div style={{display:'flex', alignItems:"center"}}>
            <div style={{fontSize:'20px', marginRight:'10px'}}>
              {(task.authorId)? `by ${task.authorId?.username}` : ''}</div>

            
              { (task.authorId?._id === userInfo._id) ?
                <div>
                  <Button variant="danger"
                    onClick={deleteItem}
                    className="button-delete">삭제</Button>
                  <Button
                    onClick={handleDone} 
                    className="button-done">{isDone? '안끝남' :'끝남'}</Button>
                </div>
                : null
              }
          </div>
        </div>
        
        <ReplyList task={task} />
      </Col>
    </Row>
  );
};

export default TodoItem;
