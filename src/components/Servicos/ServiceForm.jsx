import {useState} from 'react'

import Inputs from '../Form/input'
import Submit from '../Form/Submit'

import styles from '../projects/ProjectForm.module.css'

function ServiceForm ({handleSubmit, btnText, projectData}){
     //para alterar o estado eu preciso ter ele, por isso uso o useState
        const [service, setService] = useState({})
    
    
    function submit(e){
        e.preventDefault()// nao envia o formulario
        projectData.services.push(service)// isso e se caso eu tiver mais que um servico, alterando o obj original
        handleSubmit(projectData)
    }


    // vou criar o metodo aqui e ele vai receber o evento
    function handleChange (e){
        setService({...service, [e.target.name]: e.target.value})// pego tudo que tem no obj e altero o valor, entao quando eu tiver preenchendo la, ele altera o valor que e padrao para o que eu preencher
    }
    
    return(
        <form onSubmit={submit} className={styles.form}>
            <Inputs
                type='text'
                text='Nome do servico'
                name='name'
                placeholder='Insira o nome do servico'
                handleOnChange={handleChange}
            />

            <Inputs
                type='number'
                text='Custo do servico'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
            />

            <Inputs
                type='text'
                text='Descricao do servico'
                name='description'
                placeholder='Descreva o servico'
                handleOnChange={handleChange}
            />

            <Submit text={btnText}/>
        </form>
    )// hancdleonchange faz a mudanca do estado
}

export default ServiceForm