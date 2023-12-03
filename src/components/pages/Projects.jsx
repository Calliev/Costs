import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Message from "../layout/Message"
import Container from '../layout/Container'
import Loading from "../layout/Loading"
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../projects/ProjectCard"

import styles from './Projects.module.css'


function Project(){
    
    // vou criar um state pra salvar os projetos
    const [projects, setProjects] = useState([])

    const [removeLoading, setRemoveLoading] = useState(false)

    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()// aqui eu vou resgatar aquela minha msg do navigate
    let message = ''
    if(location.state){
        message = location.state.message
    }

    //vou fazer um request no banco pra buscar meu projeto usando o fetch
    useEffect(() => {
        setTimeout(
            () => {
                fetch(`http://localhost:5000/projects`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })// vou inserir alguns parametro dentro do fetch
                .then ((resp) => resp.json())
                .then ((data) => {
                setProjects(data)
                setRemoveLoading(true)
                })
                .catch(err => console.log(err))
            }, 300)
    }, [])

    //vou criar o remove no componente pai, pq sera mais facil se eu quiser reutilizar em outro lugar, melhora o dinamismo
    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then ((resp) => resp.json())
        .then (() => {
            //pega os dados e aplica um filtro de remocao, do front e do back
            setProjects(projects.filter((project) => project.id !== id))
            // mensage que o arquivo foi deletado
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to = "/NewProject" text="Criar projeto"></LinkButton>
            </div>
            {message && <Message type='success' msg={message} />}
            {projectMessage && <Message type='success' msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => <ProjectCard 
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project?.category?.name}
                    key = {project.id}
                    handleRemove={removeProject}
                    />)}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&(
                    <p>Não há projetos cadastrados!</p>
                )
                }
            </Container>
        </div>
    )
}

export default Project