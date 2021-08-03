import * as React from 'react';
import styles from './MyArea.module.scss';
import { IMyAreaProps } from './IMyAreaProps';
import {readAllLists, arrayUnique, getMyAreaLocsDpd} from  '../Services/DataRequests';
import IListItems from '../components/IListItems/IListItems';
import IFilterFields from '../components/IFilterFields/IFilterFields';

export default function MyArea (props: IMyAreaProps){

  const [listItems, setListItems] = React.useState([]);
  const [formTitles, setFormTitles] = React.useState([]);
  const [formLocationNos, setFormLocationNos] = React.useState([]);
  const [preloaderVisible, setPreloaderVisible] = React.useState(true);
  const [filterFields, setFilterFields] = React.useState({
    title: {key: "", text: ""},
    formStatus: {key: "", text: ""},
    formDetails: "",
    fullName: "",
    locationNo: {key: "", text: ""},
  });

  React.useEffect(()=>{
    getMyAreaLocsDpd(props.context, props.superEmail).then(r=>{
      setFormLocationNos(r[0].sort((a, b) => a.text.localeCompare(b.text)));
      readAllLists(props.context, props.listUrl, props.listName, props.pageSize, r[1]).then((res: any) =>{
        const listItemsForms  : any = [];
        r.map(i=>{
          if(i.length > 0){
            listItemsForms.push({
              key: i[0].title,
              text: i[0].title
            });
          }
        });
        setFormTitles(arrayUnique(listItemsForms, 'key').sort((a, b) => a.key.localeCompare(b.key)));
        setListItems(res.flat());
        setPreloaderVisible(false);
      });
    });
  }, []);

  const onChangeFilterField = (fieldNameParam: string) =>{
    return(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: any) =>{   
      setFilterFields({
        ...filterFields,
        [fieldNameParam] : text || ""
      });
    };
  };
  
  const resetSrch = () =>{    
    setFilterFields({
      title: {key: "", text: ""},
      formStatus: {key: "", text: ""},
      formDetails: "",
      fullName: "",
      locationNo: {key: "", text: ""},
    });
  };

  return (
    <div className={ styles.myArea }>
      <h2>{props.wpTitle}</h2>
  
      <IFilterFields 
        filterField={filterFields} 
        onChangeFilterField={onChangeFilterField} 
        resetSrch={resetSrch}
        formTitlesOptions={formTitles}
        formLocationNosOptions={formLocationNos}
      />

      <IListItems
        items = {listItems}
        preloaderVisible = {preloaderVisible}
        filterField = {filterFields}
      />
    </div>
  );
}
