import React from 'react';
import Main from '../src/main/main';
import Folder from '../src/folder/folder';
import Note from '../src/note/note';
import {Route, Switch,Link} from 'react-router-dom';
import {NoteContext} from './noteContext';
import Store from './dummy-store';
import './App.css';

export class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount(){
    const folders = 'http://localhost:9090/folders';
    const notes = 'http://localhost:9090/notes';
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'content-type':'application/json'
    //   },
    // }
    
    Promise.all([
      fetch(folders),
      fetch(notes)
    ])
    .then(([notesRes, foldersResp]) => {
      if(!notesRes.ok)
        return notesRes.json().then(e => Promise.reject(e));
      if(!foldersResp.ok)
        return foldersResp.json().then(e => Promise.reject(e));
      return Promise.all([notesRes.json(), foldersResp.json()]);
    })
    .then(([files,docs]) => {
      this.setState({folders:files,notes:docs});
    })
    .catch(error => {
      console.error({error});
    })

  }




  renderMainRoutes() {
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteListMain}
                />
            ))}
            <Route path="/note/:noteId" component={NotePageMain} />
        </>
    );
}


  render() {
    
    const value = {
      notes: this.state.notes,
      folders: this.state.folders

    };
    
    return (
  
        <NoteContext.Provider value={value}>
          <div className="App">

            <header>
              <h1>
                <Link to='/'>Noteful</Link>
              </h1>
            </header>
            <main>
              {this.renderMainRoutes()}
              {/* <Switch>
                <Route exact path='/' component={Main} 
                  // render={() => <Main notes={notes} folders={folders}/>}
                />
          
                <Route path="/folder/:id" 
                  component={Folder}
                  // render={({match}) => <Folder notes={notes} match={match} folders={folders}/>}
                  />

                <Route path="/note/:id" component={Note} 
                  // render={({match}) => <Note notes={notes} match={match} folder={folders}/>}
                  />
              </Switch> */}

            </main>

          </div>
        </NoteContext.Provider>
    );

  }

}

