import { Page } from '@shopify/polaris';
import SectionList from '../components/SectionList'

var helpers = require("../helpers.js");

class Index extends React.Component {
  render() {
    return (
      <Page title="Available Sections">
        <SectionList />
      </Page>
    );
  }
}

export default Index;
