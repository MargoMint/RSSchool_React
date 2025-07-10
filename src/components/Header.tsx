import { Component } from 'react';
import { Layout } from './Layout';

class Header extends Component {
  render() {
    return (
      <Layout>
        <header className="text-center pb-2 border-b-4 border-red-800">
          <h1 className="text-3xl font-extrabold text-red-800 tracking-wide uppercase">
            PokeSearch
          </h1>
        </header>
      </Layout>
    );
  }
}

export default Header;
