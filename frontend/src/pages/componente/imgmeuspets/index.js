import React,{useState,useEffect} from 'react'
import{FiTrash2} from 'react-icons/fi'
import {Link} from  'react-router-dom'
 
import api from '../../../services/api';
import './stylesimp.css' 

function MPetImagem(props){
    async function deleteImg(imagem){
        api.delete('imagem',{
            headers:{
                name:imagem.name,
                id:imagem.id
            }
        });
        setImagem(imagens.filter(incident=> incident.id !== imagem.id))

    }
    const [imagens,setImagem] = useState([]);

    const {pet} = props;
   
    useEffect(()=>{
        api.get('imagem',{
            headers:{
                authorization:pet.id,
            }
        }).then(response => setImagem(response.data))
    },[pet.id])

    return(
        <ul>
            {imagens.slice(0,3).map(imagem =>(
                <li key={imagem.id}>
                    <Link onClick={()=>deleteImg(imagem)}><FiTrash2></FiTrash2></Link>
                    <img src={imagem.url} alt="imagem pet"></img>
                </li>
            ))}
        </ul>
           
        
    )
}
export default MPetImagem;