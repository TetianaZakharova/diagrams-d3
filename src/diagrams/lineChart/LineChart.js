import { useState, useEffect, useRef } from 'react';
import { line, select, selectAll, scaleOrdinal, timeParse, scaleTime, extent, timeDay, axisBottom, scaleLinear, axisLeft} from "d3"
import "./CustomChart.scss";

// Set the dimensions and margins of the diagram
const margin = { top: 50, right: 50, bottom: 60, left: 75 },
  width = 1000 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  const LineChart = ({ sourceData }) => {

  const [data, setData] = useState([])
  const [timeData, setTimeData] = useState([])
  const [yValue, setYValue] = useState([])
  let lineRef = useRef();

  useEffect(() => {
    setData(sourceData[0]?.scatterData);
    setTimeData(sourceData[0]?.xDomain);
    setYValue(sourceData[0]?.yDomain);
  },  
  [sourceData]) 

  // function to parse the time
  const parseDate = timeParse("%Y-%m-%d");
  const allGroup = ["Download", "Upload"];
  var colors = ["#86bc25", "#bbb"];

  useEffect(() => {
    select("#connectedScatter").selectAll("svg").remove()

    var svg = select("#connectedScatter")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call(responsivefy)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // A color scale: one color for each group
    var myColor = scaleOrdinal()
      .domain(allGroup)
      .range(colors);
    // .range(d3.schemeCategory10);

    // Add X axis --> it is a date format
    var x = scaleTime()
      //d3.scaleLinear()
      // .domain([0,10])
      // .domain(vm.x)
      .domain(extent(timeData, function (d) { return parseDate(d.time); }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x).ticks(timeDay));

    // text label for the x axis
    svg.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top - 10) + ")")
      .style("text-anchor", "middle")
      .text("Day");

    // Add Y axis
    var y = scaleLinear()
      // .domain( [0,100])
      .domain(yValue)
      .range([height, 0]);
    svg.append("g")
      .call(axisLeft(y));

    // text label for the y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("MB");

    // Add the lines
    let line2 = line()
      .x(function (d) { return x(+parseDate(d.time)) })
      .y(function (d) { return y(+d.value) })
    svg.selectAll("myLines")
      .data(data)
      .enter()
      .append("path")
      .attr("d", function (d) { return line2(d?.values) })
      .attr("stroke", function (d) { return myColor(d?.name) })
      .style("stroke-width", 4)
      .style("fill", "none")

          // Add the points
    svg
    // First we need to enter in a group
        .selectAll("myDots")
        .data(data)
        .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
        // Second we need to enter in the 'values' part of this group
        .selectAll("myPoints")
        .data(function(d){ return d.values })
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(parseDate(d.time)) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")

            // Add a legend 
    svg
    .selectAll("myLegend")
    .data(data)
    .enter()
    .append('g')
    .append("text")
    .attr('x', function(d,i){ return 15 + i*80})
    .attr('y', 10)
    .text(function(d) { return d.name; })
    .style("fill", function(d){ return myColor(d.name) })
    .style("font-size", 15)


    function responsivefy(svg) {
      // get container + svg aspect ratio
      var container = select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

      // add viewBox and preserveAspectRatio properties,
      // and call resize so that svg resizes on inital page load
      // svg.attr("viewBox", "0 0 " + 490 + " " + 500)
      svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);


      select(window).on("resize." + container.attr("id"), resize);

      // get width of container and resize svg to fit it
      function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
      }
    } 
}, [data?.length > 0, timeData?.length > 0, yValue?.length > 0, data, timeData, yValue]) 

  return (
    <>
      {
        <div className='col-lg-12 d-flex flex-column' >
          <div
            id='connectedScatter'
            className='col-lg-12 d-flex mx-auto'
            ref={lineRef}
          >
          </div>
        </div>

      }
    </>
  )
}

export default LineChart 