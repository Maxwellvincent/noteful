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

    static contextType = ApiContext;

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
        const option = Array.from(e.target.options).filter((item) => item.innerText === e.target.value);
        console.log(option);
        this.setState({
            folderId: option[0].id
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
                folderId : this.state.folderId,
                content: this.state.content
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        // grab this forms state and sent it to the fetch
        // then set this state back to empty
        // need to update the state of the app with new folder added 
        // then need to return back to the folder list
        this.context.apiCall();
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