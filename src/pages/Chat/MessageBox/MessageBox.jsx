import { useEffect, useState } from 'react';
import './style/MessageBoxStyle.css'
import {useDispatch, useSelector} from "react-redux"

function MessageBox(props){
    const user = useSelector((state) => state.user.value);
    const [margin, setMargin] = useState("")

    useEffect(() => {
        if(props.idUser == user.id){
            setMargin("auto");
        } else{
            setMargin("0");
        }
        
    }, [props.message])

    return(
        <>
        <div className="message-box" style={{
            marginLeft: margin
        }}>
            <p>{props.message}</p>
        </div>
        </>
    )
}

export default MessageBox;