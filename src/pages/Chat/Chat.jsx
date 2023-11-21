import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"

import MessageBox from "./MessageBox/MessageBox";
import Contact from "./Contact/Contact";
import "./style/ChatStyle.css"
import { Link } from "react-router-dom";

function Chat(){
    const schema = yup.object().shape({
        message: yup.string().min(1).required()
    })

    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
          e.target.value += '\n';
        }
        else if (e.key === 'Enter'){
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return(
        <>
            <div className="chat">
                <div className="container">
                    <div className="chat-box">
                        <div className="contatos-nav">
                            <h2>user</h2>
                            <hr />
                            <Contact/>
                            <Contact/>
                            <Contact/>
                            <div className="addContatoBtn"><Link to={"/add"}>+</Link></div>
                        </div>
                        <div className="chat-messages">
                            <h2>user 2</h2>
                            <hr />
                            <div className="background-messages">
                                <MessageBox/>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="message-bar">
                                    <textarea rows={3} cols={50} type="text" name="message" id="message" placeholder="type here..." onKeyDown={handleKeyDown} {...register("message")}/>
                                    <div className="sendMessageBtn">
                                        <button type="submit">
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12.5" cy="12.5" r="12.5" fill="#3CC9D2"/>
                                            <path d="M22 13L7 20.7942L7 5.20577L22 13Z" fill="#D9D9D9"/>
                                            <line x1="2" y1="13" x2="15" y2="13" stroke="#3CC9D2" strokeWidth="2"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;