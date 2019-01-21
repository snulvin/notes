import * as React from 'react';
import { default as sessions } from './pages/sessions';
import { HtmlRenderer, Parser } from 'commonmark';

class App extends React.Component {
  public state = {
    post: '',
  };


  public setMarkDown = (md: string) => () => {
    const parser = new Parser();
    const renderer = new HtmlRenderer();
    this.setState({
      post: renderer.render(parser.parse(md)),
    });
  }

  public renderListView() {
    return (
      <dl>
        <dt><h4>Sessions</h4></dt>
        { sessions.map(session => (
          <dd key={session.id}>
            <a href="#" onClick={this.setMarkDown(session.text)}>
              {session.label}
            </a>
          </dd>
        ))}
      </dl>
    );
  }

  public render() {
    console.log(sessions);
    return (
      <div className="container" style={{ maxWidth: '100vw' }}>
        <div className="row">
          <div className="column column-20">
            {this.renderListView()}
          </div>
          <div className="column">
            <div dangerouslySetInnerHTML={ {__html: this.state.post} } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
