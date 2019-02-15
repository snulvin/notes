import * as React from 'react';
import { default as pageIndex } from './pageIndex';
import { HtmlRenderer, Parser } from 'commonmark';
import {Col, Container, Navbar, NavDropdown, Row} from 'react-bootstrap';

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
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('category', category);
    urlParams.set('name', name);

    if (history.pushState) {
      const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + urlParams.toString();
      window.history.pushState({path:newurl},'',newurl);
    }

    fetch(`/pages/${category}/${name}.md`)
      .then((response) => response.text())
      .then((mystring: string) => {
        this.setMarkDown(mystring);
      });
  }

  public componentWillMount = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const category = urlParams.get('category');
    const name = urlParams.get('name');

    if (!!category && !!name) {
      this.getMarkdown(category, name)();
    }
  }

  public renderMobileList() {
    return (
      <Navbar>
        { pageIndex.map((category => (
          <NavDropdown key={category.id} eventKey={category.id} title={category.label} id={category.id}>
            { category.subcontent.map(session => (
              <NavDropdown.Item key={session.id} eventKey={`${category.id}.${session.id}`} onClick={this.getMarkdown(category.id, session.id)}>
                {session.label}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        )))}
      </Navbar>
    );
  }

  public render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={12} md={12}>
            {this.renderMobileList()}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <div dangerouslySetInnerHTML={ {__html: this.state.post} } />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

