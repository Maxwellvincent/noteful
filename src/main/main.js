import React from 'react';
import Folder from '../folder/folder'
import {Link} from 'react-router-dom';

import './main.css';

export default function Main (props){
    
    const notes = props.notes.map((note) => {
        return (
            <div key={note.id}>
                <h2>{note.name}</h2>
                <span>{note.modified}</span>
            </div>
        )
    });

    const folders = props.folders.map((folder, index) => {
        return (
           <Folder key={folder.id} name={folder.name}/>
        )
    })
    return (
        <div >
            <header><h1><Link to='/'>Noteful</Link></h1></header>
            <div className="main-component" >
                <div className="right">
                    <main>
                    {notes}
                    </main>
                </div>
                <div className="left">
                    <aside>{folders}</aside>
                </div>
            </div>
        </div>
    )
}