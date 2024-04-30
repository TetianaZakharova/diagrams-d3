import { useEffect, useRef } from 'react';
import { tree, hierarchy, select } from "d3"

const TreeDiagram = ({sourceData}) => {

    let treeRef = useRef();
    const treeData = sourceData;

    // Set the dimensions and margins of the diagram
    const margin = {top: 0, right: 90, bottom: 30, left: 170},
    //   width = 1400 - margin.left - margin.right,
    //   height = 800 - margin.top - margin.bottom;  
    width = 1270 - margin.left - margin.right,
    height = 565 - margin.top - margin.bottom;  

    useEffect(() => {
         //remove all nodes before updates
        select("#treeDiagram").selectAll("svg").remove()
        // treeRef.current.style.height = height + "px";
        // treeRef.current.style.width  = width + "px";

         // append the svg object to the body of the page
         // appends a 'group' element to 'svg'
         // moves the 'group' element to the top left margin
        const svg = select("#treeDiagram").append("svg")
          .attr("width", width + margin.right + margin.left)
          .attr("height", height + margin.top + margin.bottom)
          .call(responsivefy)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");  
  
        const i = 0,
          duration = 750;

        // declares a tree layout and assigns the size
        let treemap = tree().size([height, width]);

    // Assigns parent, children, height, depth    
        const root = hierarchy(treeData);
          root.x0 = height / 2;
          root.y0 = 0;
          root.descendants().forEach((d, i) => {
              d.id = i;
              d._children = d.children;
            });

        function responsivefy(svg) {
        // get container + svg aspect ratio
          let container = select(svg.node().parentNode),
            width = parseInt(svg.style("width")),
            height = parseInt(svg.style("height")),
            aspect = width / height;       

        // add viewBox and preserveAspectRatio properties,
        // and call resize so that svg resizes on inital page load
        //   svg.attr("viewBox", "0 0 " + 1200 + " " + height)
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
    // Collapse the node and all it's children
    function collapse(d) {
        if(d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
        }
    };
   
    function update(source) {

        // Assigns the x and y position for the nodes
        const treeData = treemap(root);
        console.log(treeData)

        // Compute the new tree layout.
        const nodes = treeData.descendants(),
              links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach(function(d){ d.y = d.depth * 180});

        // ****************** Nodes section ***************************

        // Update the nodes...
        const node = svg.selectAll('g.node')
            .data(nodes, function(d, i) {return d.id || (d.id = i++) });
 
        // Enter any new modes at the parent's previous position.
        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .attr('cursor', 'pointer')
            // .on('click', click);
            .on("click", (event, d) => {
                d.children = d.children ? null : d._children;
                update(d);
              });                    
    
        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function(d) {
                if(d.data.color !== undefined){
                    return d.data.color;
                }else{
                    return d._children ? "lightsteelblue" : "#fff";
                }

            })
            .style("stroke", function(d) {
                if(d.data.color !== undefined){
                    return d.data.color;
                }else{
                    return "steelblue";
                }
            });

        // Add labels for the nodes
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function(d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("x", d => d._children ? -13 : 13)
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) { return d.data.name; });
            // .clone(true).lower()
            // .attr("stroke-linejoin", "round")
            // .attr("stroke-width", 1)
            // .attr("stroke", "white");

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });
            // .attr("fill-opacity", 1)
            // .attr("stroke-opacity", 1);

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", function(d) {
                if(d.data.color !== undefined){
                    return d.data.color;
                }else{
                    return d._children ? "lightsteelblue" : "#fff";
                }
            })
            .style("stroke", function(d) {
                if(d.data.color !== undefined){
                    return d.data.color;
                }else{
                    return "steelblue";
                }
            })
            .attr('cursor', 'pointer');

        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = svg.selectAll('path.link')
            .data(links, function(d) { return d.id; });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function(d){
                var o = {x: source.x0, y: source.y0}
                return diagonal(o, o)
            })
            .attr("fill","none")
            .attr("class", "link")
            .attr ("stroke", "#bbbbbb");

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function(d){ return diagonal(d, d.parent) });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function(d) {
                var o = {x: source.x, y: source.y}
                return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function(d){
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {
            var path = `M ${s.y} ${s.x}
                        C ${(s.y + d.y) / 2} ${s.x},
                        ${(s.y + d.y) / 2} ${d.x},
                        ${d.y} ${d.x}`;
            return path;
        }
  };
  update(root);
}, [sourceData])

  return (
    <div className='col-lg-12 d-flex flex-column' >
  
        <div
          id='treeDiagram'
          className='col-lg-12 d-flex mx-auto'
          ref={treeRef}
        ></div>
    </div>
  )
}

export default TreeDiagram;
