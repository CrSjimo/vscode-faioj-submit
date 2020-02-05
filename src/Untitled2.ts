import { searchProblem, submitCode, getContests } from "./lib/submit";
import { parseContestPagesAmount, parseContestList } from "./lib/xml_parsers";
(async ()=>{
  console.log(await getContests('47.93.246.11',[]));
})()
