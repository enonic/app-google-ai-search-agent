# Google AI search agent for Enonic sites

Adds embed code for Google AI search agent, and presents a chatbot style icon at the bottom right of your page.

NOTE: The AI agent icon is only visible in on published pages

## AI agent setup

This app depends on Google Cloud, where you must setup an AI agent and a service account to gain access.

1. Log in to Google Cloud:  https://console.cloud.google.com
2. Use an existing project, or create a new one.
3. From the `Solutions` menu, choose `Artificial Intelligence` -> `AI builder`
4. Click `+ Create app` and select the `Search` app type and give it suitable identifier.
5. Leave the standard settings, but fill in `App name` and `Company name` before you move on
6. In the next screen, click `+ Create datastore` and select `Website content`
7. Check `Advanced indexing`, fill in the URL to your site and continue
![Skjermbilde 2024-10-09 kl  14 11 03](https://github.com/user-attachments/assets/aee6f678-98bf-4ebe-ba23-3eaf74f3cc17)
8. Give the datastore a suitable name and click `Create`. This will take you back to the list of available datastores.
9. Select the freshly created datastore, and click `Create`. This will add the datastore to your search agent.
10. You may need to verify your ownership of the website, follow the instructions to complete this.
![Skjermbilde 2024-10-09 kl  14 16 29](https://github.com/user-attachments/assets/8be85626-9208-4d01-8caf-ae45328082a0)
11. Once the datastore is fully indexed (may take quite a while) you can try it out from the preview panel. 
![agent-preview](https://github.com/user-attachments/assets/e5640503-a2f4-4e3d-8b46-9a43c3f726db)

TIP: You may also tune the search agent on the configuration panel

## Service account setup

Once the Agent is operational, you will need a Google Cloud service account in order to access it from your website.

1. In the Google Cloud menu, go to `IAM & Admin` -> `Service Accounts`
2. Click `+ Create Service Account`. Give it a suitable name and click continue
3. Give it the role `AI Viewer` and create the service account. TODO: Verify 
4. Access the service account, and select the `Keys` tab
5. Create a new key in JSON format. The key will then automatically be downloaded to your machine

You are now ready to install the application

## Install

From your Enonic XP instance, install the "Google AI Search Agent" app which is available from (https://market.enonic.com/vendors/enonic/google-ai-search-agent)[Enonic Market]


### Add service account key

Add the JSON key file file to your XP instance configuration folder. The file must be renamed to `service-account-data.json` before you upload it.

NOTE: You may optionally use a different location or file name by adding an app conf file that specifies this. Below is the default config:

com.enonic.app.googleaisearchagent.cfg
`google.serviceAccountJson=${xp.home}/config/service-account-data.json`


## Site deployment

The final step is about adding the app to your site. 

### Google Agent builder

We need to prepare for integrating the agent with the website. Start by opening your Agent once more.

1. Select the `Integrations` tab. Make sure `JWT/Oauth` is selected
2. Type in the domain name where you will be hosting the agent, and click `ADD`
3. Copy the configID value listed in the script, you will need it soon.

You are now ready for the final step, deploying the agent to your website. 

### Content Studio

The final step is adding the app to your site.

In Studio, open the site where you want to deploy the app.

1. From the applications field, click `Add`, and select the `Google AI search agent` app.
2. From the added search agent app, click pencil icon to configure the app
TODO Screenshot
3. Fill in the `configID` you grabbed in the previous step, and optionally tune the Agent visuals using the other options in the form
4. Save and publish the changes. 

You should now be able to see the AI agent on your live website!

TODO Screenshot