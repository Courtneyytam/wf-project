import React, { Fragment } from "react";
import {
  Button,
  Card,
  FormLayout,
  Layout,
  Select,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from "@shopify/polaris";

class AccountSettingsSkeleton extends React.Component {
  render() {
    var themeSettings = (
      <Fragment>
        <Layout.AnnotatedSection title="App Settings">
          <FormLayout>
            <Select onChange={() => {}} />
            <Button primary disabled>
              Save
            </Button>
          </FormLayout>
        </Layout.AnnotatedSection>
      </Fragment>
    );

    return (
      <Layout>
        {themeSettings}
        <Layout.AnnotatedSection title="Subscription">
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={4} />
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={4} />
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={4} />
            </TextContainer>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    );
  }
}

export default AccountSettingsSkeleton;
