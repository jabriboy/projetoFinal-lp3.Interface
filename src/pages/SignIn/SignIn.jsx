import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import {loginUser, logoutUser, resetChat, resetContact} from "../../store"
import {useDispatch} from 'react-redux'

import "./style/SignIn.css"
import { useEffect, useState } from "react"

function SignIn(){
    const navigate = useNavigate();

    const dispatch = useDispatch();

    dispatch(logoutUser());

    const schema = yup.object().shape({
        username: yup.string().min(3).required("username is required"),
        password: yup.string().min(4).max(16).required("password is required"),
        password2: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
    })

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        await axios.post(`http://localhost:5127/user/post?username=${data.username}&password=${data.password}`).then((res) => {
            dispatch(loginUser({
                id: res.data.id,
                username: res.data.username
            }))
            dispatch(resetContact())
            dispatch(resetChat())
            navigate('/chat')
        })
    }

    return(
        <>
        <div className="signin">
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="div-form">
                        <h2>sign in</h2>
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
                        <div className="password">
                            <label htmlFor="password2">password: </label>
                            <input placeholder="ex: 1234" type="password" name="password2" id="password2" {...register("password2")}/>
                            <p>{errors.password2?.message}</p>
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

export default SignIn;