import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

class RoundButton extends Component {
    render() {
        return(
            
            <TouchableOpacity
            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:100,
                height:100,
                backgroundColor:'#fff',
                borderRadius:100,
                }}
            >
            </TouchableOpacity>
        )
    }
}

export default RoundButton;