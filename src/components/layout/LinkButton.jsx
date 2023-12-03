import {Link} from 'react-router-dom'
import styles from './LinkButton.module.css'

//props to é pra dizer pra onde ele vai quando eu clicar pra ser dinamico
function LinkButton ({to, text}){
    return(
        <Link className={styles.btn} to = {to}>
            {text}
        </Link>
    )
}

export default LinkButton