import React, { Fragment } from "react";
import {
  Card,
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from "@shopify/polaris";
import SearchBar from "./SearchBar";

class SectionListSkeleton extends React.Component {
  render() {
    return (
      <Fragment>
        <SearchBar />
        <Layout>
          <Layout.Section oneHalf>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={8} />
              </TextContainer>
            </Card>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={8} />
              </TextContainer>
            </Card>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={8} />
              </TextContainer>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={8} />
              </TextContainer>
            </Card>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={8} />
              </TextContainer>
            </Card>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={8} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </Fragment>
    );
  }
}

export default SectionListSkeleton;
