//
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
     * The BusyWindow indicates to the user that there is processing going
     * on that first has to finish before the rest of the UI is available again.
     * 
     * Since most activities are done in the backgorund, this should not be used often.
     */
    export class BusyWindow extends qx.ui.window.Window {

        constructor(name:string) {
            super(name);
            this.setLayout(new qx.ui.layout.Basic());
            this.setMinWidth(300);
            this.setMinHeight(150);
            this.add(new qx.ui.basic.Label("Please wait one moment ...."));

            this.setModal(true);
            this.addListener("resize", this.center);
            this.addListenerOnce("appear", () => {
                setTimeout(() => {
                    this.fireDataEvent("ready", {});
                }, 100);

            });
        }


    }

}