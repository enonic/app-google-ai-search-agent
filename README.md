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

TODO:



## File configuration

TODO: Verify config name

You must add `com.enonic.app.googlesearch.cfg` configuration file to your XP instance.

There are 2 mandatory configuration values:

| Name                        | Description                           |
|-----------------------------|---------------------------------------|
| `google.configId`           | The Google app integration id.        |
| `google.serviceAccountJson` | Google service account json file path |

### Example

```properties
google.serviceAccountJson=${xp.home}/config/service-account-data.json
google.configID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## Site deployment

Once the app is correctly installed, simply add it to your site - and optionally configure it via the available form.

TODO: Form screenshot
