import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMyAreaProps {
  wpTitle: string;
  context: WebPartContext;
  listUrl: string;
  listName: string;
  pageSize: number;
  superEmail: string;

  showHelp: boolean;
  helpLink: string;
  helpTitle: string;

  showHelpMsg: boolean;
  helpMsgTxt: string;
  helpMsgLink: string;
  helpMsgLinkTxt: string;
}
