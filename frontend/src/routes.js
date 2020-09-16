import React from  'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Logon from './pages/logon'
import register from './pages/register'
import Pets from './pages/petsperdidos'
import NewPosition from './pages/NewPosition'
import MeusPets from './pages/meuspets'
import NewPet from './pages/newpet'
import Position from './pages/positions'
import petedit from './pages/editPet'
import AddImagem from './pages/addimagem'



export default function Routes(){
    return( 

            <BrowserRouter>
                <Switch>
                    <Route path="/" exact  component={Logon}/>
                    <Route path="/register" component={register} />
                    <Route path="/petsperdidos" component={Pets} />[
                    <Route path="/position/new" component={NewPosition} />
                    <Route path="/meuspets" component={MeusPets} />
                    <Route path="/newpet" component={NewPet} />
                    <Route path="/position" component={Position} />
                    <Route path="/editar" component={petedit} />
                    <Route path="/adicionar-imagem" component={AddImagem} />
                    
                    
                    
   
                </Switch>
            </BrowserRouter>
        );

}