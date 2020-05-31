import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom';

class List extends Component<ListProps, ListState> {

  constructor(props: ListProps) {
    super(props);
    this.state = {
      names: ['monitor', 'hard-drive']
    }
  }

  render() {
    return (
      <div>
        {this.state.names.map(name => {
          return <p key={name}><Link to={`/product/${name}`}>{name}</Link></p>
        })}
      </div>
    );
  }
}

interface ListProps { }

interface ListState {
  names: Array<string>
}

export default List;
