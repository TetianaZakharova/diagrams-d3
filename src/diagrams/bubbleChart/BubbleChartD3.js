import { useEffect, useState, useRef } from 'react';
import { format, pack, schemeCategory10, hierarchy, selectAll, scaleOrdinal, scaleSqrt, schemeSet1, select, forceSimulation, forceCenter, forceCollide, forceX, forceY } from "d3"

// const width = 490;
// const height = 490;
let diameter = 490;
// const centerX = width / 2;
// const centerY = height / 2;

function classes(root) {
  let classes = [];

  function recurse(name, node) {
    if (node?.children) node?.children.forEach(function (child) { recurse(node?.name, child); });
    else classes.push({ packageName: name, className: node?.name, value: node?.size });
  }

  recurse(null, root);
  return { children: classes };
}

export const BubbleChart = ({ sourceData }) => {
  const [data, setData] = useState()
  let bubbleRef = useRef();

  useEffect(() => {
    setData(sourceData);
  }, [sourceData])
  // console.log('data', data)

  const format2 = format(",d");
  let color = scaleOrdinal(schemeCategory10);

  let bubble = pack()
    .size([diameter, diameter])
    .padding(1.5);

  useEffect(() => {
    // const bubble = pack()
    // .size([diameter, diameter])
    // .padding(1.5);

    select("#bubbleChart").selectAll("svg").remove()
    // bubbleRef.current.style.height = height + "px";
    // bubbleRef.current.style.width  = width + "px";

    const svg = select("#bubbleChart").append("svg")
      .attr("width", diameter)
      .attr("height", diameter/2)
      .call(responsivefy)
      .attr("class", "bubble");

    const root = hierarchy(classes(data))
      .sum(function (d) { return d?.value; })
      .sort(function (a, b) { return b?.value - a?.value; });
    bubble(root);
    const node = svg.selectAll(".node")
      .data(root?.children)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
    node.append("title")
      .text(function (d) { return d?.data?.className + ": " + format2(d?.value); });
    node.append("circle")
      .attr("r", function (d) { return d.r; })
      .style("fill", function (d) {
        return color(d?.data?.packageName);
      });
    node.append("text")
      .attr("dy", ".3em")
      .attr("text-anchor", "middle")
      .style('font-size', '11px')
      .text(function (d) { return d?.data?.className?.substring(0, d?.r / 3); });

    // select(self?.frameElement).style("height", diameter + "px");

    function responsivefy(svg) {
      // get container + svg aspect ratio
      const container = select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

      // add viewBox and preserveAspectRatio properties,
      // and call resize so that svg resizes on inital page load
      
      // svg.attr("viewBox", "0 0 " + width + " " + height)
      svg.attr("viewBox", "0 0 " + width + " " + 490)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

      select(window).on("resize." + container.attr("id"), resize);

      // get width of container and resize svg to fit it
      function resize() {
        const targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
      }
    }

  }, [data?.children?.length >= 1])


  return (
    <>
      {
        <div className='col-lg-12 d-flex flex-column' >
          <div
            id='bubbleChart'
            className='col-lg-12 d-flex mx-auto'
            ref={bubbleRef}
          >
          </div>
        </div>
      }
    </>
  )
}
