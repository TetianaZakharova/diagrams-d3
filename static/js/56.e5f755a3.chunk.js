"use strict";(self.webpackChunkdiagrams_d3=self.webpackChunkdiagrams_d3||[]).push([[56],{6056:function(t,e,n){n.r(e),n.d(e,{BubbleChart:function(){return u}});var l=n(9439),a=n(2791),i=n(3314),r=n(184),d=490;var u=function(t){var e,n=t.sourceData,u=(0,a.useState)(),o=(0,l.Z)(u,2),s=o[0],v=o[1],c=(0,a.useRef)();(0,a.useEffect)((function(){v(n)}),[n]);var f=(0,i.WUZ)(",d"),h=(0,i.PKp)(i.Cn1),p=(0,i.P2p)().size([d,d]).padding(1.5);return(0,a.useEffect)((function(){(0,i.Ys)("#bubbleChart").selectAll("svg").remove();var t=(0,i.Ys)("#bubbleChart").append("svg").attr("width",d).attr("height",245).call((function(t){var e=(0,i.Ys)(t.node().parentNode),n=parseInt(t.style("width")),l=parseInt(t.style("height")),a=n/l;function r(){var n=parseInt(e.style("width"));t.attr("width",n),t.attr("height",Math.round(n/a))}t.attr("viewBox","0 0 "+n+" 490").attr("perserveAspectRatio","xMinYMid").call(r),(0,i.Ys)(window).on("resize."+e.attr("id"),r)})).attr("class","bubble"),e=(0,i.bT9)(function(t){var e=[];return function t(n,l){null!==l&&void 0!==l&&l.children?null===l||void 0===l||l.children.forEach((function(e){t(null===l||void 0===l?void 0:l.name,e)})):e.push({packageName:n,className:null===l||void 0===l?void 0:l.name,value:null===l||void 0===l?void 0:l.size})}(null,t),{children:e}}(s)).sum((function(t){return null===t||void 0===t?void 0:t.value})).sort((function(t,e){return(null===e||void 0===e?void 0:e.value)-(null===t||void 0===t?void 0:t.value)}));p(e);var n=t.selectAll(".node").data(null===e||void 0===e?void 0:e.children).enter().append("g").attr("class","node").attr("transform",(function(t){return"translate("+t.x+","+t.y+")"}));n.append("title").text((function(t){var e;return(null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.className)+": "+f(null===t||void 0===t?void 0:t.value)})),n.append("circle").attr("r",(function(t){return t.r})).style("fill",(function(t){var e;return h(null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.packageName)})),n.append("text").attr("dy",".3em").attr("text-anchor","middle").style("font-size","11px").text((function(t){var e,n;return null===t||void 0===t||null===(e=t.data)||void 0===e||null===(n=e.className)||void 0===n?void 0:n.substring(0,(null===t||void 0===t?void 0:t.r)/3)}))}),[(null===s||void 0===s||null===(e=s.children)||void 0===e?void 0:e.length)>=1]),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"col-lg-12 d-flex flex-column",children:(0,r.jsx)("div",{id:"bubbleChart",className:"col-lg-12 d-flex mx-auto",ref:c})})})}}}]);
//# sourceMappingURL=56.e5f755a3.chunk.js.map