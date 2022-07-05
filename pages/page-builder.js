import { Layout, Page } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";

import ChooseSectionModal from "../components/ChooseSectionModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import NoThemeState from "../components/NoThemeState";
import OopsState from "../components/OopsState";
import PageBuilderSkeleton from "../components/PageBuilderSkeleton";
import RearrangeableList from "../components/RearrangeableList";
import TemplateList from "../components/TemplateList";
import TemplateListSkeleton from "../components/TemplateListSkeleton";
import TemplateNameField from "../components/TemplateNameField";
import Upsell from "../components/Upsell";

var helpers = require("../helpers.js");
var utils = require("../utils.js");

class PageBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.mainThemeId = null;
    this.templateList = [];
    this.state = {
      error: null,
      isLoaded: false,
      sections: [],
      templateSections: [],
      mode: "list",
      activeTemplate: "",
      hasChanges: false,
      showToast: false,
      showDeleteModal: false,
      deleteAction: () => {},
      deleteTarget: "",
    };
    this.registerChange = this.registerChange.bind(this);
  }

  generateTemplate = () => {
    let templateStr = "";
    let uniqueSectionList = [];
    for (let i = 0; i < this.state.templateSections.length; i++) {
      if (
        this.state.templateSections[i].sectionName.indexOf(
          "nonSectionContent"
        ) == 0
      ) {
        templateStr += this.state.templateSections[i].sectionContent;
      } else if (
        this.state.templateSections[i].isUnique &&
        this.state.templateSections[i].sectionName.indexOf("-boodl-uniq-") < 0
      ) {
        let uniqueSectionName =
          this.state.templateSections[i].sectionName +
          "-boodl-uniq-" +
          utils.generateRandomString();
        uniqueSectionList.push(uniqueSectionName);
        templateStr += "{% section '" + uniqueSectionName + "' %}\n";
      } else {
        templateStr +=
          "{% section '" +
          this.state.templateSections[i].sectionName +
          "' %}\n";
      }
    }
    return { templateContent: templateStr, uniqueSections: uniqueSectionList };
  };

  savePage = async () => {
    try {
      this.setState({ hasChanges: false });
      let response = await helpers.putTemplate(
        this.mainThemeId,
        this.state.activeTemplate,
        this.state.newTemplate ? "page." : "",
        this.generateTemplate(),
        this.state.newTemplate
      );
      this.setState({ showToast: true, saveSuccess: true, newTemplate: false });
    } catch (err) {
      console.log(err);
      this.setState({ hasChanges: true, saveSuccess: false, showToast: true });
    }
  };

  registerChange = () => {
    this.setState({ hasChanges: true });
  };

  changeScope = (comp) => {
    return function (index, isUnique) {
      comp.state.templateSections[index].isUnique = isUnique;
      comp.setState({ hasChanges: true });
    };
  };

  async previewPage() {}

  templateToSections = (templateContent) => {
    let templateSections = [];
    let sectionRegex = /\{\%(\s)*section(\s)+'([A-Za-z0-9-.]+)'(\s)*\%\}/g;
    let sectionMatches = templateContent.matchAll(sectionRegex);
    let lastIndex = 0;
    let lastLength = 0;
    let nonSectionContentIndex = 1;
    for (const match of sectionMatches) {
      if (match.index > lastIndex + lastLength + 1) {
        let sectionContent = templateContent.slice(
          lastIndex + lastLength,
          match.index
        );
        templateSections.push({
          title: "Page Content " + nonSectionContentIndex,
          description:
            "This content content and style is pre-defined by your chosen theme. We recommend keeping this block and adding additional Boodl sections.",
          sectionName: "nonSectionContent" + nonSectionContentIndex,
          sectionContent: sectionContent,
          sectionType: "page-content",
          isHidden: sectionContent.indexOf("{% comment %}\nboodl-hide") > -1,
        });
        nonSectionContentIndex += 1;
      }
      lastIndex = match.index;
      lastLength = match[0].length;
      templateSections.push({
        title: utils.toTitleCase(
          match[3].split("-boodl-uniq")[0].replace("-", " ")
        ),
        description: "",
        sectionName: match[3],
        isUnique: match[3].indexOf("-boodl-uniq") > -1,
        sectionType: "section",
        isHidden: false,
      });
    }
    if (templateContent.length > lastIndex + lastLength + 1) {
      let sectionContent = templateContent.slice(
        lastIndex + lastLength,
        templateContent.length
      );
      templateSections.push({
        title: "Page Content " + nonSectionContentIndex,
        description:
          "This content content and style is pre-defined by your chosen theme. We recommend keeping this block and adding additional Boodl sections.",
        sectionName: "nonSectionContent" + nonSectionContentIndex,
        sectionContent: sectionContent,
        sectionType: "page-content",
        isHidden: sectionContent.indexOf("{% comment %}\nboodl-hide") > -1,
      });
      nonSectionContentIndex += 1;
    }
    return templateSections;
  };

  updateSectionListOrder = (sectionList) => {
    this.state.templateSections = sectionList;
    this.setState({ hasChanges: true });
  };

  loadPage = async (templateName) => {
    let response = await helpers.getTemplateContent(
      this.mainThemeId,
      templateName + ".liquid"
    );
    let templateSections = this.templateToSections(response.data.asset.value);
    this.setState({ templateSections: templateSections, isLoaded: true });
  };

  insertSection(comp) {
    return function (sectionData) {
      return function () {
        let newSectionList = comp.state.templateSections;
        newSectionList.push(sectionData);
        comp.setState({ templateSections: newSectionList, hasChanges: true });
      };
    };
  }

  changeToEditMode = (templateTitle) => {
    if (templateTitle == "") {
      this.setState({
        mode: "edit",
        activeTemplate: templateTitle,
        templateSections: [],
        isLoaded: true,
        newTemplate: true,
      });
    } else {
      this.setState({
        mode: "edit",
        activeTemplate: templateTitle,
        isLoaded: false,
        newTemplate: false,
      });
      this.loadPage(templateTitle);
    }
  };

  changeToListMode = () => {
    this.setState({
      mode: "list",
      activeTemplate: "",
      isLoaded: true,
      hasChanges: false,
    });
  };

  validateName = () => {
    var nameRegex = /^[0-9a-zA-Z_\-\.]+$/;
    return nameRegex.test(this.state.activeTemplate);
  };

  confirmDelete = function (comp) {
    return (deleteAction, deleteTarget) => {
      let deleteFn = function () {
        comp.setState({ showDeleteModal: false });
        deleteAction();
      };
      comp.setState({
        showDeleteModal: true,
        deleteTarget: deleteTarget,
        deleteAction: deleteFn,
      });
    };
  };

  async componentDidMount() {
    let loadFailure = true;
    let numRetries = 3;
    let recentError;
    for (let i = 0; i < numRetries; i++) {
      try {
        this.accountDetails = await helpers.getAccountDetails();
        var activeSections = [];

        if (this.accountDetails.planLevel >= 2) {
          this.mainThemeId = await helpers.getActiveTheme();

          if (this.mainThemeId) {
            this.mainThemeId = this.mainThemeId.themeId;
            let assets = await helpers.getAssets(this.mainThemeId);
            this.templateList = assets.data.assets.filter(
              (asset) => asset.key.indexOf("templates/") == 0
            );
            activeSections = assets.data.assets
              .filter((asset) => asset.key.indexOf("sections/") == 0)
              .map((section) => ({
                title: section.key
                  .replace(".liquid", "")
                  .replace("sections/", ""),
                description: "",
                sectionName: section.key
                  .replace(".liquid", "")
                  .replace("sections/", ""),
              }));
            activeSections = activeSections.filter(
              (section) => section.title.indexOf("-boodl-uniq-") == -1
            );
          } else {
            this.mainThemeId = null;
          }
        }

        this.setState({
          isLoaded: true,
          sections: activeSections,
          templateSections: [...activeSections],
        });
        loadFailure = false;
        break;
      } catch (error) {
        recentError = error;
        await helpers.sleep(500);
      }
    }
    if (loadFailure) {
      this.setState({
        isLoaded: true,
        error: recentError,
      });
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <OopsState />;
    } else if (isLoaded && this.accountDetails.planLevel < 2) {
      return <Upsell />;
    } else if (isLoaded && this.mainThemeId == null) {
      return (
        <Page
          title="Template List"
          primaryAction={{ content: "Create New", disabled: true }}
        >
          <NoThemeState />
        </Page>
      );
    } else if (!isLoaded && this.state.mode == "edit") {
      return (
        <Page
          title="Template Editor"
          primaryAction={{ content: "Save" }}
          breadcrumbs={[
            { content: "Template List", onAction: this.changeToListMode },
          ]}
        >
          <PageBuilderSkeleton />
        </Page>
      );
    } else if (this.state.mode == "edit") {
      let validString = this.validateName();
      return (
        <Page
          title={
            this.state.newTemplate
              ? "Template Editor"
              : this.state.activeTemplate
          }
          primaryAction={{
            content: "Save",
            onAction: this.savePage,
            disabled: !this.state.hasChanges || !validString,
          }}
          breadcrumbs={[
            { content: "Template List", onAction: this.changeToListMode },
          ]}
        >
          {this.state.showToast ? (
            <Toast
              isError={this.state.saveSuccess}
              active={true}
              content={this.state.saveSuccess ? "Success" : "Failure"}
              duration={3000}
              onDismiss={() => {
                this.setState({ showToast: false });
              }}
            />
          ) : null}
          <Layout>
            {this.state.newTemplate && (
              <Layout.Section>
                <TemplateNameField
                  isValid={validString}
                  disabled={!this.state.newTemplate}
                  name={this.state.activeTemplate}
                  updateText={(templateName) => {
                    this.setState({
                      activeTemplate: templateName,
                      hasChanges: true,
                    });
                  }}
                />
              </Layout.Section>
            )}
            <Layout.Section>
              <RearrangeableList
                sections={this.state.templateSections}
                dragEnd={this.updateSectionListOrder}
                changeScope={this.changeScope(this)}
                registerChange={this.registerChange}
              />
            </Layout.Section>
            <Layout.Section>
              <ChooseSectionModal
                sections={this.state.sections}
                insertSection={this.insertSection(this)}
              />
            </Layout.Section>
          </Layout>
        </Page>
      );
    } else if (!isLoaded && this.state.mode == "list") {
      // template list mode
      return (
        <Page title="Template List" primaryAction={{ content: "Create New" }}>
          <TemplateListSkeleton />
        </Page>
      );
    } else {
      // list mode loaded
      return (
        <Page
          title="Template List"
          primaryAction={{
            content: "Create New",
            onClick: () => {
              this.changeToEditMode("");
            },
          }}
        >
          <ConfirmDeleteModal
            open={this.state.showDeleteModal}
            delete={this.state.deleteAction}
            cancel={() => {
              this.setState({ showDeleteModal: false });
            }}
            title={"Delete " + this.state.deleteTarget + "?"}
          />
          <TemplateList
            deleteAction={this.confirmDelete(this)}
            templates={this.templateList}
            editTemplate={this.changeToEditMode}
            themeId={this.mainThemeId}
          />
        </Page>
      );
    }
  }
}

export default PageBuilder;
