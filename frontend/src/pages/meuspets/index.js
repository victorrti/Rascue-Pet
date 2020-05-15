import React,{useEffect,useState} from 'react'
import {Link,useHistory} from  'react-router-dom'
import{FiEdit,FiImage, FiTrash2} from 'react-icons/fi'
import api from '../../services/api'


import Logo from '../../assests/images.png'

import ImgPet from '../componente/imgmeuspets'

import './stylesmp.css'

export default function PetsPerdidos(){
    
    const [pets,setPets]= useState([]);
    const history = useHistory();

    const dono_id = localStorage.getItem('dono_id');
  
useEffect(()=>{
        api.get('meuspets',{
            headers:{
                authorization:dono_id,
            }

        }).then(response=>{setPets(response.data)})
        localStorage.removeItem('pet_id');
    },[dono_id]);

    function Position(id,local){
        localStorage.setItem('pet_id',id);

        history.push(`/${local}`)

        
    }
    
    async function DeletePet(id){
        try{ 
         await api.delete(`pets/${id}`,{
             headers:{
                 authorization:dono_id
             }
         });
         setPets(pets.filter(pet=> pet.id!== id))

       

       
    }catch(err){
        alert(err);
    }

    }
  

 

    
    return (
    <div className="meuspets-container">

        
         <header>
             
             <img src={Logo} alt="logo"></img>
             <Link class="button" to="/petsperdidos">home</Link> 
             <Link class="button" to="/newpet">Cadastrar Pet</Link>
               
                
               

                
        </header>
       
        <h1>Meus Pets</h1>
        <ul>
            {pets.map(pet=>(
            <li  key={pet.id}>
                <h3>{pet.name}</h3>
            
            <Link className="editar" onClick={()=>Position(pet.id,'editar')}><FiEdit/> editar pet</Link>
            <Link className="editar" onClick={()=>Position(pet.id,'adicionar-imagem')}><FiImage/> adicionar imagem</Link>
            <button onClick={()=>DeletePet(pet.id)}><FiTrash2></FiTrash2></button>
            
            <header>
            
            
            
            
            </header>
            <section>
                <ImgPet pet={pet}></ImgPet>
                
            
            </section>
            
            <strong>recompensa:</strong>
            <p>{pet.value}</p>
            
 
            <strong>Descrição:</strong>
            <p>{pet.description}</p>
           
            
           
           <form>

               
                

                      
        </form>
            

           <Link className="button" onClick={()=>Position(pet.id,'position')}>Ver Localizaçoes</Link>
            

        </li>
        ))}
        
        </ul>
      
    </div>
       
    );
}