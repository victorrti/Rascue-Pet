import React,{useState} from 'react'
import api from '../services/api'


export default function UploadImg(){
    const [selectFile,setSelectFile]= useState([]);
    const [pet,setpet]= useState('');

    
    

    function onChangeHandler(e){
        
        setSelectFile(e.target.files[0]);
          
        
        }
       async  function onClickHandler (pet_id) {
           setpet(pet_id)
            const data = new FormData()
            data.append('file',selectFile)
            api.post("imagem",data,{ 
               headers:{
                   authorization:pet,
               }
           })   }

        return(
            <form>

            <input type="file" name="file" onChange={onChangeHandler}/>
            <button type="button" class="btn btn-success btn-block" onClick={onClickHandler(pet.id)}>Upload</button>
            </form>
        );
      }


