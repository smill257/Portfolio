'use strict';
const year=document.getElementById('year');
if(year) year.textContent=String(new Date().getFullYear());
const toolNotes=Object.freeze({
 python:{name:'Python',use:'API integrations, data processing, reporting, and automation.',where:'Repository and pipeline inventory, security metrics, and repeatable AppSec workflows.'},
 graphql:{name:'GraphQL',use:'My main API query language.',where:'Gathering repository, pipeline, scanner, and finding data for AppSec reporting.'},
 gitlab:{name:'GitLab',use:'Scanner setup, pipeline data, and security API workflows.',where:'Supporting the Snyk-to-GitLab change, security reporting, and developer-facing processes.'},
 snyk:{name:'Snyk',use:'API access to vulnerability and dependency data.',where:'Reporting and analysis during the security tooling change.'},
 postgresql:{name:'PostgreSQL',use:'Structured exception and due-date tracking.',where:'A database behind scheduled follow-up for security exceptions.'},
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
  clearTimeout(rollTimer);
  clearInterval(numberTimer);
  d20Button.classList.remove('is-rolling');
  void d20Button.offsetWidth;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration=reducedMotion?660:1020;
  const tick=reducedMotion?130:58;
  d20Button.classList.add('is-rolling');
  clickCount=(clickCount+1)%3;
  d20Result.textContent=clickCount===0?'Secret door found.':'Always a nat 20 with my work.';
  d20Connect.hidden=clickCount!==0;
  numberTimer=setInterval(()=>{d20Number.textContent=String(1+Math.floor(Math.random()*20));},tick);
  rollTimer=setTimeout(()=>{
   clearInterval(numberTimer);
   d20Number.textContent='20';
   d20Button.classList.remove('is-rolling');
  },duration);
 });
 d20Button.disabled=false;
}
