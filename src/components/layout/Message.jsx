import styles from './Message.module.css'
import{useState, useEffect} from 'react'

function Message({type, msg}){
    
    const [visible, setVisible] = useState(false)// estou alterando a visibilidade, quero que essa msg suma depois que passar 3 seg 
    
    useEffect(()=>{

        if(!msg){
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(()=>{
            setVisible(false)
        }, 300)

        return () => clearTimeout (timer)

    }, [msg])// useeffect sempre tem que estar ligafo a alguem, nesse caso ele esta ligado a msg
    //vou usar o useeffetc como timer tbm
    
    return(
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}

export default Message