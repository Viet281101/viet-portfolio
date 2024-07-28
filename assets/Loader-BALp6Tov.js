import{r as s,c as Pe,R as we,j as S}from"./index-D6a_JbGF.js";import{G as je,V as z,O as se,f as ne,g as Se,aE as V}from"./@monogrid-BrV29GSX.js";import{b as Ee,u as We,c as Re}from"./react-three-fiber.esm-B9EnMvkG.js";import{_ as Ce}from"./Computers-DpsT1IuD.js";import"./hls.js-CqkleIqs.js";const $=new z,B=new z,$e=new z,re=new Se;function Oe(e,t,r){const n=$.setFromMatrixPosition(e.matrixWorld);n.project(t);const i=r.width/2,a=r.height/2;return[n.x*i+i,-(n.y*a)+a]}function Te(e,t){const r=$.setFromMatrixPosition(e.matrixWorld),n=B.setFromMatrixPosition(t.matrixWorld),i=r.sub(n),a=t.getWorldDirection($e);return i.angleTo(a)>Math.PI/2}function Fe(e,t,r,n){const i=$.setFromMatrixPosition(e.matrixWorld),a=i.clone();a.project(t),re.set(a.x,a.y),r.setFromCamera(re,t);const x=r.intersectObjects(n,!0);if(x.length){const P=x[0].distance;return i.distanceTo(r.ray.origin)<P}return!0}function Le(e,t){if(t instanceof se)return t.zoom;if(t instanceof ne){const r=$.setFromMatrixPosition(e.matrixWorld),n=B.setFromMatrixPosition(t.matrixWorld),i=t.fov*Math.PI/180,a=r.distanceTo(n);return 1/(2*Math.tan(i/2)*a)}else return 1}function He(e,t,r){if(t instanceof ne||t instanceof se){const n=$.setFromMatrixPosition(e.matrixWorld),i=B.setFromMatrixPosition(t.matrixWorld),a=n.distanceTo(i),x=(r[1]-r[0])/(t.far-t.near),P=r[1]-x*t.far;return Math.round(x*a+P)}}const I=e=>Math.abs(e)<1e-10?0:e;function oe(e,t,r=""){let n="matrix3d(";for(let i=0;i!==16;i++)n+=I(t[i]*e.elements[i])+(i!==15?",":")");return r+n}const Ve=(e=>t=>oe(t,e))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),ze=(e=>(t,r)=>oe(t,e(r),"translate(-50%,-50%)"))(e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1]);function Ae(e){return e&&typeof e=="object"&&"current"in e}const Ne=s.forwardRef(({children:e,eps:t=.001,style:r,className:n,prepend:i,center:a,fullscreen:x,portal:P,distanceFactor:E,sprite:ie=!1,transform:h=!1,occlude:c,onOcclude:Z,castShadow:ae,receiveShadow:ce,material:le,geometry:G,zIndexRange:O=[16777271,0],calculatePosition:_=Oe,as:ue="div",wrapperClass:A,pointerEvents:q="auto",...v},J)=>{const{gl:K,camera:l,scene:Q,size:d,raycaster:de,events:fe,viewport:me}=Ee(),[u]=s.useState(()=>document.createElement(ue)),N=s.useRef(),m=s.useRef(null),U=s.useRef(0),T=s.useRef([0,0]),W=s.useRef(null),D=s.useRef(null),w=(P==null?void 0:P.current)||fe.connected||K.domElement.parentNode,g=s.useRef(null),F=s.useRef(!1),L=s.useMemo(()=>c&&c!=="blending"||Array.isArray(c)&&c.length&&Ae(c[0]),[c]);s.useLayoutEffect(()=>{const f=K.domElement;c&&c==="blending"?(f.style.zIndex=`${Math.floor(O[0]/2)}`,f.style.position="absolute",f.style.pointerEvents="none"):(f.style.zIndex=null,f.style.position=null,f.style.pointerEvents=null)},[c]),s.useLayoutEffect(()=>{if(m.current){const f=N.current=Pe(u);if(Q.updateMatrixWorld(),h)u.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const o=_(m.current,l,d);u.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${o[0]}px,${o[1]}px,0);transform-origin:0 0;`}return w&&(i?w.prepend(u):w.appendChild(u)),()=>{w&&w.removeChild(u),f.unmount()}}},[w,h]),s.useLayoutEffect(()=>{A&&(u.className=A)},[A]);const X=s.useMemo(()=>h?{position:"absolute",top:0,left:0,width:d.width,height:d.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:a?"translate3d(-50%,-50%,0)":"none",...x&&{top:-d.height/2,left:-d.width/2,width:d.width,height:d.height},...r},[r,a,x,d,h]),he=s.useMemo(()=>({position:"absolute",pointerEvents:q}),[q]);s.useLayoutEffect(()=>{if(F.current=!1,h){var f;(f=N.current)==null||f.render(s.createElement("div",{ref:W,style:X},s.createElement("div",{ref:D,style:he},s.createElement("div",{ref:J,className:n,style:r,children:e}))))}else{var o;(o=N.current)==null||o.render(s.createElement("div",{ref:J,style:X,className:n,children:e}))}});const j=s.useRef(!0);We(f=>{if(m.current){l.updateMatrixWorld(),m.current.updateWorldMatrix(!0,!1);const o=h?T.current:_(m.current,l,d);if(h||Math.abs(U.current-l.zoom)>t||Math.abs(T.current[0]-o[0])>t||Math.abs(T.current[1]-o[1])>t){const y=Te(m.current,l);let p=!1;L&&(Array.isArray(c)?p=c.map(M=>M.current):c!=="blending"&&(p=[Q]));const R=j.current;if(p){const M=Fe(m.current,l,de,p);j.current=M&&!y}else j.current=!y;R!==j.current&&(Z?Z(!j.current):u.style.display=j.current?"block":"none");const H=Math.floor(O[0]/2),xe=c?L?[O[0],H]:[H-1,0]:O;if(u.style.zIndex=`${He(m.current,l,xe)}`,h){const[M,ee]=[d.width/2,d.height/2],k=l.projectionMatrix.elements[5]*ee,{isOrthographicCamera:te,top:ve,left:pe,bottom:ge,right:ye}=l,Me=Ve(l.matrixWorldInverse),be=te?`scale(${k})translate(${I(-(ye+pe)/2)}px,${I((ve+ge)/2)}px)`:`translateZ(${k}px)`;let b=m.current.matrixWorld;ie&&(b=l.matrixWorldInverse.clone().transpose().copyPosition(b).scale(m.current.scale),b.elements[3]=b.elements[7]=b.elements[11]=0,b.elements[15]=1),u.style.width=d.width+"px",u.style.height=d.height+"px",u.style.perspective=te?"":`${k}px`,W.current&&D.current&&(W.current.style.transform=`${be}${Me}translate(${M}px,${ee}px)`,D.current.style.transform=ze(b,1/((E||10)/400)))}else{const M=E===void 0?1:Le(m.current,l)*E;u.style.transform=`translate3d(${o[0]}px,${o[1]}px,0) scale(${M})`}T.current=o,U.current=l.zoom}}if(!L&&g.current&&!F.current)if(h){if(W.current){const o=W.current.children[0];if(o!=null&&o.clientWidth&&o!=null&&o.clientHeight){const{isOrthographicCamera:y}=l;if(y||G)v.scale&&(Array.isArray(v.scale)?v.scale instanceof z?g.current.scale.copy(v.scale.clone().divideScalar(1)):g.current.scale.set(1/v.scale[0],1/v.scale[1],1/v.scale[2]):g.current.scale.setScalar(1/v.scale));else{const p=(E||10)/400,R=o.clientWidth*p,H=o.clientHeight*p;g.current.scale.set(R,H,1)}F.current=!0}}}else{const o=u.children[0];if(o!=null&&o.clientWidth&&o!=null&&o.clientHeight){const y=1/me.factor,p=o.clientWidth*y,R=o.clientHeight*y;g.current.scale.set(p,R,1),F.current=!0}g.current.lookAt(f.camera.position)}});const Y=s.useMemo(()=>({vertexShader:h?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[h]);return s.createElement("group",Ce({},v,{ref:m}),c&&!L&&s.createElement("mesh",{castShadow:ae,receiveShadow:ce,ref:g},G||s.createElement("planeGeometry",null),le||s.createElement("shaderMaterial",{side:je,vertexShader:Y.vertexShader,fragmentShader:Y.fragmentShader})))});let C=0;const De=Re(e=>(V.onStart=(t,r,n)=>{e({active:!0,item:t,loaded:r,total:n,progress:(r-C)/(n-C)*100})},V.onLoad=()=>{e({active:!1})},V.onError=t=>e(r=>({errors:[...r.errors,t]})),V.onProgress=(t,r,n)=>{r===n&&(C=n),e({active:!0,item:t,loaded:r,total:n,progress:(r-C)/(n-C)*100||100})},{errors:[],active:!1,progress:0,item:"",loaded:0,total:0})),ke=()=>{const{progress:e}=De();return S.jsxs(Ne,{as:"div",center:!0,className:"flex flex-col items-center justify-center",children:[S.jsx("div",{className:"w-full max-w-xl bg-gray-300 rounded-full h-4 dark:bg-gray-700",children:S.jsx("div",{className:"bg-blue-600 h-4 rounded-full",style:{width:`${e}%`}})}),S.jsxs("p",{className:"text-[20px] text-slate-700 mt-4 flex items-center space-x-2",children:[S.jsx("span",{children:"Loading: "}),S.jsxs("span",{children:[e.toFixed(2),"%"]})]})]})},qe=we.memo(ke);export{qe as default};
