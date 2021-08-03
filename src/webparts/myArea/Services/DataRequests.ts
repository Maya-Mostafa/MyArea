import { WebPartContext } from "@microsoft/sp-webpart-base";
import {SPHttpClient} from "@microsoft/sp-http";

const getImgStatus = (formStatus: string) =>{
  let imgStatusName: string, imgStatusText: string;
  switch (formStatus){
    case 'Completed':
      imgStatusName = 'completed.svg';
      imgStatusText = 'Completed';
      break;
    case 'Department_Accepted':
      imgStatusName = 'deptAccepted.svg';
      imgStatusText = 'Accepted by the Department';
      break;
    case 'Department_Rejected':
      imgStatusName = 'deptRejected.svg';
      imgStatusText = 'Rejected by the Department';
      break;
    case 'Approver1_Accepted':
      imgStatusName = 'personAccepted.svg';
      imgStatusText = 'Accepted by Approver';
      break;
    case 'Approver1_Rejected':
      imgStatusName = 'personRejected.svg';
      imgStatusText = 'Rejected by Approver';
      break;
    case 'Submitted':
    case 'Approver1_Inprogress':
    case 'Superintendent_Inprogress':
    case 'Department_Inprogress':
      imgStatusName = 'submitted.svg';
      imgStatusText = 'In Progress for Approval';
      break;
    case 'Superintendent_Accepted':
      imgStatusName = 'superAccepted.svg';
      imgStatusText = 'Accepted by Superintendent';
      break;
    case 'Superintendent_Rejected':
      imgStatusName = 'superRejected.svg';
      imgStatusText = 'Rejected by Superintendent';
      break;
    case 'New':
      imgStatusName = 'new.svg';
      imgStatusText = 'New';
      break;
    case 'Approver1_Invalid':
    case 'Superintendent_Invalid':
    case 'Department_Invalid':
      imgStatusName = 'invalid.svg';
      imgStatusText = 'Invalid';
      break;
    default:
      imgStatusName = 'other.svg';
      imgStatusText = 'Other';
      break;
  }
  return [imgStatusName, imgStatusText];
};

const getMyLocationsInfo = async (context: WebPartContext, locNum: string) =>{
  const   restUrl = `/sites/contentTypeHub/_api/web/Lists/GetByTitle('schools')/items?$select=Title,School_x0020_My_x0020_School_x00,School_x0020_Name&$filter=Title eq '${locNum}'`,
          _data = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1);
  let locInfo : {} = {};
  
  if(_data.ok){
      const result = await _data.json();
      locInfo = {key: result.value[0].Title, text: `${result.value[0].School_x0020_Name} (${result.value[0].Title})` };
  }
  return locInfo;
};
const getMyLocations = async (context: WebPartContext) =>{
  const   currUserEmail = context.pageContext.user.email,
          restUrl = `/sites/contentTypeHub/_api/web/Lists/GetByTitle('Employees')/items?$filter=MMHubBoardEmail eq '${currUserEmail}'&$select=MMHubLocationNos`;

  const myLocs = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1).then(response => response.json());
  const myLocsNum : [] = myLocs.value[0].MMHubLocationNos.split(";");

  return myLocsNum;
};
export const getMyLocsDpd = async (context: WebPartContext) =>{
  const myLocsNos = await getMyLocations(context).then(r=>r);
  const myLocsDpd = [];
  
  for(let myLocNo of myLocsNos){
    const myLocDpd = await getMyLocationsInfo(context, myLocNo);//.then(r=>r);
    myLocsDpd.push(myLocDpd);
  }

  return Promise.all(myLocsDpd);
};

const getListItems = async (context: WebPartContext, listUrl: string, listName: string, listDisplayName: string, pageSize: number, locNo: string) =>{
  
  const listData: any = [];
  //const currUserEmail = context.pageContext.user.email;

  const responseUrl = `${listUrl}/_api/web/Lists/GetByTitle('${listName}')/items?$top=${pageSize}&$filter=substringof('${locNo}', LocationNo)`;
  const response = await context.spHttpClient.get(responseUrl, SPHttpClient.configurations.v1); //.then(r => r.json());

  if (response.ok){
    const results = await response.json();
    if(results){
      results.value.map((item: any)=>{
        listData.push({
          id: item.Id,
          title: item.Form_x0020_Title || "",
          formStatus: item.FormStatus || "",
          formImgStatus: getImgStatus(item.FormStatus)[0],
          formTextStatus: getImgStatus(item.FormStatus)[1],
          fullName: item.FullName1 || "",
          formDetails: item.FormDetail || "",
          deptGrp: item.DeptSubDeptGroupings.substring(0, item.DeptSubDeptGroupings.indexOf('|')),
          subDeptGrp: item.DeptSubDeptGroupings.substring(item.DeptSubDeptGroupings.indexOf('|')+1),
          listUrl: listUrl,
          listName: listName,
          listDisplayName: listDisplayName,
          locationNo: item.LocationNo || "",
          locationName: item.LocationNames || "",
          posGroup: item.POSGroup || ""
        });
      });
    }
  }

  return listData;
};

export const readAllLists = async (context: WebPartContext, listUrl: string, listName: string, pageSize: number) =>{
  const listData: any = [];
  let aggregatedListsPromises : any = [];
  const responseUrl = `${listUrl}/_api/web/Lists/GetByTitle('${listName}')/items`;
  const response = await context.spHttpClient.get(responseUrl, SPHttpClient.configurations.v1).then(r => r.json());

  response.value.map((item: any)=>{
    listData.push({
      listName: item.Title,
      listDisplayName: item.ListDisplayName,
      listUrl: item.ListUrl
    });
  });

  const myLocs = await getMyLocations(context).then(r => r);
  for (let myLoc of myLocs){
    listData.map((listItem: any)=>{
      aggregatedListsPromises = aggregatedListsPromises.concat(getListItems(context, listItem.listUrl, listItem.listName, listItem.listDisplayName, pageSize, myLoc));
    });
  }

  return Promise.all(aggregatedListsPromises);
};

export const isObjectEmpty = (items: any): boolean=>{
  let isEmpty:boolean = true;
  for (const item in items){
    isEmpty = items[item] === "" && isEmpty ;
  }
  return isEmpty;
};

export const uniq = (arr: any) => {
  const prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

  return arr.filter(function(item) {
      var type = typeof item;
      if(type in prims)
          return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
      else
          return objs.indexOf(item) >= 0 ? false : objs.push(item);
  });
};


export const arrayUnique = (arr, uniqueKey) => {
  const flagList = [];
  return arr.filter(function(item) {
    if (flagList.indexOf(item[uniqueKey]) === -1) {
      flagList.push(item[uniqueKey]);
      return true;
    }
  });
};