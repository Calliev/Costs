import {useNavigate} from 'react-router-dom'

import Forms from '../projects/ProjectForm'

import styles from './NewProject.module.css'

function NewProject (){

    const navigate = useNavigate()// me permite fazer os redirecionamento para outra pag

    function createPost(project){

        //inicializar o cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),// to mandando os dados do servidor
        }).then((resp) => resp.json())
        .then((data) =>{// ele pega meus dados e faz e salva ou faz o que o sistema mandar
            console.log(data)
            //redirect
            navigate('/projects',  { state: { message: 'Projeto criado com sucesso!' }})
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Forms handleSubmit={createPost} btnText = "Criar Projeto"/>
        </div>
    )
}

export default NewProject