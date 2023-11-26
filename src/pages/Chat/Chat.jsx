import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useNavigate} from "react-router-dom"
import MessageBox from "./MessageBox/MessageBox";
import Contact from "./Contact/Contact";
import "./style/ChatStyle.css"
import { Link } from "react-router-dom";

import {useDispatch, useSelector} from "react-redux"

import axios from 'axios'
import React, { useRef, useEffect, useState } from "react";

function Chat(){
    
    const schema = yup.object().shape({
        message: yup.string().min(1).required()
    })

    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [updateMessages, setUpdateMessages] = useState(true);

    const user = useSelector((state) => state.user.value);
    const contact = useSelector((state) => state.contact.value);
    const chat = useSelector((state) => state.chat.value);

    const scrollViewRef = useRef(null);

    useEffect(() => {
        scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }, [updateMessages, messages]);
    
    // get messages for the chosen contact
    useEffect(() => {
        // id do chat
        console.log(chat.id)
        if(chat.id != ""){
            axios.get(`http://localhost:5127/getAllInChat/${chat.id}`).then((res) => {
                setMessages(res.data)
            })
        }
    }, [chat.id, updateMessages, contact])

    // get the contacts for the set user
    useEffect(() => {
        axios.get(`http://localhost:5127/chat/getByUserId?userId=${user.id}`).then((res) => {
            setContacts(res.data)
        })
    }, [])

    const onSubmit = async (data) => {
        if(chat.id != ""){
            await axios.post(`http://localhost:5127/message?idChat=${chat.id}&idUser=${user.id}&message1=${data.message}`);
        }
        setUpdateMessages(!updateMessages)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
          e.target.value += '\n';
        }
        else if (e.key === 'Enter'){
            e.preventDefault();
            handleSubmit(onSubmit)();
            e.target.value = ''
        }
    };

    return(
        <>
            <div className="chat">
                <div className="container">
                    <div className="chat-box">
                        <div className="contatos-nav">
                            <h2>{user.username}</h2>
                            <hr />
                            <div className="contatos-bar" style={{ overflowY: 'auto', height: '200px' }}>
                                {contacts.map(contact => {
                                    return (
                                        <Contact key={contact.id} chatId={contact.id} user1Id={contact.idUser1} user2Id={contact.idUser2}/>
                                    )
                                })}
                            </div>
                            <div className="addContatoBtn"><Link to={"/add"}>+</Link></div>
                        </div>
                        <div className="chat-messages">
                            <h2>{contact.username}</h2>
                            <hr />
                            <div className="background-messages" style={{ overflowY: 'auto', height: '200px' }} ref={scrollViewRef}>
                                {messages.map(message => {
                                    return(
                                        <MessageBox key={message.id} idUser={message.idUser} message={message.message1}/>
                                    )
                                })}
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="message-bar">
                                    <textarea rows={3} cols={50} id="message" placeholder="type here..." onKeyDown={handleKeyDown} {...register("message")}/>
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