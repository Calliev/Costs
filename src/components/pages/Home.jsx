import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'


function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-Vindos ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to = "/NewProject" text="Criar projeto"></LinkButton>
            <img src={savings} alt="costs" />
        </section>
    )
}

export default Home