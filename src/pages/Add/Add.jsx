import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"

import "./style/AddStyle.css"

function Add(){
    const schema = yup.object().shape({
        username: yup.string().min(3).required("username is required")
    })

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data)
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