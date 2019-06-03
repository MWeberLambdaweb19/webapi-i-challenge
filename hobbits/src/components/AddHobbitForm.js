import React from 'react';

class AddHobbitForm extends React.Component {
    state = {
        hobbit: {
            name: "",
            bio: ""
        }
    }

    handleChanges = e => {
        e.persist();
        this.setState(prevState => ({
            hobbit: {
                ...prevState.hobbit,
                [e.target.name]: e.target.value
            }
        }));
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.addHobbitSubmit(this.state.hobbit)
    }

    render(){
        return(
        <div>
            <form onSubmit={this.submitHandler}>
                <input
                    name="name"
                    type="text"
                    placeholder="name"
                    value={this.state.hobbit.name}
                    onChange={this.handleChanges}
                />
                <input
                    name="bio"
                    type="text"
                    placeholder="bio"
                    value={this.state.hobbit.bio}
                    onChange={this.handleChanges}
                />
                <button type="submit">Update Hobbit!</button>
            </form>
        </div>
        )}
}

export default AddHobbitForm;