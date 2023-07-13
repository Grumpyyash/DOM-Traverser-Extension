# website-dom-validation-chrome-extension

## About this extension

This chrome extension is a tool for checking the website against the semantic standards, validating the styles of different elements against the configuration file, and checking the density of certain specifc elements

## Getting started

Pre-requisite and steps to use the extesnion -

1. Get node installed on your computer https://nodejs.org/en/download
2. Get a package manager, npm or yarn
3. fork this repository or clone it to your local computer in a folder `https://docs.gitlab.com/ee/user/project/repository/forking_workflow.html`
4. Alternatively, download the zip file of the project and extract it to a folder
5. Open the folder in a text editor of your choice

```
cd website-dom-validation-chrome-extension
npm install (do try npm install --force in case of a version conflict)
npm start
```

7. The `npm start` will generate a `dist` folder at the project directory level
8. Go to the `chrome://extensions` in the browser
9. Make sure to toggle on the `developer mode`
10. load unpacked the `dist` folder and grant asked permissions
11. Congratulations, you can now locally use the extension on both local as well as online websites!

## Install from chrome store

This chrome extension has been published to the chrome webs store and can be found here -
https://chrome.google.com/webstore/detail/dom-traversal-extension/dfmlldndmgpnehmldhgejcpeoggjhhjj

Don't forget to review it if it helps :)

## Usage

The features and user manuals of this extension can be found out at - https://dom-traverser-extension.netlify.app/

It also contains a video explaining the workflow of the extension

- This chrome extension can be used on both local as well as online websites
- The standards that are used for evaluating your websites can be found at - https://dom-traverser-extension.netlify.app/semantics/standards
- Open the websites that you wish to validate
- Once you have loaded unpacked the extension on chrome, its icon would appear along with other extensions on your browser
- You will need to click on the extension icon on the website you wish to work upon to show the popup of extension
- The popup also contains links to video manual and website
- You will be able to see the three main features of extension on the popup
- For checking the semanticity of the website -

  - Select the option `check semantics` on the popup
  - You will notice a few things happening
  - You website's dom will be updated with `red-highlighted` rectangles and `query-icons`
    - The red-highlighted elements are the tags which violated our semantic standards
    - The query tag serves as an indicator to know more about the issue
    - Clicking on the query icon will open a modal which conatins what standards did that element violate and possible fixes, if any
  - A bulb-icon also appears on the dom
    - This is about the general errors on the website regarding what semantic elements did this website not use
    - Clicking the bulb icon gives that info in a modal
  - A new-chrome tab will also open
    - This contains all the violations that we encountered while traversing dom
    - You also get options to view the full path of element in the html dom tree
    - You can choose to highlight any specific element from this tab
    - As an extra feature you can also get accessibility errors of your website on this new tab
  - It also constantly watches for mutations on the website, and is also compatible for dynamic loading website
  - When async data loads, you will get an alert that website has mutated, and you will need to refresh the new tab for latest violations<br /><br />

- For validating styles of website -

  - Click on the option `check-styles` from the popup
  - It gives two options to users
    - Validate against the default styles configuration -
      https://dom-traverser-extension.netlify.app/styles/configuration
    - Or, upload a custom JSON styles configuration file, you will be able to download the default configuration on clicking `check sample config`
  - On clicking submit, the checks start for the website
  - Similar to the check-semantics, here also the dom gets modified with `red-highlighted` elements and you can view the error messages on clicking the icons
  - A new tab opens using which you can see the detailed violation and get full path in the html tree and get to highlight specific elements
  - Similar to the check-semantics option, this also accounts for mutations and gives alert when you need to refresh the new tab
  - It also handles cases where users input incorrect formatted configuration files
    <br /><br />

- For validating density of specific elements -
  - Click on the option `check-density` from the popup
  - It gives three options to users
    - Validate against the spacious styles configuration
    - Or, validate against the compact view configuration
    - Or, validate the website against a custom density configuration file by uploading it
    - The configuration options can be viewed at -
      https://dom-traverser-extension.netlify.app/density/configuration
  - On clicking submit, the checks start for the website
  - A new tab opens using which you can see the detailed violation and get full path in the html tree and get to highlight specific elements
  - Similar to the other two options, here also the dom gets modified with `cross-icons` clicking which opens a modal showing the error messages
  - It also tracks for mutations and handles exceptional cases where user input incoorect file or incorrect format of JSON inside a correct file

## Testing the extension

The tests are specified in the `tests` folder in the main project directory

```
cd website-dom-validation-chrome-extension
npm test
```

The `npm test` will run all the test suites

## Collaborating and contributing

You are welcome to contribute to this project in many ways, just make sure to follow guidelines and set proper repository origin and upstream

```
git remote add origin {your_repository_origin_here}
git branch -M main
git push -u origin main
```

Make sure to generate pull requests in order to contribute

## Support

In case of any issues, please email me at yash.vardhan@sprinklr.com
