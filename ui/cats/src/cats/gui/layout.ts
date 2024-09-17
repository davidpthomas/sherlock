// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

module Cats.Gui {
    
    /**
     * This class takes care of the layout of the IDE.
     */
    export class Layout {

        constructor(private rootDoc: qx.ui.container.Composite) {
        }

        /**
         * Layout the various parts of de IDE
         */
        layout(ide: Cats.Ide) {
            // container layout

            var layout = new qx.ui.layout.VBox();

            // main container
            var mainContainer = new qx.ui.container.Composite(layout);
            mainContainer.setBackgroundColor("transparent");
            this.rootDoc.add(mainContainer, { edge: 0 });

            ide.toolBar = new ToolBar();

            mainContainer.add(ide.toolBar, { flex: 0 });

            // mainsplit, contains the editor splitpane and the info splitpane
            var mainsplit = new qx.ui.splitpane.Pane("horizontal");
            // mainsplit.set({ decorator: null });


            // ********************* Navigator Pane ********************
            var navigatorPane = new TabView();
            ide.bookmarks = new ResultTable(["tableheader_bookmark"]);
            ide.fileNavigator = new FileNavigator();
            var fileTab = navigatorPane.addPage("files_tab", ide.fileNavigator);
            navigatorPane.addPage("bookmarks_tab", ide.bookmarks);
            navigatorPane.setSelection([fileTab]);

            mainsplit.add(navigatorPane, 1); // navigator

            var editorSplit = new qx.ui.splitpane.Pane("vertical");
            // editorSplit.setDecorator(null);

            var infoSplit = new qx.ui.splitpane.Pane("horizontal");
            ide.editorTabView = new EditorTabView();
            // infoSplit.set({ decorator: null });
            infoSplit.add(ide.editorTabView, 4); // editor

            ide.contextPane = new TabView();
            ide.outlineNavigator = new OutlineNavigator();
            ide.propertyTable = new PropertyTable();
            var outlineTab = ide.contextPane.addPage("outline_tab",ide.outlineNavigator);
            ide.contextPane.addPage("properties_tab",ide.propertyTable);
            ide.contextPane.setSelection([outlineTab]);
            
            
            infoSplit.add(ide.contextPane, 1);

            editorSplit.add(infoSplit, 4);

            // **********************  Problem Pane ***************************
            ide.resultPane = new TabView();
            editorSplit.add(ide.resultPane, 2); // Info

            ide.console = new ConsoleLog();
            ide.problemResult = new ResultTable();
            ide.todoList = new ResultTable();
            ide.processTable = new ProcessTable();
            var problemPage = ide.resultPane.addPage("problems_tab", ide.problemResult);
            problemPage.autoSelect = true;
            
            var consolePage = ide.resultPane.addPage("console_tab", ide.console);
            consolePage.autoSelect = true;
            ide.resultPane.addPage("process_tab",  ide.processTable);
            ide.resultPane.addPage("todo_tab",  ide.todoList);
            ide.resultPane.setSelection([consolePage]);
 
            mainsplit.add(editorSplit, 4); // main area

            mainContainer.add(mainsplit, { flex: 1 });

            // ************************ Status Bar *****************************
            ide.statusBar = new StatusBar();
            mainContainer.add(ide.statusBar, { flex: 0 });
        }

    }
}