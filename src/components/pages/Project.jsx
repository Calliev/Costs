import {parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../projects/ProjectForm'
import ServiceForm from '../Servicos/ServiceForm'
import ServiceCard from '../Servicos/ServiceCard'

function Projeto(){
    //vou pegar os dados do bds para exibir nessa pag
    //ele com o id pela url entao por isso eu vou usar o params
    const {id} = useParams()

    const [project, setProject] = useState()

    // estado que do card de servicos cadastrados
    const [services, setServices] = useState()

    //const que vai mostrar ou nao o meu projeto
    const [showProjectForm, setShowProjectForm] = useState(false)

    //const que vai me permitir adc dados
    const [showServiceForm, setShowServiceForm] = useState(false)

    //estado que representa as msgn da func edit
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        // Para ver o loading
        setTimeout(
            () =>
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
                //setServices(data.services)
            }),
        500,
        )
    }, [id])

    //essa function é uma requisicao externa
    function editPost( project){
        setMessage('')

        // budget validation, validacao do meu dinheiro total, ele nao pode ser menor do que o custo
        if(project.budget < project.cost){
            setMessage('O projeto ultrapassa o orçamento.')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),// to enviando os dados como texto
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch(err => console.log (err))

    }

    //vou salvar o projeto com os servicos
    function createService( project){
        setMessage('')
        //ultimo servico
        const lastService = project.services[project.services.length - 1]// aqui eu pego o servico atual que to criando

        lastService.id = uuidv4() // aqui eu gero um id unico pra ele

        const lastServiceCost = lastService.cost

        // custo atual do projeto mais o custo do ultimo projeto criado
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //validcao de valor maximo de custo
        //parseFloat converte em numero
        if (newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado!')
            setType('error')
            project.services.pop()// to removendo esse servico do projeto
            return false
        }

        // adc meu custo do servico
        project.cost = newCost

        // att meu projeto
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setShowServiceForm(false)
        })
        .catch(err => console.log (err))
    }

    function removeService(id, cost) {
        // vou criar uma att do servico
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id,//aqui so vai ficar os servicos que NAO tem o id igual ao que esta sendo removido
        )
    
        const projectUpdated = project
    
        projectUpdated.services = servicesUpdated // obj que manda a remocao pro meu backend
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)//aqui eu removo o custo do servico do valor total disponibilizado para o projeto
    
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectUpdated),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
        })
    }

    function toggleProjectForm(){
        //to mudando a versao do use state e aqui ele vai mostrar meus dados
        setShowProjectForm (!showProjectForm)
    }

    function toggleServiceForm(){
        //to mudando a versao do use state e aqui ele vai mostrar meus dados
        setShowServiceForm (!showServiceForm)
    }


    
    return(
        // condicao ternaria pra mostrar o loading, caso dados nao tenha sido carregado ainda
    <>
        {project ?(
            <div className={styles.project_details}>
                <Container customClass = "column">
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>             
                        {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ?(
                            <div className={styles.project_info}>
                                <p> <span>Categoria: </span> {project.category.name}
                                </p>
                                <p><span>Total de Orçamento: </span>R${project.budget}
                                </p>
                                <p><span>Total Utilizado: </span>R${project.cost}
                                </p>
                            </div>
                        ):(

                            <div className={styles.project_info}>
                                <ProjectForm 
                                handleSubmit={editPost} 
                                btnText = 'Concluir Edição' 
                                projectData={project} 
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>             
                            {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm &&(
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText='Adicionar Servico'
                                        projectData={project}
                                    />)
                                }
                            </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass = 'start'>
                                {services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard
                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService}
                                        />
                                    ))
                                }
                                {services.length === 0 && 
                                    <p>Não há serviços cadastrados neste projeto.</p>
                                }
                    </Container>
                </Container>
            </div>
        ): (<Loading/>)}
    </>
    )// vou fazer um map pra mostrar os services
}

export default Projeto