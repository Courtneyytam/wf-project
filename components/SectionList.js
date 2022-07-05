import { Layout } from "@shopify/polaris";
import FilterBar from "./FilterBar";
import NoThemeState from "./NoThemeState";
import OopsState from "../components/OopsState";
import SectionCard from "./SectionCard";
import SectionListSkeleton from "./SectionListSkeleton";
import { Fragment } from "react";
var helpers = require("../helpers.js");

var sectionListJSON = {
  sections: [],
  metadata: { themeId: 0 },
};

class SectionList extends React.Component {
  constructor(props) {
    super(props);
    this.mainThemeId = null;
    this.state = {
      error: null,
      isLoaded: false,
      currentSections: [],
      filter: null,
      filterTags: null,
    };
  }

  updateFilter(comp) {
    return function (filter) {
      comp.setState({ filter: filter });
    };
  }

  updateFilterTags(comp) {
    return function (tags) {
      comp.setState({ filterTags: tags });
    };
  }

  async componentDidMount() {
    let loadFailure = true;
    let numRetries = 3;
    let recentError;
    for (let i = 0; i < numRetries; i++) {
      try {
        document.body.style.overflowY = "scroll";
        this.accountDetails = await helpers.getAccountDetails();
        let availableSections = await helpers.getAvailableSections();
        for (let j = 0; j < availableSections.length; j++) {
          if (this.accountDetails.planLevel < availableSections[j].planLevel) {
            availableSections[j].isAuthorized = false;
          } else {
            availableSections[j].isAuthorized = true;
          }
        }
        sectionListJSON.sections = availableSections;
        this.mainThemeId = await helpers.getActiveTheme();
        var sections = [];

        this.tags = [];
        if (this.mainThemeId) {
          this.mainThemeId = this.mainThemeId.themeId;
          sections = await helpers.getActiveSectionsAwaitable(
            this.mainThemeId,
            true
          );
          sectionListJSON.metadata.themeId = this.mainThemeId;
          for (let i = 0; i < sectionListJSON.sections.length; i++) {
            sectionListJSON.sections[i].isEnabled = sections.hasOwnProperty(
              "sections/" + sectionListJSON.sections[i].sectionName + ".liquid"
            );
            this.tags = this.tags.concat(sectionListJSON.sections[i].tags);
          }
          this.tags = [...new Set(this.tags)];
        } else {
          this.mainThemeId = null;
        }

        this.setState({
          isLoaded: true,
          currentSections: sections,
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

  twoColumnSort(list) {
    let leftList = [];
    let rightList = [];
    for (let i = 0; i < list.length; i++) {
      if (i % 2 == 0) {
        rightList.push(list[i]);
      } else {
        leftList.push(list[i]);
      }
    }
    return leftList.concat(rightList);
  }

  render() {
    const { error, isLoaded, filter, filterTags } = this.state;

    if (error) {
      return <OopsState message={error.message} />;
    } else if (!isLoaded) {
      return <SectionListSkeleton />;
    } else if (isLoaded && this.mainThemeId == null) {
      return <NoThemeState />;
    } else {
      var filteredSections = sectionListJSON.sections;
      if (filter != null) {
        filteredSections = sectionListJSON.sections.filter((section) =>
          section.title.match(filter)
        );
      }
      if (filterTags) {
        filteredSections = filteredSections.filter((section) =>
          filterTags.some((tag) => section.tags.includes(tag))
        );
      }
      filteredSections.sort(function (a, b) {
        if (a.isAuthorized == b.isAuthorized) {
          if (a.title < b.title) {
            return -1;
          }
          return 1;
        }
        return a.isAuthorized ? -1 : 1;
      });

      filteredSections = this.twoColumnSort(filteredSections);

      var sectionCards = filteredSections.map((section) => (
        <SectionCard
          title={section.title}
          description={section.description}
          section={section.sectionName}
          themeId={sectionListJSON.metadata.themeId}
          isEnabled={section.isEnabled}
          isAuthorized={section.isAuthorized}
          key={section.sectionName}
        />
      ));
      // <SearchBar style={{ marginBottom: '5px', height: 'auto' }} itemList={filteredSections.map((section) => ({value: section.sectionName, label: section.title}))} updateFilter={this.updateFilter(this)}/>
      return (
        <Fragment>
          <FilterBar
            updateFilter={this.updateFilter(this)}
            updateFilterTags={this.updateFilterTags(this)}
            tagList={this.tags}
          />
          <Layout>
            <Layout.Section oneHalf>
              {sectionCards.slice(sectionCards.length / 2)}
            </Layout.Section>
            <Layout.Section oneHalf>
              {sectionCards.slice(0, sectionCards.length / 2)}
            </Layout.Section>
          </Layout>
        </Fragment>
      );
    }
  }
}

export default SectionList;
