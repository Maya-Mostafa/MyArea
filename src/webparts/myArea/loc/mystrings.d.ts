declare interface IMyAreaWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'MyAreaWebPartStrings' {
  const strings: IMyAreaWebPartStrings;
  export = strings;
}
