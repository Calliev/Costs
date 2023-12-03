import { useState, useEffect } from 'react'

import Inputs from '../Form/input'
import Select from '../Form/Select'
import Submit from '../Form/Submit'

import styles from './ProjectForm.module.css'

function Forms({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([])//aqui ele ta com um array vazio
    const [project, setProject] = useState(projectData || {})
    
    //Vou fazer um request com fetch api para minha url categories
    useEffect(()=>{
    fetch('http://localhost:5000/categories', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',// aqui estou determinando o tipo da aplicacao e dizendo que quero receber em formato json
        },
    })
    .then((resp) => resp.json())
    .then((data)=>{setCategories(data)})
    .catch((err)=> console.log(err))
    }, [])
    //to fazendo um request pra api, to pedindo infos de la (NOME DISSO É PROMISSES)
    //o primeiro then usa uma arrow function retornando um arquivo json, ou seja ele e implicito, para usar eu preciso desestruturar
    //no segundo then eu to pegando os dados e ta colocando no hook setCategories para pode usa-los

    const submit = (e)=>{
        e.preventDefault()
        handleSubmit(project)
    } 

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value })// independente do input que eu preencher vai mudar alguma propriedade desse cara que for de texto
        //vai funcionar em qualquer formulario que tenha um input que a gente digita.
        // Ele preenche automaticamento os dados no meu back end
    }

    function handleCategory(e){
        setProject({
            ...project, 
            category:{
            id: e.target.value,// ele vai passar o valor da categoria que vai ser o input
            name: e.target.options[e.target.selectedIndex].text,
            },
        }) 
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Inputs 
            type="text" 
            text="Nome do Projeto" 
            name="name" 
            placeholder="Insira o nome do projeto" 
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}
            /> 

            <Inputs 
            type="number" 
            text="Orçamento do projeto" 
            name="budget" 
            placeholder="Insira o orçamento total"
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ''}
            />
        
        <Select 
        name="category_id" 
        text="Selecione a categoria" 
        options={categories} 
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
        />

        <Submit text={btnText}/>
        </form>
    )
}

export default Forms