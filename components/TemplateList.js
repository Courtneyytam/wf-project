import { Card, Layout } from "@shopify/polaris";
import OopsStateFragment from "./OopsStateFragment";
import SearchBar from "./SearchBar";
import TemplateCardSection from "./TemplateCardSection";
import { Fragment } from "react";
var helpers = require("../helpers.js");

class TemplateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      templates: props.templates,
      filter: null,
    };
  }

  updateFilter = (comp) => {
    return function (filter) {
      comp.setState({ filter: filter });
    };
  };

  removeItem = async (templateName) => {
    // TODO: maybe switch back to index for better performance
    try {
      let index = this.state.templates
        .map((template) => template.key)
        .indexOf(templateName);
      await helpers.deleteTemplate(
        this.props.themeId,
        this.state.templates[index].key
      );
      this.state.templates.splice(index, 1);
      this.setState({ templates: this.state.templates });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    try {
      this.setState({
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  render() {
    const { error, templates, filter } = this.state;
    var filteredTemplates = templates;
    if (filter != null) {
      filteredTemplates = templates.filter((section) =>
        section.key.match(filter)
      );
    }

    var templateCards = filteredTemplates.map((template) => (
      <TemplateCardSection
        title={template.key.replace(".liquid", "").replace("templates/", "")}
        key={template.key}
        editTemplate={this.props.editTemplate}
        onDelete={() =>
          this.props.deleteAction(
            () => this.removeItem(template.key),
            template.key.replace(".liquid", "").replace("templates/", "")
          )
        }
      />
    ));

    if (error) {
      return <OopsStateFragment message={error.message} />;
    } else {
      return (
        <Fragment>
          <SearchBar
            itemList={filteredTemplates.map((template) => ({
              value: template.key,
              label: template.key,
            }))}
            updateFilter={this.updateFilter(this)}
          />
          <Layout>
            <Layout.Section>
              <Card>{templateCards}</Card>
            </Layout.Section>
          </Layout>
        </Fragment>
      );
    }
  }
}

export default TemplateList;
