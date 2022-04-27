import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface DetailProps extends RouteComponentProps<{ name: string }> {
}

interface State {
  name: string;
}

class Detail extends React.Component<DetailProps, State> {
  constructor(props: DetailProps) {
    super(props);

    this.state = {
      name: this.props.match.params.name
    }
  }

  componentDidMount() {
    console.log(this.props.history)
    console.log(this.props.location)
    console.log(this.props.match)
  }

  render(): ReactNode {
    return (
      <div>
        this will render product named {this.state.name}
        <button onClick={() => { this.props.history.replace('/about') }}>go to about</button>
        <button onClick={() => { this.props.history.goBack() }}>back in history</button>
      </div>
    )
  }
}

export default Detail 