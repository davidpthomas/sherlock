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
    
    
     qx.Theme.define("cats.theme.Font16",
        {
            extend: qx.theme.simple.Font,

            fonts:
            {
                "default" : {
                    size : 16,    
                    family : ["Source Sans Pro", "arial", "sans-serif"]
                }
            }
        });
    
    

    qx.Theme.define("cats.theme.Font",
        {
            extend: qx.theme.simple.Font,

            fonts:
            {
                "default" : {
                    size : 13, 
                    family : ["arial", "sans-serif"]
                    // family : ["Source Sans Pro", "arial", "sans-serif"]
                }
            }
        });

}