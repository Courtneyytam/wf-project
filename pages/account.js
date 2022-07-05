import {
  Banner,
  Button,
  ButtonGroup,
  FormLayout,
  Layout,
  Page,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import React, { Fragment } from "react";
import AccountSettingsSkeleton from "../components/AccountSettingsSkeleton";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Dropdown from "../components/Dropdown";
import OopsState from "../components/OopsState";
import SubscriptionPlanCard from "../components/SubscriptionPlanCard";
import UpdateSectionsBanner from "../components/UpdateSectionsBanner";

var helpers = require("../helpers.js");

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.successBanner = (
      <Banner
        title="Successfully registered"
        status="success"
        onDismiss={this.clearBanner}
      />
    );
    this.errorBanner = (
      <Banner
        title="Invalid access code"
        status="warning"
        onDismiss={this.clearBanner}
      />
    );

    this.themes = [];
    this.state = {
      error: null,
      hasChanges: false,
      isLoaded: false,
      selectedThemeId: null,
      originalThemeId: "",
      isSaving: false,
      saveError: null,
      saveSuccess: null,
      showToast: false,
      deleteTarget: "",
      showDeleteModal: false,
      showAgencyBanner: false,
      agencySuccess: false,
      agencyMessage: "",
      promoCode: "",
    };
  }

  async componentDidMount() {
    let loadFailure = true;
    let numRetries = 3;
    let recentError;
    for (let i = 0; i < numRetries; i++) {
      try {
        let mainTheme = await helpers.getActiveTheme();
        let selectedThemeId = "";
        if (mainTheme) {
          selectedThemeId = mainTheme.themeId;
        }
        this.themes = await helpers.getAllThemesAwaitable(true);
        this.accountDetails = await helpers.getAccountDetails();
        this.availablePlans = await helpers.getSubscriptionPlans();
        let availableUpdates = await helpers.getAvailableUpdates();
        this.setState({
          isLoaded: true,
          selectedThemeId: selectedThemeId,
          originalThemeId: "" + selectedThemeId,
          availableUpdates,
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

  clearBanner = () => {
    this.setState({ showAgencyBanner: false });
  };

  confirmDelete = function (comp) {
    return (deleteAction, deleteTarget) => {
      let deleteFn = function () {
        comp.setState({ showDeleteModal: false });
        deleteAction();
      };
      // document.body.style.overflowY = 'hidden';
      comp.setState({
        showDeleteModal: true,
        deleteTarget: deleteTarget,
        deleteAction: deleteFn,
      });
    };
  };

  saveChanges = async () => {
    if (this.state.selectedThemeId != "") {
      this.setState({ isSaving: true });
      try {
        await helpers.updateActiveTheme(this.state.selectedThemeId);
        this.setState({
          saveSuccess: true,
          isSaving: false,
          originalThemeId: this.state.selectedThemeId,
          showToast: true,
        });
      } catch (err) {
        this.setState({
          isSaving: false,
          saveError: err,
          saveSuccess: false,
          showToast: true,
        });
      }
    }
  };

  clearData = async () => {
    if (this.state.selectedThemeId != "") {
      this.setState({ isSaving: true });
      try {
        console.log(
          "Clearing section data for theme: " + this.state.selectedThemeId
        );
        await helpers.clearAllBoodl(
          this.state.selectedThemeId,
          this.state.selectedThemeId == this.state.originalThemeId
        );
        if (this.state.selectedThemeId == this.state.originalThemeId) {
          this.setState({
            saveSuccess: true,
            isSaving: false,
            originalThemeId: "",
            selectedThemeId: "",
            showToast: true,
          });
        } else {
          this.setState({
            saveSuccess: true,
            isSaving: false,
            selectedThemeId: this.state.originalThemeId,
            showToast: true,
          });
        }
      } catch (err) {
        console.log(err);
        this.setState({
          isSaving: false,
          saveError: err,
          saveSuccess: false,
          showToast: true,
        });
      }
    }
  };

  discardChanges = () => {
    console.log("add clear form logic");
  };

  hideModal = () => {
    this.setState({ showDeleteModal: false });
    // document.body.style.overflowY = 'auto';
  };

  activateAgency = async (activationCode) => {
    try {
      this.setState({ isTestingAccessCode: true });
      let response = await helpers.activateAgency(activationCode);
      if (response.status == "success") {
        // successfully registered under agency
        // if (!this.accountDetails) {
        //   this.accountDetails = {};
        // }
        // this.accountDetails.planLevel = 2;
        // this.accountDetails.planName = "Agency";
        this.setState({
          agencySuccess: true,
          agencyMessage: response.data.message,
          promoCode: activationCode,
          showAgencyBanner: true,
          isTestingAccessCode: false,
        });
      } else {
        // wrong code or error
        this.setState({
          agencySuccess: false,
          showAgencyBanner: true,
          isTestingAccessCode: false,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        agencySuccess: false,
        showAgencyBanner: true,
        isTestingAccessCode: false,
      });
    }
  };

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <OopsState message={error.message} />;
    } else if (!isLoaded) {
      return (
        <Page title="Account Settings">
          <AccountSettingsSkeleton />
        </Page>
      );
    } else {
      this.successBanner = (
        <Banner
          title={this.state.agencyMessage || "Successfully registered"}
          status="success"
          onDismiss={this.clearBanner}
        />
      );
      var themeSettings = (
        <Fragment>
          <Layout.AnnotatedSection title="App Settings">
            <FormLayout>
              <Dropdown
                options={this.themes.map((theme) => ({
                  value: "" + theme.id,
                  label: theme.name,
                }))}
                selected={"" + this.state.selectedThemeId}
                updateSelected={(themeId) => {
                  this.setState({ selectedThemeId: themeId });
                }}
                disabled={this.state.isSaving}
                key={"" + this.state.originalThemeId}
              />
              <ButtonGroup>
                <Button
                  primary
                  onClick={this.saveChanges}
                  disabled={
                    this.state.isSaving ||
                    this.state.originalThemeId == this.state.selectedThemeId
                  }
                >
                  Save
                </Button>
                <Button
                  destructive
                  onClick={this.confirmDelete(this)}
                  disabled={
                    this.state.isSaving || this.state.selectedThemeId == ""
                  }
                >
                  Clear data
                </Button>
              </ButtonGroup>
            </FormLayout>
          </Layout.AnnotatedSection>
        </Fragment>
      );

      return (
        <Page title="Account Settings">
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
          {this.state.availableUpdates.availableUpdates.length == 0 || (
            <UpdateSectionsBanner
              updateCount={this.state.availableUpdates.availableUpdates.length}
              update={() => {
                console.log("UPDATE");
              }}
            />
          )}
          <ConfirmDeleteModal
            open={this.state.showDeleteModal}
            delete={() => {
              this.hideModal();
              this.clearData();
            }}
            cancel={this.hideModal}
            title={"Clear all boodl data from the selected theme?"}
          />
          <Layout>
            {themeSettings}
            <Layout.AnnotatedSection title="Subscription">
              {this.availablePlans.map((subscriptionPlan) => (
                <SubscriptionPlanCard
                  key={subscriptionPlan.planName}
                  plan={subscriptionPlan}
                  changePlan={this.updatePlan}
                  activateAgency={this.activateAgency}
                  activePlanLevel={this.accountDetails.planLevel}
                  showAgencyBanner={this.state.showAgencyBanner}
                  banner={
                    this.state.agencySuccess
                      ? this.successBanner
                      : this.errorBanner
                  }
                  isProcessing={this.state.isTestingAccessCode}
                  agencyMessage={this.state.agencyMessage}
                  promoCode={this.state.promoCode}
                />
              ))}
            </Layout.AnnotatedSection>
          </Layout>
        </Page>
      );
    }
  }
}

export default AccountSettings;
