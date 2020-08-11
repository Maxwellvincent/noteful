import React from 'react';
import Main from '../src/main/main';
import Folder from '../src/folder/folder';
import Note from '../src/note/note';
import {Route, NavLink} from 'react-router-dom';
import Store from './dummy-store';

export class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {Store}
  }


  render() {
    const {notes, folders} = this.state.Store;


    return (
      <div className="App">
        {/* <header><h1>Noteful</h1></header> */}
        {/* <Link to='/'>Main</Link>
        <Link to='/folder'>Folder</Link> */}
        <section>
          <Route path='/' render={() => <Folder folder={folders}/>}/>
        </section>
        <main>
          <Route path='/' render={() => <Main notes={notes} folders={folders}/>}/>
        </main>
        
      </div>
    );

  }

}

