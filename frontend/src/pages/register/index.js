import React,{useState} from 'react';
import{Link,useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import imagem from '../../assests/logo.jpg'
import  './stylesr.css'
import api from '../../services/api'




export default function Logon(){
    const [name,setName]= useState('');
    const [whatsapp,setWhatsapp]= useState('');
    const [email,setEmail]= useState('');

    const history = useHistory();

    async function register(e){
        e.preventDefault();

        const data ={
            name,
            whatsapp,
            email
        };

       try{ const response = await api.post('donos',data);

       alert(`seu ID de acesso: ${response.data.id}`);

       history.push('/');

       
    }catch(err){
        alert('erro no cadastro , tente novamente');
    }

        

    }
    return(
        <div className="register-conatiner">
            <div className="content-register">
         <section >
             <img  src={imagem} alt="petslogo" />

             <span>Cadastre para Encontrar seu pet , ou ajude um a voltar para seu lar</span>

             <Link  className="back-link"  to="/">
                            <FiArrowLeft size={16} color="#e02041 "/>
                            retornar para o logon
         </Link>

         </section>

              
            
            <form onSubmit={register}>
            <h1>Faça Seu Cadastro</h1>

                <input type="text" 
                placeholder="Digite seu nome"
                value={name}
                onChange ={e=> setName(e.target.value)}/>
                
                <input 
                type="email" 
                placeholder="Digite seu E-mail"
                value={email}
                onChange={e=>setEmail(e.target.value)}/>

                <input  placeholder="Digite seu whatsapp"
                value={whatsapp}
                onChange={e=>setWhatsapp(e.target.value)}/>

                <button className="button" type="submit">Cadastrar</button>

            </form>
          

        
            </div>
        </div>
    );
}