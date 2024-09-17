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

    interface FileNode extends qx.data.Array{
         getLabel(): string;
         getFullPath(): string;
         getLoaded(): boolean;
         getIcon() : string;
         getDirectory(): string;
         getChildren(): FileNode; 
    }

    /**
     * File navigator for CATS that displays a directories and its subdirectories
     * and files as a tree.
     */
    export class FileNavigator extends qx.ui.tree.VirtualTree {

        private rootTop = {
            label: "qx-cats",
            fullPath: "",
            directory: true,
            children: [{
                label: "Loading",
                icon: "loading",
                directory: false
            }],
            loaded: false
        };

        private directoryModels = {};
        private watcher: OS.File.Watcher;
        private parents:Map<FileNode> = {};
        private projectDir: string;


        constructor() {
            super(null, "label", "children");
            this.setDecorator(null);
            this.setPadding(0, 0, 0, 0);
            this.setBackgroundColor("transparent");
            var contextMenu = new FileContextMenu(this);
            this.setContextMenu(contextMenu);
            this.setupDragAndDrop();
        }

        /**
         * Enable drag and drop on the FileNavigator
         * @TODO finalized implementation
         */ 
        private setupDragAndDrop2() {
             this.setDraggable(true);
             this.setDroppable(true);

             // @TODO Issue because <cntrl> is also right click.            
             // this.setSelectionMode("multi");

             this.addListener("dragstart", (e:qx.event.type.Drag) => { 
                IDE.console.log("drag started. Not yet implemented!!!"); 
                e.addAction("move"); 
                e.addType("tree-items"); 
                e.addData("tree-items", this.getSelection());
            }, this); 
            
            this.addListener("drop", (e:qx.event.type.Event) => { 
                IDE.console.log("Target path:" + e.getRelatedTarget());
     
                for(var i = 0; i < this.getSelection().getLength(); i++) { 
                  IDE.console.log("To be moved:" + this.getSelection().getItem(i));
                }   
    
            }, this);
        }


        private setupDragAndDrop() {
 
             this.setDraggable(true);
             this.setDroppable(true);
       
            this.addListener("dragstart", (e) => {
                e.addAction("move");
                e.addType("tree-items"); 
                e.addData("tree-items", this.getSelection());
            });
            
            this.addListener("drop", (e) =>
            {
              // Using the selection sorted by the original index in the list
              var sel = e.getData("tree-items");
            
              console.log("Drag and Drop");
              console.log(e);
            
              // This is the original target hovered
              var orig = e.getOriginalTarget();
              console.log(orig);
    
              for (var i=0, l=sel.length; i<l; i++)
              {
                // Insert before the marker
                console.log(sel[i]);
                // Recover selection as it gets lost during child move
                // this.addToSelection(sel[i]);
              }
            });
        }


        setRootDir(dir: string) {
            this.projectDir = dir;

            this.watcher = OS.File.getWatcher();
            this.watcher.on("change", (dir:string) => {
                var parent = this.parents[dir];
                if (parent) this.readDir(parent);
            });

            var directory = dir;
            this.rootTop.fullPath = directory;
            this.rootTop.label = OS.File.PATH.basename(directory);
            var root = qx.data.marshal.Json.createModel(this.rootTop, true);
            this.setModel(root);

            this.setupDelegate();

            this.setup();

            console.info("Icon path:" + this.getIconPath());
            this.addListener("dblclick", () => {
                var file = this.getSelectedFile();
                if (file) {
                    FileEditor.OpenEditor(file.getFullPath());
                }
            });


            // Force a relaod after a close
            /*
            this.addListener("close", (event) => {
                var data = event.getData();
                data.setLoaded(false);
            });
            */
        }

        clear() {
            this.setModel(null);
        }


        private getSelectedFile() {
            var item = this.getSelection().getItem(0);
            if (!item) return null;
            if (!item.getDirectory) return null;
            if (!item.getDirectory()) {
                return item;
            }
            return null;
        }

      

        /**
         * Get an icon for a file based on its mimetype
         */
        private getIconForMimeType(mimetype: string) {
            var icon = IDE.icons.mimetype[mimetype] || IDE.icons.mimetype["text/plain"];
            return icon;
        }


        private setup() {
            this.setIconPath("");
            this.setIconOptions({
                converter: (value:FileNode, model:any) => {
                    if (value.getDirectory()) {
                        return this.getIconForMimeType("inode/directory");
                    }
                    var mimetype: string = Util.MimeTypeFinder.lookup(value.getLabel());
                    return this.getIconForMimeType(mimetype);
                }
            });

        }

        private setupDelegate() {
            var self = this;
            var delegate = {
                bindItem: function(controller:qx.ui.tree.core.MWidgetController, item:qx.ui.core.Widget, index:number) {
                    controller.bindDefaultProperties(item, index);

                    controller.bindProperty("", "open", {
                        converter: function(value:any, model:any, source:qx.ui.tree.core.AbstractItem, target:qx.ui.tree.core.AbstractItem) {
                            var isOpen = target.isOpen();
                            if (isOpen && !value.getLoaded()) {
                                value.setLoaded(true);

                                setTimeout(function() {
                                    value.getChildren().removeAll();
                                    self.readDir(value);
                                }, 0);

                            }
                            return isOpen;
                        }
                    }, item, index);
                }
            };
            this.setDelegate(delegate);
        }


        /**
         * Read the files from a directory
         * @param directory The directory name that should be read
         */
        private readDir(parent:FileNode) {
            var directory = parent.getFullPath();
            this.watcher.addDir(directory);
            this.parents[directory] = parent;
            parent.getChildren().removeAll();
            var entries: Cats.FileEntry[] = [];
            try {
                entries = OS.File.readDir(directory, true);
            } catch (err) {/* the directory has been delete */}
            entries.forEach((entry: Cats.FileEntry) => {
                var node = {
                    label: entry.name,
                    fullPath: entry.fullName,
                    loaded: !entry.isDirectory,
                    directory: entry.isDirectory,
                    children: entry.isDirectory ? [{
                        label: "Loading",
                        icon: "loading",
                        directory: false
                    }] : null
                };
                parent.getChildren().push(<FileNode>qx.data.marshal.Json.createModel(node, true));
            });
        }

    }

}