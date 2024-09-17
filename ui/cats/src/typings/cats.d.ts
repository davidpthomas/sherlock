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


declare module cats {
    var theme: any;
}

declare module Cats {

    interface JSONRPCRequest {
        id?: number;
        method:string;
        params?:any;
    }

    interface Map<T>  {
        [index:string]:T;
    }

    interface CompletionEntry {
        value?: string
        meta: string;
        caption?: string;
        name?: string;
        snippet?: string;
    }

    interface FileEntry {
        name: string; // Just the file/directory name without path
        fullName: string; // fullName including path
        isFile: boolean; // is this a folder or a file
        isDirectory: boolean; // is this a folder or a file
    }

 
    interface EditorConfig {
            rightMargin?: number;
            // fontSize?: number;
            completionMode?:string;
            // IndentSize: number;
            // TabSize: number;
            // NewLineCharacter: string;
            // ConvertTabsToSpaces: boolean;
    }
 
 
    /**
     * Interface for the possible IDE specific settings
     */
    interface IDEConfiguration {
        version: string;
        theme: string;
        fontSize: number;
        editor?: EditorConfig;
        rememberOpenFiles?: boolean;
        locale?:string;
        projects: string[];
        sessions: {
            state: string;
            type: string;
        }[];
    }


    interface RunExternal {
        command: string;
        useOwnConsole?: boolean;
        options?: {
            env?: string;
            cwd?: string;
        }
    }

    /**
     * Used for storing project specific settings
     */
    interface ProjectConfiguration {
        version: string;
        name?: string;
        main?: string;
        src?: string;
        destPath?: string;
        buildOnSave?: boolean;
        customBuild?:RunExternal;
        customRun?:RunExternal;
        compiler: any;
        codeFormat: ts.FormatCodeOptions;
        tslint : {
            useLint?: boolean; // false by default
            lintFile?: string; // <cats>/static/jslint.json by default 
        }
        documentation: {
            theme?:string;
            readme?:string;
            outputDirectory?:string;
            includeDeclarations?:boolean;
        }
       
    }


    interface Theme {
        background: string;
        ace : string;
        name: string;
        color: string;
    }

    interface Position {
        row: number;
        column: number;
    }

    interface TypeInfo  {
        description?: string;
        docComment?: string;
    }

    interface CompileResults {
        outputFiles: ts.OutputFile[];
        errors: FileRange[];
    }

    interface NavigateToItem  {
        range: Range;
        name: string;
        kind: string;
        fileName: string;
    }
    
     

}
