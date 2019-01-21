import * as React from 'react';
import { default as pageIndex } from './pageIndex';
import { HtmlRenderer, Parser } from 'commonmark';

class App extends React.Component {
  public state = {
    post: '',
  };


  public setMarkDown = (md: string) => {
    const parser = new Parser();
    const renderer = new HtmlRenderer();
    this.setState({
      post: renderer.render(parser.parse(md)),
    });
  }

  public getMarkdown = (category: string, name: string) => () => {
    fetch(`/pages/${category}/${name}.md`)
      .then((response) => response.text())
      .then((mystring: string) => {
        this.setMarkDown(mystring);
      });
  }

  public renderListView() {
    return (
      <dl>
        { pageIndex.map((category => (
          <React.Fragment key={category.id}>
            <dt><h4>Sessions</h4></dt>
            { category.subcontent.map(session => (
              <dd key={session.id}>
                <a href="#" onClick={this.getMarkdown(category.id, session.id)}>
                  {session.label}
                </a>
              </dd>
            ))
            }
          </React.Fragment>
        )))}
      </dl>
    );
  }

  public render() {
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
