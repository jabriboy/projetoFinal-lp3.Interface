import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import {loginUser} from "../../store"
import {useDispatch} from 'react-redux'

import "./style/LoginStyle.css"
import { useEffect, useState } from "react"

function Login(){
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:5127/user").then((res) => {
            setUsers(res.data)
        })
    }, [])

    const schema = yup.object().shape({
        username: yup.string().min(3).required("username is required"),
        password: yup.string().min(4).max(16).required("password is required")
    })

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        users.map(u => {
            if(u.username == data["username"]){
                if(u.password == data["password"]){
                    dispatch(loginUser({
                        id: u.id
                    }))
                    navigate('/chat');
                }
                return;
            }
        });
    }

    return(
        <>
        <div className="login">
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="div-form">
                        <h2>login</h2>
                        <div className="username">
                            <label htmlFor="username">username: </label>
                            <input placeholder="ex: jabri" type="text" name="username" id="username" {...register("username")}/>
                            <p>{errors.username?.message}</p>
                        </div>
                        <div className="password">
                            <label htmlFor="password">password: </label>
                            <input placeholder="ex: 1234" type="password" name="password" id="password" {...register("password")}/>
                            <p>{errors.password?.message}</p>
                        </div>
                        <div className="div-btn">
                            <button type="submit">submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;