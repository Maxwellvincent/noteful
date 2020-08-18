import React from 'react';
import ApiContext from '../ApiContext';


class AddNote extends React.Component {

    state= {
        name: '',
        content: '',
        folders: [],
        touched: false,
        folderId: ''
    }

    nameChange = (e) => {
        console.log(e.target.value);
        this.setState({
            name: e.target.value
        })
    }

    contentChange = (e) => {
        console.log(e.target.value);
        this.setState({
            content: e.target.value
        })
    }

    folderChange = (e) => {
        console.log(e.target);
        this.setState({
            folderId: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const text = this.state.name;
        // create a fetch post here
        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: text,
                modified: new Date(),
                folderId : '',
                content: ''
            })
        })
        .then(resp => console.log(resp))
        // grab this forms state and sent it to the fetch
        // then set this state back to empty
        // need to update the state of the app with new folder added 
        // then need to return back to the folder list

        // Currently works to return
        this.props.history.push('/');
    }

    render(){
        return (
            <ApiContext.Consumer>
                {(value) => (
                            // console.log(value.folders)
                        <form onSubmit={this.handleSubmit}>
                            <h2>Create a New Note</h2>
                            <div>
                                <label>Name: </label>
                                <input 
                                    type="text" 
                                    value={this.state.name} 
                                    onChange={this.nameChange}
                                />
                            </div>

                            <div>
                                <label>Folders: </label>
                                <select onChange={this.folderChange}>
                                {value.folders.map((item) => (
                                    // console.log(item.id)
                                    <option id={item.id}>{item.name}</option>
                                ))}
                                </select>
                            </div>
                            
                            <div>
                                <label>Content: </label>
                                <input 
                                    type='text' 
                                    value={this.state.content} 
                                    onChange={this.contentChange}
                                />
                                <button type="submit">Submit</button>
                            </div>

                        </form>
                    )
                }
            </ApiContext.Consumer>

        )
    }
}

export default AddNote;