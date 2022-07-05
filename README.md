# wf-project

## Development Guide
### Useful Shortcuts

Install app (dev) [replace the ngrok url with the current one]: https://72c5dade.ngrok.io/auth?shop=cttm-dev-store.myshopify.com
Install app (heroku): [Install link](https://section-inject-app.herokuapp.com/auth?shop=cttm-dev-store.myshopify.com)
Install app (gcloud-na): https://boodl-na.appspot.com/auth?shop=cttm-dev-store.myshopify.com

### How to Host App Locally (Mac)

Pre-requisites: [Homebrew](https://brew.sh/)

First, install node.js and npm. To do this on MacOSX, run `brew install node` in terminal. Check if it worked by running `node -v` and `npm -v`. Now, download and install ngrok with `brew cask install ngrok`. Set up an [ngrok account](https://ngrok.com/download) to make the tunnels last longer - you can use your Github account (optional, but recommended)

Next, navigate to the project directory (wf-project) through terminal. Run `npm install` to install all the project dependencies (including ngrok). To open the ngrok tunnel, run in a different window `ngrok http 3000`.

Now create a file called `.env` in the project directory, which
has the following content:
```
SHOPIFY_API_KEY='a32ab70ba5bcc3ec48a14601953497f0'
SHOPIFY_API_SECRET_KEY='<secret shopify key>'
HOST='<your ngrok address>'
API_VERSION='2019-10'
MONGO_PW='<mongopw_here>'
```

To start the server, run `npm run dev`.

Now, in the [App Setup page](https://partners.shopify.com/1239260/apps/3326815/edit) for boodl, update the App URL and Whitelisted Redirection URL to the ngrok address of your computer.

If you want the app to use a specific database, you must update the `mongoUri` variable in `server.js`.

### Mongo Setup
Firstly, download Mongo Compass [here](https://www.mongodb.com/download-center/compass).

After downloading, run the installer. Open Mongo Compass app. If on MacOS, you may be prevented from opening the app due to inability to scan for "malicious software." In this case, go to Security & Privacy, and change the settings there.

Change the connection string: `mongodb+srv://tristan-admin:<password>@dev-cluster-mpd8o.mongodb.net/test`
For the SG Mongo instance, use this connection string: `mongodb+srv://tristanAdmin:<password>@cluster0-d09md.gcp.mongodb.net/test`
(Contact Tristan for the password).

Click `Connect`, and now you're in!

If connection doesn't work, try the troubleshooting tips [here](https://docs.atlas.mongodb.com/troubleshoot-connection/#mongodb-compass-troubleshooting).

### Mongo Usage
All relevant data is stored within the boodl database.

The `sections` collection specifies display name, file name, etc. for all existing sections. I (Tristan) highly recommend only updating sections by importing from the `full_section_lib.json` file. Update the file and re-import to add new sections. NB: Importing only performs add, not update. As of now, updates must be done by hand.

The `clients` collection is a list of clients, and their subscription data.

The `active_sections` collection is experimental right now, but would contain the list of active sections for each client.

For fun, try changing the planLevel of a section, and see the display change within boodl app.

### Image Hosting

Default images will be hosted either via GitHub Pages or Google Cloud CDN.
