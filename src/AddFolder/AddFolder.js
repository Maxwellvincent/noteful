import React from 'react'

class AddFolder extends React.Component {
    render(){
        return (
            <form>
                <h2>Create a New Folder</h2>
                <label>Folder Name:</label>
                <input type="text"/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default AddFolder;