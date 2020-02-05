import { searchProblem, submitCode } from "./lib/submit";
(async ()=>{
  console.log(await submitCode('47.93.246.11','/problem/1','cpp-noilinux','this is a test from vscode',[
    "login=%5B%22%E6%9D%8E%E6%98%9F%E7%83%A8%22%2C%22779515f8963e04584fa7ce8e4142b717%22%5D; Path=/",
    "connect.sid=s%3AlFHtzcL0OltWmYq0p_nEO2ZXtXZEjd8r.YPQfO53Ga8PA6AGe2SkNRpGGCGd9eJbN8RxgyPFXRac; Path=/"
  ]));
})()
