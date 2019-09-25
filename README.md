# ReactNativePlanner

**Architecture**

* src -> root files go here
    * actions -> where the actiontypes and creators are for redux
        *  user -> user authentication and profile updating actions
        *  todoManagement 
            *   taskLists -> task list related actions
            *   tasks  -> task related actions
    * components -> where all shareable components go
        * utils -> functions that can be used anywhere
    * navigation -> navigation files
    * reducers
        *  user -> user authentication and profile updating reducer
        *  todoManagement 
            *   taskLists -> task list related reducer
            *   tasks  -> task related reducer
    * screens -> where individual pages for the app are (they use the components)
    * services -> api services such as firebase
    * store -> the redux store

