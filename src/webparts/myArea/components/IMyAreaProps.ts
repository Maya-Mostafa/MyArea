import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMyAreaProps {
  wpTitle: string;
  context: WebPartContext;
  listUrl: string;
  listName: string;
  pageSize: number;
  superEmail: string;
}
