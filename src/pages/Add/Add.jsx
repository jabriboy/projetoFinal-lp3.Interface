import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios'
import "./style/AddStyle.css"
import { useNavigate } from "react-router-dom"

function Add(){
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    const contact = useSelector((state) => state.contact.value);
    const chat = useSelector((state) => state.chat.value);

    const schema = yup.object().shape({
        username: yup.string().min(3).required("username is required")
    })

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        var idUser2 = 0;
        var chats = [];
        await axios.get(`http://localhost:5127/username/${data.username}`).then((res) => {
            idUser2 = res.data.id
        })
        await axios.get("http://localhost:5127/chat").then((res) => {
            chats = res.data
        })
        var size = chats.length
        var lastId = chats[size-1].id + 1;
        await axios.post(`http://localhost:5127/chat?id=${lastId}&idUser1=${user.id}&idUser2=${idUser2}`).then((res) => {
            if(res.data){
                navigate('/chat')
            }
        });
    }

    return(
        <>
        <div className="add">
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="div-add">
                        <h2>Adicionar Contato</h2>
                        <p className="desc">Digite o nome de usuário que deseja adicionar</p>
                        <div className="username">
                            <label htmlFor="username">username: </label>
                            <input placeholder="ex: jabri" type="text" name="username" id="username" {...register("username")}/>
                            <p>{errors.username?.message}</p>
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

export default Add;