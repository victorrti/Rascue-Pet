import React,{useState} from 'react';
import{Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from    '../../services/api'
import imagem from '../../assests/images.png'
import cat from '../../assests/pet-cat.png'

import  './stylesimg.css'



export default function Logon(){
   
   
    const [filename,setFileName]= useState([]);
   
    const [preview,setPreview]= useState([]);
    const [selectFile,setSelectFile]= useState([]);
    

    

    const  pet_id = localStorage.getItem('pet_id')

   


    function onChangeHandler(e){
        
        setSelectFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        alert(e.target.files[0].name);
        setPreview(URL.createObjectURL(e.target.files[0]));
          
        
        }
       async  function onClickHandler ( ) {
           
            const data = new FormData()
            await  data.append('file',selectFile,filename)
            api.post("imagem",data,{ 
               headers:{
                   authorization:pet_id,
               }
           })   
        }
    
 
    
      
    return(
        <div className="addimagem-container">
            <div className="addimagem-content">
                <section>
                <img  src={cat} alt="petslogo" />

                    <span>salve uma imagem de cada vez , para ajudar a identificar seu pet</span>

                    <Link  className="back-link"  to="/meuspets">
                     <FiArrowLeft size={16} color="#e02041 "/>
                        retornar
                    </Link>

                </section>
         
          <form>
               <label for='selecao-arquivo'>selecione uma imagem do seu pet &#187;</label>
                <input id='selecao-arquivo' type='file'onChange={onChangeHandler}/>
                <img src={preview} alt="preview"/>  
             
                
                <button className="button" type="submit" onClick={()=>onClickHandler()}>Salvar</button>
                

            </form>
             
           
            </div>
           
        </div>
    );
}