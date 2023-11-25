import './style/MessageBoxStyle.css'

function MessageBox(props){
    return(
        <>
        <div className="message-box">
            <p>{props.message}</p>
        </div>
        </>
    )
}

export default MessageBox;