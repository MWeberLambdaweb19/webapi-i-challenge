import React from 'react';

class EditHobbitForm extends React.Component {
    state = {
        editingBoolean: this.props.editBool,
    }

    updateHobbit = () => {
        this.setState({
            editingBoolean: true,
        })
    }

    render(){
    return(
        <div>
            <form>
                <input placeholder="name" />
                <input placeholder="bio" />
                <input placeholder="id" />
                <button onClick={this.updateHobbit}>Update</button>
            </form>
        </div>
    )
    }
}

export default EditHobbitForm;