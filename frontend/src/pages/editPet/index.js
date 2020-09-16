import React,{useState,useEffect} from 'react';
import{Link,useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from    '../../services/api'

import imagem from '../../assests/images.png'
import  './editarpet.css'
import cat from '../../assests/pet-cat.png'



export default function Logon(){
    const [infospet,setInfosPet]=useState([]);
    const [name,setPetName]=useState('');
    const [recompensa,setRecompensa]=useState('');
    const [description,setDescription]=useState('');

    const history = useHistory();


    const  pet_id = localStorage.getItem('pet_id')

    useEffect(()=>{
        api.get('umpet',{
            headers:{
                authorization:pet_id,
            }
        }).then(response=>{setInfosPet(response.data)})
    },[pet_id]);


    async function Editar(e){
        e.preventDefault();

        const data = ({
            name:name,
            value:recompensa,
            description:description,
        })

       try{
        api.put('pets',data,{
            
            headers:{
                authorization:pet_id,
            }
        });

        history.push('/meuspets')


       }catch(err){
           alert('erro ao Editar seu pet, tente novamente')
       }

    }
      
    return(
        <div className="edit-contanier">
            <div className="edit-content">
         <section>
             <img className="imagemLogo" src={cat} alt="petslogo" />

             <span>Cadastre seu pet, para Encontra-lo. Se desejar ofereça uma recompensa (nao e obrigatorio)</span>

             <Link  className="back-link"  to="/meuspets">
                            <FiArrowLeft size={16} color="#e02041 "/>
                            retornar 
         </Link>

         </section>

              {infospet.map(info=>(
        <form onSubmit={Editar} key={info.pet}>
            <h1>Atualize as informações do pet</h1>
                <input type="text" 
                placeholder={`nome: ${info.name}`}
                value={name}
                onChange={e=>setPetName(e.target.value)}
                />

                <input  
               
                value={recompensa}
                placeholder={`recompensa: ${info.value}`}
                onChange={e=>setRecompensa(e.target.value)}/>

                <textarea  placeholder={`descriçao: ${info.description}`}
                 value={description}
                 onChange={e=>setDescription(e.target.value)}/>
                <button class="button"type="submit">Salvar alterações</button>

               

            </form>
             
            
               
            
        
          
))}
            
            
        
            </div>
        </div>
    );
}