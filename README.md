# my-area

## Summary

- MyArea web part displays forms listed in the [Links list](https://pdsb1.sharepoint.com/Forms/MyArea/Lists/Links/AllItems.aspx) based on the current user area location(s) which are retrieved from the [Schools list](https://pdsb1.sharepoint.com/sites/contentTypeHub/Lists/schools/AllItems.aspx) in content-type Hub. Filtering is done by the "SuperintendentEmail" column.
- Items are grouped by "deptGrp" and "subDeptGrp".
- Filtering is done through the search box at the top. User can search by: Form title, Employee Name, All Locations for me, Form details and Status.

![alt MyArea](https://github.com/Maya-Mostafa/MyArea/blob/master/myArea1.png)
![alt MyArea WP Properties](https://github.com/Maya-Mostafa/MyArea/blob/master/myArea2.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/npm/v/@microsoft/sp-component-base/latest?color=green)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

> Any special pre-requisites?

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

- Reading from a source list
- Filtering by name and date
- sorting provided for name and date
- grouping by list name



## Libraries

`npm i @pnp/sp`
`npm install @pnp/spfx-controls-react --save --save-exact` <br/>
`npm install moment` <br/>
`npm install @fluentui/react` <br/>
`npm install @fluentui/react-hooks`