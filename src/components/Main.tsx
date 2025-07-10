import { Component } from 'react';
import { Button } from './Button';

interface MainState {
  shouldThrow: boolean;
}

class Main extends Component<object, MainState> {
  constructor(props: object) {
    super(props);
    this.state = { shouldThrow: false };
  }

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test Error');
    }
    return (
      <>
        <div className="text-5xl text-amber-700">Hello, World</div>
        <Button onClick={() => this.setState({ shouldThrow: true })}>
          Throw Error
        </Button>
      </>
    );
  }
}

export default Main;
