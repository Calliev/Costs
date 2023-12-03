import styles from './Container.module.css'

function Container (props){
    return(
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {props.children}
        </div>
    )
}
// PARA ESXECUTAR AS CLASSES DINAMICAS EU VOU TER QUE EXECUTAR JS NO MEU STYLE TRANFORMANDO ELE EM {`${styles.container}`
//Alem disso vou querer adicinonar estilo das minhas props entao vou ter que passar como uma variavel tbm `${styles.[props.customClass]}` === É assim pq ele vai vir o estilo do props de outra pagina

export default Container