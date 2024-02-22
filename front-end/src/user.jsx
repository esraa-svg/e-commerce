import React, { Component } from "react";
export default  class user extends Component
{



    state={
        name:'esraa magdy'
    }

   
render(){
   return( <h1>USername:{this.state.name}</h1>)
}

}