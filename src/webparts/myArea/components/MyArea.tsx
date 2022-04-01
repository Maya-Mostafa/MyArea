import * as React from 'react';
import styles from './MyArea.module.scss';
import {Icon, initializeIcons, MessageBar, MessageBarType} from '@fluentui/react';
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
        const listItemsForms = res.flat().map(item => {
          return {
            key: item.title,
            text: item.title
          };
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
		<div className={styles.myArea}>
			<h2>{props.wpTitle}</h2>

			<div className={styles.fieldsAndHelp}>
				<div className={styles.fieldsSection}>
            <IFilterFields
              filterField={filterFields}
              onChangeFilterField={onChangeFilterField}
              resetSrch={resetSrch}
              formTitlesOptions={formTitles}
              formLocationNosOptions={formLocationNos}
            />
					</div>
          {props.showHelp && (
						<div className={styles.helpSection}>
							<a
								href={props.helpLink}
								title={props.helpTitle}
								target='_blank'
								data-interception='off'
							>
								<Icon iconName='StatusCircleQuestionMark' />
							</a>
						</div>
					)}
			</div>

			{props.showHelpMsg && (
				<MessageBar
					messageBarType={MessageBarType.warning}
					isMultiline={true}
					className={styles.helpMsg}
				>
					{props.helpMsgTxt}
					<a href={props.helpMsgLink}>{props.helpMsgLinkTxt}</a>
				</MessageBar>
			)}

			<IListItems
				items={listItems}
				preloaderVisible={preloaderVisible}
				filterField={filterFields}
			/>
		</div>
  );
}
