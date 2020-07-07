# Setup your Google Cloud Platform (GCP) Account

### Why do this
 - Your workload is too big to run on your laptop
 - You don't want to wait for compute time on your organization's shared, on-premise compute cluster
 - You want to use Google Cloud Platform services to run large (or huge) genomic analysis jobs

### What is this
 - The ability to perform analysis (or compute) on files (and other types of data) at dynamic scale 
 - Preparation for running analysis on public cloud services hosted by GCP

### Key considerations
 - Use the best fit GCP Account type:  
    - **Use GCP Free Tier** - get $ 300 USD in GCP credits for new users. Use GCP with minimal-sized service limits set by Google (i.e max number of CPUs for VMs...) - [link to free tier](https://cloud.google.com/free) 

    --OR--  

    - **Use Your Organization's GCP Account** - service limits set by your company & Google
 - Understand your project scope:
    - the size & complexity of your analysis  
    - your project budget / timeline  
 - Determine the best location (GCP data center):
    - GCP cloud has regional data centers which are further divded into zones within the physical data center location
    - global [GCP data center locations](https://cloud.google.com/about/locations/) shown below

   [![GCP Locations](/images/regions.png)]()

 NOTE: There are many bioinformatics analysis workflow tools, libraries & solutions which can be run on top of core GCP services.  Examples include [Terra.bio (was Firecloud)](https://terra.bio/), [cromwell](https://cromwell.readthedocs.io/en/stable/), [Nextflow.io](https://www.nextflow.io/) and many others. 

### How to do this
 - **REQUEST** an account
   - a) USE a GCP account from your organization --OR--
   - b) SETUP a GCP new (FREE Tier) account
 - **CREATE** a GCP PROJECT 
   - USE **each** GCP Project as a container for **each** of your research projects
   - CREATE separate GCP projects, as a best practice (this allows you to more easily manage security & service costs by grant)
 - **ADD** GCP service instances to your GCP Project 
    - ADD services by data center location and GCP project name, for example...
    - ADD a Virtual Machine instance & a Cloud Storage bucket which are located...
      - in the Google datacenter in `us-east` --AND--
      - in your GCP Project named `my-research-project`

### 📺 Click below to see Lynn's 'Setup GCP account video' 6 min video
[![Setup GCP Account - Google Cloud Platform for Bioinformatics](http://img.youtube.com/vi/oD8lD8v-Z14/0.jpg)](http://www.youtube.com/watch?v=oD8lD8v-Z14 "Setup GCP Account - Google Cloud Platform for Bioinformatics")

[MAC Download](https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-290.0.1-darwin-x86_64.tar.gz)

```bash
    cd ~
    ./google-cloud-sdk/install.sh
    echo "export GOOGLE_APPLICATION_CREDENTIALS=~/stimson-d82663d96ea4.json" >> ~/.bash_profile
    source ~/.bash_profile
    ./google-cloud-sdk/bin/gcloud components update
```

## Follow Google Clouds project creation process

[Comprehensive instructions](Setup_GCP_Account.md)

```
    gcloud init
    gcloud auth list
    gcloud config list
    open open https://cloud.google.com/docs/authentication/getting-started
    open https://flaviocopes.com/google-api-authentication/#create-a-new-google-api-project
```

### Enable a Free Trial

```bash
    https://console.cloud.google.com/freetrial/signup/billing/US?project=ds-translation-service
```

### Enable Custom Search

```bash
    open https://console.cloud.google.com/iam-admin/settings?project=ds-custom-search-service
    open https://console.developers.google.com/apis/library/customsearch.googleapis.com?organizationId=0&project=ds-custom-search-service
    open https://cse.google.com/cse/all
	*.google.com
    open https://cse.google.com/cse/setup/basic?cx=001854399042890182666:4g4vbypdey4
    # GET API KEY
    open https://developers.google.com/custom-search/v1/introduction
    # get SEARCH ENGINE ID:
    open https://cse.google.com/cse/setup/basic?cx=001854399042890182666%3A4g4vbypdey4
```

### Enable Translation Services

```bash
    open https://console.cloud.google.com/iam-admin/settings?project=ds-translation-service
    open https://console.developers.google.com/apis/api/translate.googleapis.com/overview?project=ds-translation-service
```

### Create a Google credentials file

```bash
    open https://console.developers.google.com/apis/credentials?showWizardSurvey=true&project=stimson&supportedpurview=project&pli=1
```

### Download Google credentials file to your home directory

For example: ~/google-translator-########.json

```bash

echo GOOGLE_APPLICATION_CREDENTIALS=~/google-translator-########.json > ~/.bash_profile
source ~/.bash_profile
```

### How to verify you've done it
 - LOGIN to [GCP console](http://console.cloud.google.com) or Web UI
 - VIEW your account login (upper right of console)
 - VIEW your project name, shown as 'gcp-for-bioinformatics' below

 <img src="https://github.com/lynnlangit/gcp-for-bioinformatics/raw/master/images/gcp-account.png" width="460" align="right">  


### Other Things to Know
  - GCP FREE tier account have built-in service usage limits - [link](https://cloud.google.com/free/docs/gcp-free-tier)
 - GCP service costs are billed to **YOU** for FREE Tier (after you've spent your $300 credit)
 - GCP service costs are billed to **YOUR COMPANY**  (or research group) for Organizational Accounts
 - SET UP a **GCP Budget** to get notified when GCP services exceed a service cost limit you set (this is useful for testing accounts) - [link](https://cloud.google.com/billing/docs/how-to/budgets)
 - REVIEW GCP Billing Accounts & Resources Hierarchy (shown below)
    - A billing account can be linked to one or more GCP projects and the billing account specifies how you pay (credit card, invoice...) for GCP services
   - A billing account is linked to a payment profile (individual or corporate)

 [![billing](/images/billing.png)]()
 [![GCP Resource Hierarchy](/images/resources.png)]()
 

### How to learn more

#### GCP Enterprise Account Setup Guidance
 - 📘 Link to [Enterprise Onboarding Checklist](https://cloud.google.com/docs/enterprise/onboarding-checklist)
 - 📘 Link to [best practices for Enterprise Organizations](https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations)

#### GCP Billing

 - 📘 Link to [how to set up a budget alert](https://cloud.google.com/billing/docs/how-to/budgets)
- 📘 Link to [best practices for optimizing cloud costs](https://cloud.google.com/blog/products/gcp/best-practices-for-optimizing-your-cloud-costs)
 - 📘 Link to [GCP Billing concepts](https://cloud.google.com/billing/docs/concepts)
 - 📘 Link to [GCP Service Pricing Calculator](https://cloud.google.com/products/calculator/)
- 📘 Link to [Article on GCP Billing Accounts](https://medium.com/google-cloud/managing-billing-permissions-in-google-cloud-31906aa626a0)

#### GCP Billing on Terra.bio
 - 📘 Link to [Tips for controlling costs](https://support.terra.bio/hc/en-us/articles/360029748111-Understanding-and-controlling-cloud-costs-) article written by team at The Broad
 - 📘 Link to [Understanding costs by analysis type](https://support.terra.bio/hc/en-us/articles/360029772212) - using Terra for GCP for work at The Broad
 - 📺 Watch [understanding Terra (GCP service) costs](https://www.youtube.com/watch?v=SRVrzXHkZKU) - 27 minute video from the Broad
