import * as md5 from 'md5';
import * as http from 'http';
import * as queryString from 'querystring';
export function login(username:string,password:string,hostname:string){
    return new Promise((resolve,reject)=>{
        let passwordMD5 = md5(password + "syzoj2_xxx");
        let content = queryString.encode({
            username,
            password:passwordMD5,
        });
        let req = http.request({
            method:'POST',
            hostname,
            port:80,
            path:'/api/login',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Length':content.length,
            }
        },(res)=>{
            res.on("data",(chuck)=>{
                if(res.statusCode!=200){
                    reject(new Error(res.statusMessage));
                }else{
                    let statusObj = JSON.parse(chuck.toString());
                    switch(statusObj.error_code){
                        case 1:
                            resolve(res.headers["set-cookie"]);
                            break;
                        case 1001:
                            reject(new Error('User not exist.'));
                            break;
                        case 1002:
                            reject(new Error('Wrong password.'));
                            break;
                        case 1003:
                            reject(new Error('Password not set. Please reset password.'));
                            break;
                        default:
                            reject(new Error('Unexpected Error.'));
                            break;
                    }
                }
            });
        });
        req.write(content,(err)=>{
            if(err)reject(err);
        });
        req.on("error",(err)=>{
            reject(err);
        });
    })
}