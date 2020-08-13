import React from 'react';
import {NavLink} from 'react-router-dom';

import './main.css';

export default function Main (props){
    
    const notes = props.notes.map((note,index) => {
        return (
            <div key={index}>
                <NavLink to={`/note/${note.id}`}><h2>{note.name}</h2></NavLink>
                <span>{note.modified}</span>
            </div>
        )
    });

    const folders = props.folders.map((folder, index) => {
        return (
        //    <Folder key={folder.id} name={folder.name}/>
        <div key={index}><NavLink to={`/folder/${folder.id}`} >{folder.name}</NavLink></div>
        )
    });


    return (
        <div >
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