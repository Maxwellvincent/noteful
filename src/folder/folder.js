import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { render } from '@testing-library/react';

export default class Folder extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        
        
        return (
            <div>
                <NavLink to='/folder'>{this.props.name}</NavLink>
            </div>
        )
    }

}