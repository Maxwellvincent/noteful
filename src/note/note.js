import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Note(match,props){
    


    const folder = match.notes.filter(function(file) {
        
        return file.id === match.match.params.id;
    });

    const folderName = match.folder.filter((item) => {
        return item.id === folder[0].folderId;
    });

    // console.log(folderName);

   
    
    return (
        <div>
            <div className="main-component" >
                <div className="right">
                    <main>
                        <h2>{folder[0].name}</h2>
                        <p>{folder[0].content}</p>
                        <p>{folder[0].modified}</p>
                    </main>
                </div>
                <div className="left">
                    <aside>
                        <div /*key={index}*/> 
                            <NavLink to={`/folder/${folder[0].folderId}`} >{folderName[0].name}</NavLink>
                        </div>
                        
                    </aside>
                </div>
            </div>
        </div>
    )
}