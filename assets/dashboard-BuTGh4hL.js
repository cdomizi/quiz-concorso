import{u as b,j as t,f as S,a as C,b as f,Q as p}from"./index-DFXlBRc7.js";function y({index:e,onClick:c}){const{quizState:{questions:r,submitted:s}}=b(),d=S(e),o=r[e].answer,i=r[e].selectedAnswer,a={answered:"answered",correct:"correct",wrong:"wrong"};function l(){return s?i===o?a.correct:a.wrong:i?a.answered:""}return t.jsx("button",{className:`dashboard-question-button ${l()}`,type:"button",onClick:()=>void c(e),children:d.toString()})}function v(){const e=C(),c=f(),{quizState:{title:r,questions:s,submitted:d},dispatch:o}=b();async function i(n){o({type:p.setStep,payload:n}),await c({to:"/quiz"})}function a(){o({type:p.setSubmitted})}async function l(){o({type:p.eraseState}),await e.invalidate(),await c({to:"/"})}const u=(s==null?void 0:s.length)||50,h=(s==null?void 0:s.filter(n=>n.selectedAnswer===n.answer).length)||0,j=u*2,x=h*2,m=x>=70,w=m?"Superato":"Fallito",g=`${h.toString()} / ${u.toString()}`;return t.jsxs("div",{children:[t.jsx("h1",{children:r}),t.jsx("p",{children:"Concorso ordinario 2023 - Scuola secondaria di primo e secondo grado"}),t.jsx("p",{children:"Classe di concorso 2575"}),d&&t.jsxs("div",{children:[t.jsx("hr",{}),t.jsxs("h2",{className:m?"success":"wrong",children:["Test ",w]}),t.jsx("p",{children:t.jsxs("b",{children:["Punteggio: ",x," / ",j]})}),t.jsxs("p",{children:["Risposte esatte: ",g]})]}),t.jsx("button",{type:"button",disabled:d,onClick:()=>{i(0)},children:"Inizia"}),t.jsx("button",{type:"button",onClick:a,children:"Termina"}),t.jsx("button",{type:"button",onClick:()=>{l()},children:"Esci"}),t.jsx("div",{children:s==null?void 0:s.map(n=>t.jsx(y,{index:n.index,onClick:i},n.index))})]})}const z=v;export{z as component};
