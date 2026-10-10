'use strict';
const year=document.getElementById('year');
if(year) year.textContent=String(new Date().getFullYear());
const toolNotes=Object.freeze({
 python:{name:'Python',use:'API integrations, data processing, reporting, and automation.',where:'Repository and pipeline inventory, security metrics, and repeatable AppSec workflows.'},
 graphql:{name:'GraphQL',use:'My main API query language.',where:'Gathering repository, pipeline, scanner, and finding data for AppSec reporting.'},
 gitlab:{name:'GitLab',use:'Scanner setup, pipeline data, and security API workflows.',where:'Supporting the Snyk-to-GitLab change, security reporting, and developer-facing processes.'},
 snyk:{name:'Snyk',use:'API access to vulnerability and dependency data.',where:'AppSec reporting and analysis, including support for the Snyk-to-GitLab migration.'},
 postgresql:{name:'PostgreSQL',use:'Storing exception records and tracking due dates.',where:'The database behind my Python jobs for scheduled exception follow-up.'},
 elastic:{name:'Elastic Stack',use:'Familiarity with Elastic Stack (ELK).',where:'Part of the broader set of security tools I know.'},
 googlecloud:{name:'Google Cloud',use:'Writing SQL in BigQuery.',where:'My Google Cloud experience includes querying data with BigQuery.'},
 putty:{name:'PuTTY',use:'Familiarity with a remote-access tool.',where:'Part of my broader systems and security toolkit.'},
 postman:{name:'Postman',use:'Familiarity with an API tool.',where:'Part of my API toolkit alongside GraphQL and REST.'}
});
const buttons=[...document.querySelectorAll('[data-tool]')];
const toolName=document.getElementById('tool-name');
const toolUse=document.getElementById('tool-use');
const toolDescription=document.getElementById('tool-description');
function selectTool(button){
 const note=toolNotes[button.dataset.tool];
 if(!note||!toolName||!toolUse||!toolDescription)return;
 buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 toolName.textContent=note.name;
 toolUse.textContent=note.use;
 toolDescription.textContent=note.where;
}
buttons.forEach(button=>{button.addEventListener('click',()=>selectTool(button));button.disabled=false;});
document.querySelectorAll('[data-tool-link]').forEach(link=>{
 link.addEventListener('click',()=>{
  const button=buttons.find(item=>item.dataset.tool===link.dataset.toolLink);
  if(button)selectTool(button);
 });
});



const d20Button=document.getElementById('d20-roll');
const d20Number=document.getElementById('d20-number');
const d20Result=document.getElementById('d20-result');
const d20Connect=document.getElementById('d20-connect');
if(d20Button&&d20Number&&d20Result&&d20Connect){
 let rollTimer;
 let numberTimer;
 let clickCount=0;
 d20Button.addEventListener('click',()=>{
  if(d20Button.classList.contains('is-rolling'))return;
  clearTimeout(rollTimer);
  clearInterval(numberTimer);
  const rollResult=1+Math.floor(Math.random()*20);
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile=window.matchMedia('(max-width: 620px)').matches;
  const duration=reducedMotion?360:mobile?620:1020;
  const tick=mobile?100:58;
  d20Button.classList.add('is-rolling');
  d20Button.setAttribute('aria-busy','true');
  clickCount=(clickCount+1)%4;
  d20Result.textContent='Rolling...';
  d20Connect.hidden=true;
  if(!reducedMotion){
   numberTimer=setInterval(()=>{d20Number.textContent=String(1+Math.floor(Math.random()*20));},tick);
  }
  rollTimer=setTimeout(()=>{
   clearInterval(numberTimer);
   d20Number.textContent=String(rollResult);
   d20Button.classList.remove('is-rolling');
   d20Button.setAttribute('aria-busy','false');
   if(clickCount===3){
    d20Result.textContent=`Rolled ${rollResult}. Secret door found.`;
   }else if(rollResult===20){
    d20Result.textContent='Natural 20. Nice.';
   }else if(rollResult===1){
    d20Result.textContent='Natural 1. Happens.';
   }else{
    d20Result.textContent=`Rolled ${rollResult}.`;
   }
   d20Connect.hidden=clickCount!==3;
  },duration);
 });
 d20Button.disabled=false;
}
