import React from 'react';
import Main from '../src/main/main';
import Folder from '../src/folder/folder';
import Note from '../src/note/note';
import {Route, Switch,Link} from 'react-router-dom';
import Store from './dummy-store';
import './App.css';

export class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {Store}
  }


  render() {
    const {notes, folders} = this.state.Store;


    return (
      <div className="App">
        <header><h1><Link to='/'>Noteful</Link></h1></header>

        <main>
          <Switch>
            <Route exact path='/' render={() => <Main notes={notes} folders={folders}/>}/>
            {/* <Route  path='/folder' render={() => <Folder notes={notes} folders={folders}/>}/> */}
            <Route path="/folder/:id" render={({match}) => <Folder notes={notes} match={match} folders={folders}/>}/>
            <Route path="/note/:id" render={({match}) => <Note notes={notes} match={match} folder={folders}/>}/>
          </Switch>

        </main>
        
      </div>
    );

  }

}

