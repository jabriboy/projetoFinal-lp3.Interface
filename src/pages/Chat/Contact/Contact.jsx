import axios from 'axios';
import './style/ContactStyle.css'
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from 'react';
import {setContact, setChat} from '../../../store'

function Contact(props){
    const dispatch = useDispatch();
    const contact = useSelector((state) => state.contact.value);
    const chat = useSelector((state) => state.chat.value);
    const user = useSelector((state) => state.user.value);
    const [username, setUsername] = useState(null)

    useEffect(() => {
        var id = 0;
        if(props.user2Id == user.id){
            id = props.user1Id
        }
        else{
            id = props.user2Id
        }
        axios.get(`http://localhost:5127/${id}`).then((res) => {
            setUsername(res.data.username)
        })
    }, [chat.id])

    const handleContactSelector = () => {
        dispatch(setContact({
            id: props.user2Id == user.id ? props.user1Id : props.user2Id,
            username: username
        }))

        dispatch(setChat({
            id: props.chatId,
            user1Id: props.user1Id,
            user2Id: props.user2Id
        }))
    }

    return(
        <>
        <div className="contact">
            <div className="username" onClick={handleContactSelector}>
                <p>{username}</p>
            </div>
        </div>
        </>
    )
}

export default Contact;