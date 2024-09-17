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
module Cats.Theme {

    // Fix for the fact that workign directory is not the same directory as the HMTL file
    qx.theme.icon.Oxygen.aliases.icon = "resource/" +  qx.theme.icon.Oxygen.aliases.icon;
    qx.theme.icon.Tango.aliases.icon =  qx.theme.icon.Oxygen.aliases.icon;

    qx.Theme.define("cats.theme.Default",
        {
            meta:
            {
                color: cats.theme.ColorDark,
                decoration: cats.theme.Decoration,
                // decoration: qx.theme.simple.Decoration,
                font: cats.theme.Font,
                icon: qx.theme.icon.Oxygen,
                // appearance: cats.theme.Appearance
                appearance: qx.theme.simple.Appearance
            }
        });

  

}
