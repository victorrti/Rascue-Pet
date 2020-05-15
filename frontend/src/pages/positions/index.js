import React,{useState,useEffect} from 'react'
import {Link} from  'react-router-dom'

import api from '../../services/api'

import Logo from '../../assests/images.png'

import './stylespst.css'



export default function PetsPerdidos(){
    const [pets,setPets] = useState([]);

    const pet_id = localStorage.getItem('pet_id');
    const dono_id = localStorage.getItem('dono_id');
    useEffect(()=>{
        api.get('positions',{
            headers:{
                donoauthorization:dono_id,
                authorization:pet_id,
            }
        }).then(response=>{setPets(response.data)})
    },[pet_id,dono_id]);

    

    return (
        
        
    <div className="position-container">

        
         <header>
             <img src={Logo} alt="logo"></img>
               
                <Link class="button" to="/meuspets">Meus Pets</Link>
               

                
        </header>
       
        <h1>Ultimas localizaçoes do pet </h1>
        <ul>
        {pets.map(pet=>(
           
            <li>
            
            <header>
            <img src={Logo} alt="imagem pet"></img>
            
    
            </header>
           
            

            <strong>RUA:</strong>
            <p>{pet.rua}</p>

            <strong>NUMERO:</strong>
            <p>{pet.numero}</p>

            <strong>BAIRRO:</strong>
            <p>{pet.bairro}</p>

            <strong>CIDADE:</strong>
            <p>{pet.cidade}</p>

            <strong>DESCRIÇAO:</strong>
             <p>{pet.description}</p>
            
           

           
            

        </li>
        ))}
        
        </ul>
      
    </div>   
       
    );
}