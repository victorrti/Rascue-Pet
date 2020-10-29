import React,{useState,useEffect} from 'react'
import api from '../../../services/api';
import './stylesc.css' 

function PetImagem(props){
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
                    <img src={imagem.url} alt="imagem pet"></img>
                </li>
            ))}
        </ul>
           
        
    )
}
export default PetImagem;