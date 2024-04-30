import {useState, useEffect} from 'react'
import TodoBoard from "../components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from '../utils/api'
import {Link, useNavigate} from 'react-router-dom'
import userStore from '../store/userStore';

const TodoPage=({setUser})=>{
	const navigate = useNavigate()
	const [todoList, setTodoList] = useState([])
	const [taskValue, setTaskValue] = useState("")
	const {userInfo} = userStore()
	
	const getTasks = async()=>{
		const res = await api.get('/tasks')  //http://localhost:5000/api/tasks
		console.log('get data :', res)
		setTodoList(res.data.data)
	}
	const addTask = async()=>{
		setTaskValue('')
		try{
		//서버로 값 보내기
		const resp = await api.post('/tasks', {task: taskValue, isDone:false})
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
		await getTasks()
	}

	const logout=()=>{
		sessionStorage.clear()
		setUser(null) // PrivateRoute 가 라우팅하는 키는 user이다.
		navigate('/')
	}
	
	useEffect(()=>{
		getTasks()
		console.log('TodoPage userInfo :', userInfo)
	},[])

	

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

			<TodoBoard todoList={todoList} getTasks={getTasks}/>
		</Container>
	);
}



export default TodoPage