import React,{useState,useEffect} from 'react'
import {Link} from  'react-router-dom'
import {Map,TileLayer,Marker} from  'react-leaflet'

import api from '../../services/api'

import Logo from '../../assests/images.png'

import './stylespst.css'



export default function PetsPerdidos(){


    const [pets,setPets] = useState([]);
    
    const [positions,setPositions] = useState([0,0])
    const  [initialPosition,setInitialPosition] = useState([0,0])

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

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position=>{
            const {latitude,longitude} = position.coords
            setInitialPosition([latitude,longitude])
        })
    },[])

  

   

    

    return (
        
        
    <div className="position-container">

        
         <header>
             <img src={Logo} alt="logo"></img>
               
                <Link class="button" to="/meuspets">Meus Pets</Link>
               

                
        </header>
       
        <h1>Ultimas localizaçoes do pet </h1>
        
        
            
            
        <ul>
        <Map center={initialPosition}zoom={13} >
                        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" >
                          

                        </TileLayer>
                        {pets.map(pet =>(
                                
                                <Marker position ={[pet.latitude ,pet.longitude]}/>
                            ))}
          
            </Map>
       
        
           


        {pets.map(pet=>(
     
           
            <li>
            
            <header>
            <img src={Logo} alt="imagem pet"></img>
            
    
            </header>
            
             
            <strong>ESTADO:</strong>
            <p>{pet.uf}</p>
            
            <strong>CIDADE:</strong>
            <p>{pet.cidade}</p>

            <strong>BAIRRO:</strong>
            <p>{pet.bairro}</p>

            <strong>RUA:</strong>
            <p>{pet.rua}</p>

            <strong>NUMERO:</strong>
            <p>{pet.numero}</p>

           
            <strong>DESCRIÇAO:</strong>
             <p>{pet.description}</p>
            
           

           
            

        </li>
        ))}
        
        </ul>
      
    </div>   
       
    );
}