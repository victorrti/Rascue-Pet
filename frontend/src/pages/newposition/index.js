import React,{useState} from 'react';
import{Link,useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'

import imagem from '../../assests/images.png'
import  './stylesnp.css'





export default function Logon(){
    const[rua,setRua] = useState('');
    const[numero,setNumero] = useState('');
    const[bairro,setBairro] = useState('');
    const[cidade,setCidade] = useState('');
    const[uf,setUf] = useState('');
    const[description,setDescription] = useState('');

    const history = useHistory();

    const pet_id = localStorage.getItem('pet_id')
 
    async function registerPositions(e){
        e.preventDefault();

        const data = ({
            rua,
            numero,
            bairro,
            cidade,
            uf,
            description,
        })

       try{
        api.post('positions',data,{
            
            headers:{
                authorization:pet_id,
            }
        });

        history.push('/petsperdidos')


       }catch(err){
           alert('erro ao adicionar nova posição, tente novamente')
       }

    }
    return(
        <div className="registerPosition-container" >
            <div className="registerPosition-content">
                <section>
                    <img  src={imagem} alt="petslogo" />

                     <span>Cadastre o local que viu ou onde esta localizado o pet, utilize a descrição para dar mais detalhes.</span>

                        <Link  className="back-link"  to="/petsperdidos">
                            <FiArrowLeft size={16} color="#e02041 "/>
                            retornar 
                        </Link>

                </section>

              
            
                <form onSubmit={registerPositions}>
                    <h1>Cadastre as informações da localização</h1>

                    <input type="text"
                    placeholder="Digite a rua "
                    value={rua}
                    onChange={e => setRua(e.target.value)}/>

                    <input 
                    placeholder="digite o numero"
                    value={numero}
                    onChange={e => setNumero(e.target.value)}
                    />

                    <input  placeholder="Digite o bairro"
                    value={bairro}
                    onChange={e => setBairro(e.target.value)}
                    />

                    <input  
                    placeholder="Digite a cidade"
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                    />

                    <input  
                    placeholder="Digite o estado"
                    maxlength="3"
                    value={uf}
                    onChange={e => setUf(e.target.value)}
                    />

                    <textarea 
                    placeholder="Digite a descriçao"
                    value={description}
                    onChange={e => setDescription(e.target.value)}/>
                    <button className="button" type="submit">Cadastrar localização</button>

                </form>
          

        
            </div>
        </div>
    );
}