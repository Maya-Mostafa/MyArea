export interface IFilterFieldsProps{
    onChangeFilterField: any;
    filterField: {
        title: {key: string, text: string},
        formStatus: {key: string, text: string},
        formDetails: string,
        fullName: string,
        locationNo: {key: string, text: string};
    };
    resetSrch: any;    
    formTitlesOptions: any;
    formLocationNosOptions: any;
}