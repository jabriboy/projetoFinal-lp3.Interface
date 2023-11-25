import './style/ContactStyle.css'

function Contact(props){
    return(
        <>
        <div className="contact">
            <div className="username">
                <p>{props.chatId}</p>
            </div>
        </div>
        </>
    )
}

export default Contact;