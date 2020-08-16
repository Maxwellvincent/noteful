import React from 'react';
import Main from '../src/main/main';
import Folder from '../src/folder/folder';
import Note from '../src/note/note';
import {Route, Switch,Link} from 'react-router-dom';
import {NoteContext} from './noteContext';
import Store from './dummy-store';
import './App.css';

export class App extends React.Component {
  constructor(props){
    super(props)
    // this.state = {Store}
    this.state = {
      Store: {
        folders: [],
        notes: [],}
    }
  }

  componentDidMount(){
    const folders = 'http://localhost:9090/folders';
    const notes = 'http://localhost:9090/notes';
    const options = {
      method: 'GET',
      headers: {
        'content-type':'application/json'
      },
    }
    
    

    Promise.all([
      fetch(folders,options),
      fetch(notes,options)
    ]).then(resp => (Promise.all(resp.map((resp) => resp.json()))))
    .then((data) => this.setState({Store:data}))
  }


  render() {
    
    const {notes, folders} = this.state.Store;
    console.log(this.state.Store)
    return (
      <div className="App">
        <NoteContext.Provider value={{store: this.state.Store}}>
          <header><h1><Link to='/'>Noteful</Link></h1></header>
          <main>
            <Switch>
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
            </Switch>

          </main>

        </NoteContext.Provider>
      </div>
    );

  }

}

