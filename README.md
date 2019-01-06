# The-Restricted-Section
A library web application built on Node.JS with IBM AppID for Authentication and Identity Management.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

1. Sign up for an [IBM Cloud account](https://console.bluemix.net/registration/).
1. Download the [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html#overview).
1. Download and setup [Node.js](https://nodejs.org/en/download/).
1. Create an instance of the Cloudant service and get your credentials:
    - Go to the [Cloudant](https://console.bluemix.net/catalog/services/cloudant) page in the IBM Cloud Catalog.
    - Log in to your IBM Cloud account.
    - Click **Create**.
    - Click **Show** to view the service credentials.
    - Copy the `url` value.
1. Clone the project 
```
git clone https://github.com/bedangSen/The-Restricted-Section.git
```

## Configuring the application

1. Open the config.js file and change the _url_ for the Cloudant service. 

```
cloudant_url: 'url'
```

## Running locally

1. Install the dependencies.

    ```
    npm install
    ```

1. Run the application.

    ```
    nodemon app.js
    ```

1. View the application in a browser at `localhost:8080`

## Deploying to IBM Cloud as a Cloud Foundry Application

1. Login to IBM Cloud with the [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html#overview).

    ```
    ibmcloud login
    ```

1. Target a Cloud Foundry organization and space.

    ```
    ibmcloud target --cf
    ```
  
1. Deploy the application.

    ```
    ibmcloud app push
    ```

1. View the application online at the app URL.  
For example: https://my-app-name.mybluemix.net
