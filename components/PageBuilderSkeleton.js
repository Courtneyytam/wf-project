import React, { Fragment } from "react";
import {
  Card,
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from "@shopify/polaris";

class PageBuilderSkeleton extends React.Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <Layout.Section>
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

export default PageBuilderSkeleton;
