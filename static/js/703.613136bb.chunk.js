"use strict";(self.webpackChunkdiagrams_d3=self.webpackChunkdiagrams_d3||[]).push([[703,736,729],{4703:function(t,e,n){n.r(e);var a=n(9439),r=n(2791),l=n(3314),i=(n(1736),n(184)),o=50,d=50,s=60,u=75,c=1e3-u-d,f=500-o-s;e.default=function(t){var e=t.sourceData,n=(0,r.useState)([]),v=(0,a.Z)(n,2),p=v[0],m=v[1],g=(0,r.useState)([]),h=(0,a.Z)(g,2),x=h[0],y=h[1],w=(0,r.useState)([]),k=(0,a.Z)(w,2),D=k[0],Y=k[1],b=(0,r.useRef)();(0,r.useEffect)((function(){var t,n,a;m(null===(t=e[0])||void 0===t?void 0:t.scatterData),y(null===(n=e[0])||void 0===n?void 0:n.xDomain),Y(null===(a=e[0])||void 0===a?void 0:a.yDomain)}),[e]);var A=(0,l.Z1g)("%Y-%m-%d"),S=["Download","Upload"],j=["#86bc25","#bbb"];return(0,r.useEffect)((function(){(0,l.Ys)("#connectedScatter").selectAll("svg").remove();var t=(0,l.Ys)("#connectedScatter").append("svg").attr("width",c+u+d).attr("height",f+o+s).call((function(t){var e=(0,l.Ys)(t.node().parentNode),n=parseInt(t.style("width")),a=parseInt(t.style("height")),r=n/a;function i(){var n=parseInt(e.style("width"));t.attr("width",n),t.attr("height",Math.round(n/r))}t.attr("viewBox","0 0 "+n+" "+a).attr("perserveAspectRatio","xMinYMid").call(i),(0,l.Ys)(window).on("resize."+e.attr("id"),i)})).append("g").attr("transform","translate("+u+","+o+")"),e=(0,l.PKp)().domain(S).range(j),n=(0,l.Xf)().domain((0,l.Wem)(x,(function(t){return A(t.time)}))).range([0,c]);t.append("g").attr("transform","translate(0,"+f+")").call((0,l.LLu)(n).ticks(l.rr1)),t.append("text").attr("transform","translate("+c/2+" ,"+(f+o-10)+")").style("text-anchor","middle").text("Day");var a=(0,l.BYU)().domain(D).range([f,0]);t.append("g").call((0,l.y4O)(a)),t.append("text").attr("transform","rotate(-90)").attr("y",0-u).attr("x",0-f/2).attr("dy","1em").style("text-anchor","middle").text("MB");var r=(0,l.jvg)().x((function(t){return n(+A(t.time))})).y((function(t){return a(+t.value)}));t.selectAll("myLines").data(p).enter().append("path").attr("d",(function(t){return r(null===t||void 0===t?void 0:t.values)})).attr("stroke",(function(t){return e(null===t||void 0===t?void 0:t.name)})).style("stroke-width",4).style("fill","none"),t.selectAll("myDots").data(p).enter().append("g").style("fill",(function(t){return e(t.name)})).selectAll("myPoints").data((function(t){return t.values})).enter().append("circle").attr("cx",(function(t){return n(A(t.time))})).attr("cy",(function(t){return a(t.value)})).attr("r",5).attr("stroke","white"),t.selectAll("myLegend").data(p).enter().append("g").append("text").attr("x",(function(t,e){return 15+80*e})).attr("y",10).text((function(t){return t.name})).style("fill",(function(t){return e(t.name)})).style("font-size",15)}),[(null===p||void 0===p?void 0:p.length)>0,(null===x||void 0===x?void 0:x.length)>0,(null===D||void 0===D?void 0:D.length)>0,p,x,D]),(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"col-lg-12 d-flex flex-column",children:(0,i.jsx)("div",{id:"connectedScatter",className:"col-lg-12 d-flex mx-auto",ref:b})})})}},1736:function(t,e,n){n.r(e),e.default={}}}]);
//# sourceMappingURL=703.613136bb.chunk.js.map