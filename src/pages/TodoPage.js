import {useState, useEffect} from 'react'
import TodoBoard from "../components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from 'react-router-dom'
import userStore from '../store/userStore';
import taskStore from '../store/taskStore';
import replyStore from '../store/replyStore';

const TodoPage=({setUser})=>{
	const navigate = useNavigate()
	const [taskValue, setTaskValue] = useState("")
	const {userInfo} = userStore()
	const {createTask, taskList, getTasks, taskUpdated} = taskStore()
	const {replyUpdated} = replyStore()
	const addTask = async()=>{
		setTaskValue('')
		await createTask(taskValue)
	}

	const logout=()=>{
		sessionStorage.clear()
		setUser(null) // PrivateRoute 가 라우팅하는 키는 user이다.
		navigate('/')
	}
	
	useEffect(()=>{
		getTasks()
	},[taskUpdated, replyUpdated])

	

	return (
		<Container>
			<div style={{display:'flex', justifyContent:'end', alignItems:'center', marginTop:"20px"}}>
				<div style={{marginRight:'30px'}}>{userInfo?.username}</div>
				<div onClick={logout}>
					<Link to='/'>Logout</Link>
				</div>
			</div>
			<Row className="add-item-row">
				<Col xs={12} sm={10}>
				<input
					type="text"
					placeholder="할일을 입력하세요"
					className="input-box"
					value={taskValue}
					onChange={(e)=> setTaskValue(e.target.value)}
				/>
				</Col>
				<Col xs={12} sm={2}>
				<button 
					onClick={addTask}
				className="button-add">추가</button>
				</Col>
			</Row>

			<TodoBoard todoList={taskList} />
		</Container>
	);
}



export default TodoPage