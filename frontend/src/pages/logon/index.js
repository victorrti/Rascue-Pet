import React,{useState} from 'react';
import{Link,useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'
import api from '../../services/api'





import imagem from '../../assests/images.png'
import logo from '../../assests/pets.jpg'

import './stylesl.css'

export default function Logon(){
    const [id,setId]= useState('');

    const history = useHistory();
 
     async function Login(e){
         e.preventDefault();

         

        try{
            const response = await api.post('sessions',{id})

            localStorage.setItem('dono_id',id);

            localStorage.setItem('donoName',response.data.name)

            history.push('/petsperdidos')

        }catch(err){
            alert('erro no login, tente novamente');
        }

     }

    return(
        <div className="logon-container">
         <section className="form">
             <img  src={imagem} alt="petslogo" />
              
            
            <form onSubmit={Login}>
            <h1>Faça Seu Logon</h1>
                <input type="text" 
                placeholder="Digite seu ID"
                value={id}
                onChange={e => setId(e.target.value)}/>
                <button className="button" type="submit">Entrar</button>

            </form>
            <Link  className="back-link"  to="/register">
                            <FiLogIn size={16} color="#e02041 "/>
                            nao tenho cadastro
         </Link>

            



         </section>
         <img src= {logo} alt = "petsImagem"/>

        </div>
    );
}