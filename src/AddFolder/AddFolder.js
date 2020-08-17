import React from 'react';


class AddFolder extends React.Component {

    state= {
        text: ''
    }

    textChange = (e) => {
        console.log(e.target.value);
        this.setState({
            text: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const text = this.state.text;
        // create a fetch post here
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({text})
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        // grab this forms state and sent it to the fetch
        // then set this state back to empty
        // need to update the state of the app with new folder added 
        // then need to return back to the folder list

        // Currently works to return
        this.props.history.push('/');
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Create a New Folder</h2>
                <label>Folder Name:</label>
                <input type="text" value={this.state.text} onChange={this.textChange}/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default AddFolder;