import React,{useState} from 'react';
import{Link,useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from    '../../services/api'

import imagem from '../../assests/images.png'
import  './stylesnpt.css'
import cat from '../../assests/pet-cat.png'



export default function Logon(){
    const [name,setPetName]=useState('');
    const [recompensa,setRecompensa]=useState('');
    const [description,setDescription]=useState('');
  
    const history = useHistory();

    const donoid = localStorage.getItem('dono_id')
   
 
    async function register(e){
        e.preventDefault();

        const data = ({
            name,
            value:recompensa,
            description,
        })

       try{
        api.post('pets',data,{
            
            headers:{
                authorization:donoid,
            }
        });

        history.push('/meuspets')


       }catch(err){
           alert('erro ao adicionar novo pet, tente novamente')
       }

    }
      
    return(
        <div className="newpet-container">
            <div className="newpet-content">
         <section >
             <img className="imagemLogo" src={cat} alt="petslogo" />

             <span>Cadastre seu pet, para Encontra-lo. Se desejar ofereça uma recompensa (não e obrigatorio)</span>

             <Link  className="back-link"  to="/meuspets">
                            <FiArrowLeft size={16} color="#e02041 "/>
                            retornar 
         </Link>

         </section>

              
            
            <form onSubmit={register}>
            <h1>Cadastre seu Pet</h1>
                <input type="text" 
                placeholder="Digite o nome do pet"
                value={name}
                onChange={e=>setPetName(e.target.value)}
                />

                <input  
                placeholder="Digite o valor da recompensa"
                value={recompensa}
                onChange={e=>setRecompensa(e.target.value)}/>

                <textarea  placeholder="Digite uma Descrição do pet, ou algo para ajudar a localiza-lo"
                 value={description}
                 onChange={e=>setDescription(e.target.value)}/>
                 <button className="button" type="submit">Cadastrar</button>

                  

            </form>
          
            </div>
        

        </div>
    );
}