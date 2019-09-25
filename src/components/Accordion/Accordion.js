import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import InputDialog from '../InputDialog';
import styles from './accStyles'
import TaskItem from '../TaskItem/TaskItem';

const initState = {
    isExpanded: false,
    isCompletedExpanded: false,
    isUncompletedExpanded: false,
    isEditListTitleDialogVisible: false,
    title: ''
}
export default class Accordion extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...initState,
            isExpanded: this.props.expanded,
            title: this.props.title
        }
    }

    showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            ...this.getActionSheetOptions()
        );
    }

    getActionSheetOptions = () => {
        const { onListDelete, onListItemsDelete } = this.props;
        switch (this.props.options) {
            case 'deleteItemsOnly':
                return [
                    {
                        options: ['Delete All List Items', 'Cancel'],
                        destructiveButtonIndex: 0,
                        cancelButtonIndex: 1,
                    },
                    (buttonIndex) => {
                        if (buttonIndex === 0) {
                            onListItemsDelete();
                        }
                    }
                ];
            case 'all':
                return [
                    {
                        options: ['Edit List Title', 'Delete List', 'Delete All List Items', 'Cancel'],
                        destructiveButtonIndex: [1, 2],
                        cancelButtonIndex: 3,
                    },
                    (buttonIndex) => {
                        if (buttonIndex === 0) {
                            this.setState({ isEditListTitleDialogVisible: true });
                        } else if (buttonIndex === 1) {
                            onListDelete();
                        } else if (buttonIndex === 2) {
                            onListItemsDelete();
                        }
                    }
                ];
        }
    }

    renderEditTitleDialog = () => {
        if (this.props.options != 'none') {
            return <InputDialog
                title='Edit List Title'
                inputs={{ title: this.state.title }}
                isVisible={this.state.isEditListTitleDialogVisible}
                onSaveFunc={() => {
                    this.props.onTitleEdit(this.props.listId, { title: this.state.title });
                    this.setState({ isEditListTitleDialogVisible: false });
                }}
                onChangeFunc={(field, newInput) => {
                    this.setState({ title: newInput })
                }}
                onCancelFunc={() => {
                    this.setState({ title: this.props.title, isEditListTitleDialogVisible: false });
                }}
            />
        }
    }

    renderIconButtons = (isSubList, isExpanded) => {
        const iconOnly = this.props.options == 'none' || isSubList;
        return <View
            style={!iconOnly && styles.buttonContainer}
        >
            <Icon
                name={isExpanded ? "ios-arrow-up" : "ios-arrow-down"}
                size={25}
                color='#43484d'
                style={iconOnly && { alignSelf: 'flex-end' }}
            />
            {!iconOnly && !isSubList ?
                <Button
                    type="clear"
                    icon={<Icon
                        name="md-more"
                        size={25}
                        color='#007aff'
                    />}
                    onPress={() => {
                        this.showActionSheet();
                    }}
                />
                : null}
        </View>
    }

    renderListItems = (items) => {
        const { navigation, noItemsText } = this.props;
        return (
            !items.length ? <Text style={styles.noItemsText}>{noItemsText}</Text> :
                items.map((item, key) => {
                    return <TaskItem task={item} key={key} navigation={navigation} />
                })
        );
    }

    renderNonSubListAccordion = () => {
        const { isExpanded } = this.state;
        return (
            <>
                <TouchableOpacity
                    style={!isExpanded ? styles.accordionContainer : [styles.accordionContainer, styles.expandedColor]}
                    onPress={() => { this.setState({ isExpanded: !isExpanded }) }}
                >
                    <Text style={styles.label}>{this.props.title}</Text>
                    {this.renderIconButtons(false, this.state.isExpanded)}
                </TouchableOpacity>
                {isExpanded ? this.renderListItems(this.props.items) : null}
            </>
        )
    }

    renderSubLists = () => {
        const uncompletedItems = this.props.items.filter(task => !task.isCompleted);
        const completedItems = this.props.items.filter(task => task.isCompleted);
        const { isCompletedExpanded, isUncompletedExpanded } = this.state;
        return (
            <>
                {/* render uncompleted tasks sublist */}
                <TouchableOpacity
                    style={!isUncompletedExpanded ? [styles.accordionContainer, styles.subListNotExpanded] : [styles.accordionContainer, styles.subListExpanded]}
                    onPress={() => { this.setState({ isUncompletedExpanded: !isUncompletedExpanded }) }}
                >
                    <Text style={styles.label}>Uncompleted Tasks</Text>
                    {this.renderIconButtons(true, isUncompletedExpanded)}
                </TouchableOpacity>
                {isUncompletedExpanded ? this.renderListItems(uncompletedItems) : null}

                {/* render completed tasks sublist */}
                <TouchableOpacity
                    style={!isCompletedExpanded ? [styles.accordionContainer, styles.subListNotExpanded] : [styles.accordionContainer, styles.subListExpanded]}
                    onPress={() => { this.setState({ isCompletedExpanded: !isCompletedExpanded }) }}
                >
                    <Text style={styles.label}>Completed Tasks</Text>
                    {this.renderIconButtons(true, isCompletedExpanded)}
                </TouchableOpacity>
                {isCompletedExpanded ? this.renderListItems(completedItems) : null}
            </>
        );
    }

    render() {
        const { title, hasSubList } = this.props;
        const { isExpanded } = this.state;

        return (
            <View>
                {!hasSubList ? this.renderNonSubListAccordion() :
                    <>
                        <TouchableOpacity
                            style={!isExpanded ? styles.accordionContainer : [styles.accordionContainer, styles.expandedColor]}
                            onPress={() => { this.setState({ isExpanded: !isExpanded }) }}
                        >
                            <Text style={styles.label}>{title}</Text>
                            {this.renderIconButtons(false, isExpanded)}
                        </TouchableOpacity>
                        {isExpanded ? this.renderSubLists() : null}
                </>

                }
                <>
                    {this.renderEditTitleDialog()}
                </>
            </View>
        );
    }
}

Accordion.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
    })),
    expanded: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    options: PropTypes.oneOf(['none', 'deleteItemsOnly', 'all']).isRequired,
    onTitleEdit: PropTypes.func,
    onListDelete: PropTypes.func,
    onListItemsDelete: PropTypes.func,
    onCompletedItemsDelete: PropTypes.func,
    onUncompletedItemsDelete: PropTypes.func,
    listId: PropTypes.string,
    noItemsText: PropTypes.string,
    navigation: PropTypes.any.isRequired,
    hasSubList: PropTypes.bool.isRequired
}