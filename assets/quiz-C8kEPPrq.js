import{u as S,j as e,B as C,Q as a}from"./index-DtKb0JG4.js";import{u as v}from"./useRedirect-De2SJ48s.js";function T({index:s,total:t,question:n,options:o,onChange:r,onPrev:l,onNext:x,goToFirst:b,goToLast:f,isLast:u}){const{quizState:{questions:p,submitted:h}}=S(),d=s+1,c=s<=0,j=p[s].answer,m=p[s].selectedAnswer,y={correct:"correct",wrong:"wrong"};function w(i){const g=i===j?y.correct:i===m?y.wrong:"";return h?g:""}return e.jsxs("div",{children:[e.jsxs("div",{children:["Domanda ",d," di ",t]}),e.jsxs("fieldset",{children:[e.jsx("legend",{children:n}),o.map((i,g)=>e.jsx("div",{children:e.jsxs("label",{className:w(i),children:[e.jsx("input",{type:"radio",name:`question_${s.toString()}`,value:i,onChange:r,defaultChecked:i===m,disabled:h},g),i]})},g))]}),e.jsxs("div",{children:[e.jsx(C,{to:"/dashboard",children:"Vai al riepilogo"}),e.jsx("button",{type:"button",id:"goToFirstButton",disabled:c,onClick:b,children:"<<"}),e.jsx("button",{type:"button",id:"prevButton",disabled:c,onClick:l,children:"<"}),e.jsx("button",{type:"submit",id:"nextButton",disabled:u,onClick:()=>{x()},children:">"}),e.jsx("button",{type:"button",id:"goToLastButton",disabled:u,onClick:f,children:">>"})]})]})}function N(){const{quizState:{filePath:s,questions:t,step:n=0},dispatch:o}=S(),r=v({destination:"/",condition:!s});r&&r();const l=!!(t!=null&&t.length)&&n===t.length-1;function x(){n>0&&o({type:a.setStep,payload:n-1})}function b(){l||o({type:a.setStep,payload:n+1})}function f(d){if(t!=null&&t.length){const c={...t[n],selectedAnswer:d},j=t.toSpliced(n,1,c);o({type:a.setQuestions,payload:j})}}const u=d=>{const c=d.target.value;f(c)};function p(){o({type:a.setStep,payload:t.length-1})}function h(){o({type:a.setStep,payload:0})}return e.jsx("div",{children:(t==null?void 0:t.length)&&e.jsx(T,{index:t[n].index,total:t.length,question:t[n].question,options:t[n].options,onChange:u,onPrev:x,onNext:b,goToFirst:h,goToLast:p,isLast:l},t[n].index)})}const A=N;export{A as component};
