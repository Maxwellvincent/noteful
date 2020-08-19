import React from 'react';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError';

class AddFolder extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            touched: false,
            folders: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    textChange = (e) => {
        console.log(e.target.value);
        this.setState({
            name: e.target.value,
            touched: true
        })
    };

    validateName() {
        const name = this.state.name.trim();
        if (name.length === 0) {
            return 'Name is required';
        } else if (name.length < 3) {
            return 'Name must be at least 3 characters long!'
        }
    }
   

    

    handleSubmit(e, value){
        console.log(value);

        e.preventDefault();

        console.log(this.props);
        // create a fetch post here
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({id: '', name: this.state.name})
        })
        .then(resp => resp.json())
        .then(data => 
            value.folders.push(data)
            // console.log(data)
            )
        // grab this forms state and sent it to the fetch
        // then set this state back to empty
        // need to update the state of the app with new folder added 
        // then need to return back to the folder list
        console.log(this.props);
        
        // Currently works to return
        this.props.history.push('/');
      
    }

    render(){
       
        return (
            <ApiContext.Consumer>
                {value => 
                       
                    <form onSubmit={(e) => this.handleSubmit(e,value)}>
                        <h2>Create a New Folder</h2>
                        <label>Folder Name:</label>
                        <input type="text" value={this.state.name} onChange={this.textChange}/>
                        {/* {this.state.touched && (<ValidationError message={this.validateName()}/>)} */}
                        <button type="submit" >Submit</button>
                    </form>
                
                }
            </ApiContext.Consumer>

        )
    }
}

export default AddFolder;