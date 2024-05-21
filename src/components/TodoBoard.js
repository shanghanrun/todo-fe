import React from "react";
import TodoItem from './TodoItem'

const TodoBoard = ({todoList}) => {
  return (
    <div>
      <h2>Todo List</h2>
      <div style={{color:'black'}}>할 일을 클릭하면 수정할 수 있습니다. 단 작성자만 수정가능^^</div>
      { todoList? (todoList.map((task)=>(
        <TodoItem key={task._id} task={task} />
      )))
      : (<h2>There is no Item to show</h2>)
      }
      
    </div>
  );
};

export default TodoBoard;
