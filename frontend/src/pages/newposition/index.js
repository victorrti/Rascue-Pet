import React, {useEffect, useState}from  'react'
import {FiArrowLeft} from 'react-icons/fi'
import {Link,useHistory} from 'react-router-dom'
import {Map,TileLayer,Marker} from  'react-leaflet'
import api from '../../services/api'
import './stylests.css'
import axios from 'axios'










const CreatePoint = ()=>{
    
 //STATES
    
    
    const [ufs,setUfs] = useState([]) // ESTADO DO PONTO DE COLETA
    const[selectedUf , setSelectedUf] = useState('0');
    const [cities,setCities]= useState([])
    const [selectedCity,setSelectedCity] = useState('0') // SELEÇAO DE ESTADO 
    const  [selectedPosition,setSelectedPosition] = useState([0,0])
    const  [initialPosition,setInitialPosition] = useState([0,0])
    const [formData,setFormData] = useState({
        bairro:'',
        rua:'',
        numero:'',
        descricao:'',
    })

    const pet_id = localStorage.getItem('pet_id')
    
  
  // USEEFFECTS
  useEffect(()=>{
      navigator.geolocation.getCurrentPosition(position=>{
          const {latitude,longitude} = position.coords
          setInitialPosition([latitude,longitude])
      })
  },[])



    useEffect(()=>{
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
            const ufInitials =  response.data.map( uf => uf.sigla);
            setUfs(ufInitials);
        })
    },[])

    useEffect(()=>{
        if (selectedUf ==='0'){
            return
        }
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
        ).then(response =>{
            const cityNames =  response.data.map( city => city.nome);
            setCities(cityNames);
        })

    },[selectedUf])

    //FUNÇOES

    function handleSelectedUf(event){
       const uf = event.target.value;
       setSelectedUf(uf);
    } // armazena o estado selecionado
    function handleSelectedCity(event){
        const city = event.target.value;
        setSelectedCity(city);
     } //  armazena a cidade selecionada

    function handleMapClick(event){
         setSelectedPosition([event.latlng.lat,event.latlng.lng]);
         } // pegar a posiçao pelo click no mapa
    function handleInputChange(event){
        const {name,value} = event.target
       setFormData({...formData,[name]:value})
    }

    
    const history = useHistory();

    async function handleOnSubmit(event){
        event.preventDefault();
        const { bairro,rua,numero,description} = formData
        const uf = selectedUf
        const cidade = selectedCity
        const [latitude,longitude]= selectedPosition
        

        const data = {
            bairro,
            rua,
            numero,
            uf,
            cidade,
            longitude,
            latitude,
            description
            
        }
        try {
            await api.post('positions',data,{
                headers:{
                    
                        authorization:pet_id,
                    
                }
            });

       

            history.push('/petsperdidos');
        }
        catch{
            alert('erro ao adicionar nova posição, tente novamente')

        }
      

    }
    return (
        <div id="page-create-point">
            <header>
                
                <Link to="/petsperdidos">
                    <FiArrowLeft></FiArrowLeft>
                    Voltar para Home
                </Link>
            </header>
            <form onSubmit={handleOnSubmit}>
                <h1>Cadastro da <br/>localização do pet</h1>
                

                <fieldset>

                    <legend>
                        <h2>Localização</h2>
                        <span>Selecione  onde localizou o pet</span>
                    </legend>
                    <Map center={initialPosition}zoom={13} onClick={handleMapClick}>
                        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" >

                        </TileLayer>
                        <Marker position= {selectedPosition} />

                    
                    </Map>
                    
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">estado (UF)</label>
                            <select name="uf" 
                            id="uf" 
                            value={selectedUf} 
                            onChange ={handleSelectedUf}
                            >

                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf=>(
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}

                            </select>

                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>

                            <select name="city" 
                            id="city"
                            value={selectedCity}
                            onChange ={handleSelectedCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city=>(
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>

                        </div>

                    </div>
                    
                </fieldset>
                <fieldset>
                    

                    <div className="field">
                        <label htmlFor="bairro">Bairro:</label>
                        <input 
                        type="text" 
                        name="bairro"
                        id="bairro"
                        placeholder="Digite o bairro"
                        onChange={handleInputChange}/>
                    </div>

                    <div className="field-group">
                    <div className="field">
                        <label htmlFor="rua">Rua:</label>
                        <input 
                        type="text" 
                        name="rua"
                        id="rua"
                        placeholder="Digite a rua"
                        onChange={handleInputChange}/>
                    </div>
                    <div className="field">
                        <label htmlFor="whatsapp">Numero:</label>
                        <input 
                        type="text" 
                        name="numero"
                        id="numero"
                        placeholder="Digite o numero"
                        onChange={handleInputChange}/>
                    </div>
                        
                    </div>
                    <div className="field">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                        type="text" 
                        name="description"
                        id="description"
                        placeholder="digite mais informações sobre a localizão do pet"
                        onChange={handleInputChange}/>
                    </div>


                </fieldset>

                

                <button type="submit">Cadastrar Local</button>
            </form>
        </div>
    );
}

export default CreatePoint;