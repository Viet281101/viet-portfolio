import{R as u,r as f}from"./index-DC39g7s8.js";import{_,aA as h,aB as y,C as d,H as b,aC as S,aa as k,aD as C,aE as U}from"./@monogrid-Cu9sSBMg.js";import{f as M,u as P}from"./react-three-fiber.esm-DepDril1.js";import"./hls.js-CqkleIqs.js";function O(a,l,t,v){const n=class extends h{constructor(s={}){const o=Object.entries(a);super({uniforms:o.reduce((e,[i,c])=>{const r=y.clone({[i]:{value:c}});return{...e,...r}},{}),vertexShader:l,fragmentShader:t}),this.key="",o.forEach(([e])=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:i=>this.uniforms[e].value=i})),Object.assign(this,s)}};return n.key=_.generateUUID(),n}const g=O({time:0,fresnelOpacity:1,fresnelAmount:.45,scanlineSize:8,hologramBrightness:1.2,signalSpeed:.45,hologramColor:new d("#51a4de"),enableBlinking:!0,blinkFresnelOnly:!0,hologramOpacity:1},`
	varying vec3 vViewPosition;
	#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
	#endif

	varying vec2 vUv;
	varying vec4 vPos;
	varying vec3 vNormalW;
	varying vec3 vPositionW;
	#include <common>
	#include <uv_pars_vertex>
	#include <envmap_pars_vertex>
	#include <color_pars_vertex>
	#include <fog_pars_vertex>
	#include <morphtarget_pars_vertex>
	#include <skinning_pars_vertex>
	#include <logdepthbuf_pars_vertex>
	#include <clipping_planes_pars_vertex>
	void main() {
		#include <uv_vertex>
		#include <color_vertex>
		#include <morphcolor_vertex>

		#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
			#include <beginnormal_vertex>
			#include <morphnormal_vertex>
			#include <skinbase_vertex>
			#include <skinnormal_vertex>
			#include <defaultnormal_vertex>
		#endif

		#include <begin_vertex>
		#include <morphtarget_vertex>
		#include <skinning_vertex>
		#include <project_vertex>
		#include <logdepthbuf_vertex>
		#include <clipping_planes_vertex>

		#include <worldpos_vertex>
		#include <envmap_vertex>
		#include <fog_vertex>
		mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;
		vUv = uv;
		vPos = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
		vPositionW = vec3( vec4( transformed, 1.0 ) * modelMatrix);
		vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );

		gl_Position = modelViewProjectionMatrix * vec4( transformed, 1.0 );
	}`,` 
	varying vec2 vUv;
	varying vec3 vPositionW;
	varying vec4 vPos;
	varying vec3 vNormalW;

	uniform float time;
	uniform float fresnelOpacity;
	uniform float scanlineSize;
	uniform float fresnelAmount;
	uniform float signalSpeed;
	uniform float hologramBrightness;
	uniform float hologramOpacity;
	uniform bool blinkFresnelOnly;
	uniform bool enableBlinking;
	uniform vec3 hologramColor;
	float flicker( float amt, float time ) {return clamp( fract( cos( time ) * 43758.5453123 ), amt, 1.0 );}
	float random(in float a, in float b) { return fract((cos(dot(vec2(a,b) ,vec2(12.9898,78.233))) * 43758.5453)); }
	void main() {
		vec2 vCoords = vPos.xy;
		vCoords /= vPos.w;
		vCoords = vCoords * 0.5 + 0.5;
		vec2 myUV = fract( vCoords );
		// Defines hologram main color
		vec4 hologramColor = vec4(hologramColor, mix(hologramBrightness, vUv.y, 0.5));
		// Add scanlines
		float scanlines = 10.;
		scanlines += 20. * sin(time *signalSpeed * 20.8 - myUV.y * 60. * scanlineSize);
		scanlines *= smoothstep(1.3 * cos(time *signalSpeed + myUV.y * scanlineSize), 0.78, 0.9);
		scanlines *= max(0.25, sin(time *signalSpeed) * 1.0);        

		// Scanlines offsets
		float r = random(vUv.x, vUv.y);
		float g = random(vUv.y * 20.2, 	vUv.y * .2);
		float b = random(vUv.y * .9, 	vUv.y * .2);
		// Scanline composition
		hologramColor += vec4(r*scanlines, b*scanlines, r, 1.0) / 84.;
		vec4 scanlineMix = mix(vec4(0.0), hologramColor, hologramColor.a);
		// Calculates fresnel
		vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
		float fresnelEffect = dot(viewDirectionW, vNormalW) * (1.6 - fresnelOpacity/2.);
		fresnelEffect = clamp(fresnelAmount - fresnelEffect, 0., fresnelOpacity);
		// Blinkin effect
		//Suggested by Octano - https://x.com/OtanoDesign?s=20
		float blinkValue = enableBlinking ? 0.6 - signalSpeed : 1.0;
		float blink = flicker(blinkValue, time * signalSpeed * .02);

		// Final shader composition
		vec3 finalColor;
		if(blinkFresnelOnly){
			finalColor = scanlineMix.rgb + fresnelEffect * blink;
		}else{
			finalColor = scanlineMix.rgb * blink + fresnelEffect;
		}
		gl_FragColor = vec4( finalColor, hologramOpacity);
	}`);M({HolographicMaterialImpl:g});const E=({fresnelAmount:a=.45,fresnelOpacity:l=1,scanlineSize:t=8,hologramBrightness:v=1.2,signalSpeed:n=.45,hologramColor:m="#51a4de",enableBlinking:s=!0,blinkFresnelOnly:o=!0,enableAdditive:e=!0,hologramOpacity:i=1,side:c="FrontSide"})=>{const r=f.useRef(null);P((w,x)=>{r.current&&(r.current.uniforms.time.value+=x)});const p=f.useMemo(()=>new g({uniforms:{time:{value:0},fresnelOpacity:{value:l},fresnelAmount:{value:a},scanlineSize:{value:t},hologramBrightness:{value:v},signalSpeed:{value:n},hologramColor:{value:new d(m)},enableBlinking:{value:s},blinkFresnelOnly:{value:o},hologramOpacity:{value:i}}}),[a,l,t,v,n,m,s,o,i]);return u.createElement("primitive",{object:p,attach:"material",side:c==="DoubleSide"?b:c==="BackSide"?S:k,transparent:!0,blending:e?C:U,ref:r})},A=u.memo(E);export{A as default};
