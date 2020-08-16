import React from 'react';
import {NavLink,} from 'react-router-dom';
import {NoteContext} from '../noteContext';
import './folder.css';

export default function Folder(match){
        // console.log(match.match.params.id);
        // console.log(match.notes)
        const folders = match.folders.map((folder,index) => {
            
        return <div key={index}> <NavLink to={`/folder/${folder.id}`} >{folder.name}</NavLink>
            </div>
            
        });

        const notes = match.notes.filter((note) => { return note.folderId === match.match.params.id});
        const filterNotes = notes.map((note) => { 
            return ( <div key={note.id}>
                <NavLink to={`/note/${note.id}`}><h2>{note.name}</h2></NavLink>
                <span>{note.modified}</span>
            </div>
            )
        });


        return (
                <div>
                    <NoteContext.Consumer>
                        {context => (
                                <div className="main-component" >
                                <div className="right">
                                    <main>
                                        
                                        {filterNotes}
                                    </main>
                                </div>
                                <div className="left">
                                    <aside>
                                        {folders}    
                                    </aside>
                                </div>
                            </div>
                        )}

                    </NoteContext.Consumer>

                </div>
          
        )
}