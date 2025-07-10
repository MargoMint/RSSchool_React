import { Component } from 'react';
import { Button } from './Button';
import { Layout } from './Layout';

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
      <Layout>
        <div className="text-5xl text-amber-700">Hello, World</div>
        <Button onClick={() => this.setState({ shouldThrow: true })}>
          Throw Error
        </Button>
      </Layout>
    );
  }
}

export default Main;
