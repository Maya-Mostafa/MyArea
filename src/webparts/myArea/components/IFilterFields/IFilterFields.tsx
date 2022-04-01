import * as React from 'react';
import {IFilterFieldsProps} from './IFilterFieldsProps';
import {Stack, IStackProps, IStackStyles, SearchBox, ActionButton, initializeIcons, ComboBox, IComboBoxOption, Icon} from '@fluentui/react';
import styles from '../MyArea.module.scss';
import {isObjectEmpty} from '../../Services/DataRequests';

export default function IFilterFields (props: IFilterFieldsProps) {
    
    initializeIcons();
    const stackTokens = { childrenGap: 50 };
    const stackStyles: Partial<IStackStyles> = { root: { width: '100%' } };
    const columnProps: Partial<IStackProps> = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: '50%' } },
    };

    const options: IComboBoxOption[] = [
        { key: 'Approver1_Accepted', text: 'Accepted by Approver' },
        { key: 'Department_Accepted', text: 'Accepted by the Department' },
        { key: 'Superintendent_Accepted', text: 'Accepted by Superintendent' },
        { key: 'Collecting_Feedback', text: 'Collecting Feedback' },
        { key: 'Completed', text: 'Completed' },
        { key: 'Invalid', text: 'Department Invalid' },
        { key: 'New', text: 'New' },
        { key: 'Other', text: 'Other' },
        { key: 'Submitted', text: 'Pending Approver Approval' },
        { key: 'Pending_Employee_Approval', text: 'Pending Employee Approval' },
        { key: 'Approver1_Rejected', text: 'Rejected by Approver' },
        { key: 'Department_Rejected', text: 'Rejected by the Department' },
        { key: 'Employee_Rejected', text: 'Rejected by Employee' },
        { key: 'Superintendent_Rejected', text: 'Rejected by Superintendent' },
    ];

    const onRenderOption = (item: IComboBoxOption) => {
        switch (item.key) {
            case 'New':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/new.svg`)} /><span>{item.text}</span></div>;
            case 'Completed':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/completed.svg`)} /><span>{item.text}</span></div>;
            case 'Department_Accepted':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/deptAccepted.svg`)} /><span>{item.text}</span></div>;
            case 'Department_Rejected':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/deptRejected.svg`)} /><span>{item.text}</span></div>;
            case 'Approver1_Accepted':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/personAccepted.svg`)} /><span>{item.text}</span></div>;
            case 'Approver1_Rejected':
            case 'Employee_Rejected':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/personRejected.svg`)} /><span>{item.text}</span></div>;
            case 'Submitted':
            case 'Pending_Employee_Approval':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/submitted.svg`)} /><span>{item.text}</span></div>;
            case 'Superintendent_Accepted':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/superAccepted.svg`)} /><span>{item.text}</span></div>;
            case 'Superintendent_Rejected':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/superRejected.svg`)} /><span>{item.text}</span></div>;
            case 'Collecting_Feedback':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/collectingFeedback.svg`)} /><span>{item.text}</span></div>;
            case 'Invalid':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/invalid.svg`)} /><span>{item.text}</span></div>;
            case 'Other':
                return <div className={styles.formStatusCol}><img width="20" src={require(`../../formIcons/other.svg`)} /><span>{item.text}</span></div>;
        }
    };

    
    return(
        <div className={styles.filterForm}>            
            <ActionButton 
                className={styles.resetSrchBtn}
                text="Reset" 
                onClick={props.resetSrch} 
                iconProps={{ iconName: 'ClearFilter' }}
                allowDisabledFocus 
                disabled = {isObjectEmpty(props.filterField)}
            />
            <div>
                <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                    <Stack {...columnProps}>                        
                        {/* <SearchBox 
                            placeholder="Form Title" 
                            underlined
                            value={props.filterField.title}
                            onChange={props.onChangeFilterField("title")}
                            iconProps={{ iconName: 'Rename' }}
                        /> */}
                        <div className={styles.comboCntnr}>
                            <Icon className={styles.comboIcon} iconName="Rename" />
                            <ComboBox
                                className={styles.comboStyle}
                                placeholder="Form Title"
                                options={props.formTitlesOptions} 
                                onChange={props.onChangeFilterField("title")}
                                selectedKey={props.filterField.title.key}                            
                            />
                        </div>
                        <div className={styles.comboCntnr}>
                            <Icon className={styles.comboIcon} iconName="Location" />
                            <ComboBox
                                className={styles.comboStyle}
                                placeholder="All locations for my area"
                                options={props.formLocationNosOptions} 
                                onChange={props.onChangeFilterField("locationNo")}
                                selectedKey={props.filterField.locationNo.key}                            
                            />
                        </div>
                        <div className={styles.comboCntnr}>
                            <Icon className={styles.comboIcon} iconName="StackedLineChart" />
                            <ComboBox
                                className={styles.comboStyle}
                                placeholder="Status"
                                options={options} 
                                onRenderOption={onRenderOption}
                                onChange={props.onChangeFilterField("formStatus")}
                                selectedKey={props.filterField.formStatus.key}                            
                            />
                        </div>
                        
                    </Stack>
                    <Stack {...columnProps}>
                        {/* <SearchBox 
                            placeholder="Status"
                            underlined 
                            value={props.filterField.formStatus.text} 
                            onChange={props.onChangeFilterField("formStatus")}
                            iconProps={{iconName: 'StackedLineChart'}}
                        /> */}
                        <SearchBox 
                            placeholder="Name" 
                            value={props.filterField.fullName}
                            onChange={props.onChangeFilterField("fullName")}
                            iconProps={{ iconName: 'Contact' }}
                            showIcon={true}
                            underlined
                            className={styles.srchBox}
                        />
                        <SearchBox 
                            placeholder="Details" 
                            value={props.filterField.formDetails}
                            onChange={props.onChangeFilterField("formDetails")}
                            iconProps={{ iconName: 'GlobalNavButton' }}
                            showIcon={true}
                            underlined
                            className={styles.srchBox}
                        />
                    </Stack>
                </Stack>
            </div>
        </div>
    );
}