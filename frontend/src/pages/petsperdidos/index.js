import React,{useEffect,useState} from 'react'
import {Link,useHistory} from  'react-router-dom'
import{FiPower} from 'react-icons/fi'
import api from '../../services/api'

import Logo from '../../assests/logo.jpg'
import Imgpet from '../componente/imgpetsperdidos'

import './stylespp.css'

export default function PetsPerdidos(){
    const [pets,setPets]= useState([]);
    
  
    const donoName = localStorage.getItem('donoName')

    const history = useHistory();

    useEffect(()=>{
       

            api.get('pets').then(response => setPets(response.data));

            localStorage.removeItem('pet_id');
    })

 

    function Position(id){
        localStorage.setItem('pet_id',id);

        history.push('/position/new')

        
    }

    function Logaut(){
        localStorage.removeItem('pet_id');
        localStorage.removeItem('dono_id');
        localStorage.removeItem('donoName');

        history.push('/')
    }

    return (
    <div className="petsperdidos-container" >

        
         <header>
             <img src={Logo} alt="logo"></img>
             <span>Seja Bem-Vindo, {donoName}!</span>
               

                <Link class="button" to="/meuspets">Meus Pets</Link>

                <button onClick={()=>Logaut()} type="button">
                <FiPower/>
                </button>
        </header>
        <h1>Pets perdidos</h1>

      
       
 
        <ul>
            {pets.map(pet =>(
                
                <li>
            <h3>{pet.name}</h3>
            <section>
                  <Imgpet pet={pet}></Imgpet>
                  
            </section>

                <strong>Whatsapp:</strong>
                <p>{pet.whatsapp}</p>

                <strong>Recompensa</strong>
                <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(pet.value)}</p>

                <strong>Descrição:</strong>
                <p>{pet.description}</p>
                <Link className="button" onClick={()=>Position(pet.id)}>
                    Adicionar localização
                    
                </Link>

            </li>
            ))}
           
        </ul>
      
    </div>
       
    );
}