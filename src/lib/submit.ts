import * as FormData from 'form-data';
import * as http from 'http';
import { parseCompilers, LanguageDefinition } from './xml_parsers';
export interface SearchResult{
    name:string;
    value:number;
    url:string;
}
export function getCompilers(host:string,probPath:string):Promise<LanguageDefinition[]>{
    return new Promise((resolve,reject)=>{
        http.get({
            hostname:host,
            path:probPath,
        },(res)=>{
            let xmlStr = '';
            res.on('data',(chunk)=>{
                xmlStr+=chunk.toString();
            });
            res.on('end',()=>{
                resolve(parseCompilers(xmlStr.toString()));
            })
            res.on('error',(err)=>{
                reject(err);
            })
        });
    });
}
export function searchProblem(host:string,query:string):Promise<SearchResult[]>{
    return new Promise((resolve,reject)=>{
        http.get({
            hostname:host,
            path:`/api/v2/search/problems/${query}`,
        },(res)=>{
            let payload = '';
            let resObj:{success:boolean,results:SearchResult[]};
            res.on('data',(chunk)=>{
                payload+=chunk.toString();
            });
            res.on('end',()=>{
                resObj = JSON.parse(payload);
                resolve(resObj.results);
            });
        });
    });
}
export function submitCode(hostname:string,probPath:string,language:string,code:string,cookie:string[]):Promise<string>{
    return new Promise((resolve,reject)=>{
        let formData = new FormData();
        formData.append('language',language);
        formData.append('code',code);
        formData.append('answer','',{
            contentType:'application/octet-stream',
            filename:'',
        });
        formData.submit({
            hostname,
            path:`${probPath}/submit`,
            headers:{
                Cookie:cookie,
            }
        },(err,res)=>{
            if(err)reject(err);
            else{
                if(res.statusCode!>=400)reject(new Error(res.statusMessage));
                else if(res.statusCode == 200)reject(new Error('Not Logged In.'));
                else{
                    resolve(res.headers.location);
                }
            }
        });
    });
}
