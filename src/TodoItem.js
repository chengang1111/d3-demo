import React,{Component} from 'react';

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render(){
        const { item } = this.props;
        return (
            <li>
                <span>{item}</span>
                <span className="icon-close" onClick={this.handleClick()}>X</span>
            </li>
        )
    }
    handleClick(){
        const { todoListDelete,index } = this.props;
        todoListDelete(index);
    }
}

export default TodoItem;