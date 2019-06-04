import React from 'react';
import EditHobbitForm from './EditHobbitForm';

class HobbitList extends React.Component {

    deleteItem = (event, id) => {
        event.preventDefault();
        this.props.deleteItem(id)
    }

    render(){
    return(
    <div>
        {this.props.hobbitProps.map(hobbit => 
        <div key={hobbit.id}>
            <h1>{hobbit.name}</h1>
            <h3>{hobbit.id}</h3>
            <h3>{hobbit.bio}</h3>
            <button onClick={(event) => this.deleteItem(event, hobbit.id)}>Delete</button>
        </div>)}
    </div>      
    )}
}

export default HobbitList;