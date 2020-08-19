import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../src/NoteListNav/NoteListNav.js';
import NotePageNav from '../src/NotePageNav/NotePageNav';
import NoteListMain from '../src/NoteListMain/NoteListMain';
import NotePageMain from '../src/NotePageMain/NotePageMain';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ApiContext from './ApiContext';
import ErrorBoundaries from './ErrorBoundaries/ErrorBoundaries';
import './App.css';


class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    getData = () => {
        Promise.all([
            fetch(`http://localhost:9090/notes`),
            fetch(`http://localhost:9090/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(pP,pS) {
        // this.getData();
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes(value) {
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
                <Route path="/note/:noteId" value={value} component={NotePageMain} />
                <Route path="/add-folder" value={value} component={AddFolder}/>
                <Route path="/add-note" value={value} component={AddNote}/>
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            
        };
        return (
            <ApiContext.Provider value={value}>
                <ErrorBoundaries>
                    <div className="App">
                        <nav className="App__nav">{this.renderNavRoutes()}</nav>
                        <header className="App__header">
                            <h1>
                                <Link to="/">Noteful</Link>{' '}
                                <FontAwesomeIcon icon="check-double" />
                            </h1>
                        </header>
                        <main className="App__main">{this.renderMainRoutes(value)}</main>
                    </div>
                </ErrorBoundaries>
            </ApiContext.Provider>
        );
    }
}

export default App;

