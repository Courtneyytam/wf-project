import { EmptyState, Layout, Page } from '@shopify/polaris';
import HelpCard from '../components/HelpCard';
import OopsState from '../components/OopsState';

import helpContent from '../help_page_content';
var helpers = require("../helpers.js");
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class HelpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questions: []
    };
  }

  async componentDidMount() {
    try {
      // let questions = await helpers.getFAQ();
      // this.setState({questions: questions.data, isLoaded: true})
      this.setState({questions: helpContent.questions, isLoaded: true})
    } catch (error) {
      console.log(error);
      this.setState({
        isLoaded: true,
        error
      });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <OopsState />
      );
    } else if ( this.state.isLoaded ) {
      return (
        <Page title="Help">
          {this.state.questions.map((question, index) => <HelpCard key={index} questionData={question}/>)}
        </Page>
      );
    } else {
      return (
        <Page title="Help">
        </Page>
      );
    }
  }
}

export default HelpPage;
