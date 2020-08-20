import React from 'react';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError';


class AddNote extends React.Component {

    state= {
        name: '',
        content: '',
        folders: [0],
        touched: false,
        folderId: ''
    }

    static contextType = ApiContext;

    nameChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            name: e.target.value,
            touched: true
        })
    }

    validateName() {
        const name = this.state.name;
        console.log(name.length);
        if (name.length === 0) {
            return 'Name is required';
        } else if (name.length < 3) {
            return 'Name must be greater than 3 characters';
        } 
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
        if((this.state.name || this.state.content) !== "") {
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
        } else {
            alert("Please enter a Note name or Folder name before submitting");
        }

    }

    render(){
        console.log(this.state)
        return (
            <ApiContext.Consumer>
                {(value) => (
                            // console.log(value.folders)
                        <form onSubmit={this.handleSubmit}>
                            <h2>Create a New Note</h2>
                            <div>
                                <label htmlFor="name">Name: </label>
                                <input
                                    id="name" 
                                    type="text" 
                                    value={this.state.name} 
                                    onChange={this.nameChange}
                                    aria-label="Name for note" 
                                    aria-required="true" 
                                />
                                
                                {this.state.touched ? this.validateName(): null}
                            </div>

                            <div>
                                <label htmlFor="folders">Folders: </label>
                                <select id="folders" onChange={this.folderChange}>
                                {value.folders.map((item) => (
                                    // console.log(item.id)
                                    <option id={item.id}>{item.name}</option>
                                ))}
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="content">Content: </label>
                                <input 
                                    id="content"
                                    type='text'
                                    aria-label="text for content" 
                                    aria-required="true" 
                                    aria-describedby="content-div" 
                                    value={this.state.content} 
                                    onChange={this.contentChange}
                                />
                                <div id="content-div"> Please enter text content for note</div>
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