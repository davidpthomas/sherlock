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

module Cats.TSWorker {

    /**
     * The language service host serves as the interface between the TypeScript language
     * services and the files editted within CATS.
     * 
     */ 
    export class LanguageServiceHost implements ts.LanguageServiceHost {

        private compilationSettings:ts.CompilerOptions = null;
        private scripts:Map<Script> = {};

        constructor() {
            this.setCompilationSettings();
        }

        getScriptFileNames():string[] {
            return Object.keys(this.scripts);
        }

        
        getScripts() {
            var result:Array<Script> = []
            this.getScriptFileNames().forEach((fileName)=> {
                var script = this.getScript(fileName);
                result.push(script);
            });
            return result;
        }
        
        
        getNewLine() {
            return "\n";
        }

        
        getCurrentDirectory(): string {
            return "";
        }
        
        getDefaultLibFileName(options: ts.CompilerOptions) : string {
            return "";
        }
        
        getScriptSnapshot(fileName: string): ts.IScriptSnapshot {
             var script = this.scripts[fileName];
             if (script) return script.getScriptSnapshot();
        }

       public log(s: string): void {
       }
       
       public trace(s: string): void {
       }
       
       public error(s: string): void {
       }
       
        public getCompilationSettings(): ts.CompilerOptions {
            return this.compilationSettings; 
        }

        public getScriptVersion(fileName: string): string {
            var script = this.scripts[fileName];            
            return script.getVersion();
        }

        //////////////////////////////////////////////////////////////////////
        // local implementation
 
         getScript(fileName:string) {
            return this.scripts[fileName];
        }
        
        public addScript(fileName: string, content: string, ls:ts.LanguageService) {
            var script = new Script(fileName, content, ls);
            this.scripts[fileName] = script;
            return script;
        }



        /**
         * Set the various compiler settings. For options not provided default values will be used
         * 
         * @param compilerOptions The options you want to set. 
         */ 
        public setCompilationSettings(compilerOptions: ts.CompilerOptions={}) {
             var options = ts.getDefaultCompilerOptions();
 
            // Do a quick mixin
            for (var i in compilerOptions) {
                options[i] = compilerOptions[i];
            }
            
            // Set values to avoid the compiler trying to load/resolve files
            options.emitBOM = false;
            options.noLib = true;
            options.noResolve = true;
            this.compilationSettings = options;
        }


    }

}
