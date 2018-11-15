import React, { Component } from 'react'
import * as d3 from 'd3';

import '../css/StixGraph.css'

class StixGraph extends Component {
  constructor(props) {
    super(props)
    this.createGraph = this.createGraph.bind(this)
  }
  componentDidMount() {
    this.createGraph()
  }
  // componentDidUpdate() {
  //   this.createGraph()
  // }
  createGraph() {

    const nodeSvg = this.nodeSvg

    var jsonCircles = [
        { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
        { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
        { "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}];
    
    var circles = d3.select(nodeSvg).selectAll("circle")
                              .data(jsonCircles)
                              .enter()
                              .append("circle");
    
    var circleAttributes = circles
                            .attr("cx", function (d) { return d.x_axis; })
                            .attr("cy", function (d) { return d.y_axis; })
                            .attr("r", function (d) { return d.radius; })
                            .style("fill", function(d) { return d.color; });

    // const graph = {
    //   "nodes": [
    //     {"id": "1", "group": 1},
    //     {"id": "2", "group": 2},
    //     {"id": "4", "group": 3},
    //     {"id": "8", "group": 4},
    //     {"id": "16", "group": 5},
    //     {"id": "11", "group": 1},
    //     {"id": "12", "group": 2},
    //     {"id": "14", "group": 3},
    //     {"id": "18", "group": 4},
    //     {"id": "116", "group": 5}
    //   ],
    //   "links": [
    //     {"source": "1", "target": "2", "value": 1},
    //     {"source": "2", "target": "4", "value": 1},
    //     {"source": "4", "target": "8", "value": 1},
    //     {"source": "4", "target": "8", "value": 1},
    //     {"source": "8", "target": "16", "value": 1},
    //     {"source": "16", "target": "1", "value": 1}
    //   ]
    // }

    // var width = 960
    // var height = 500
    // const nodeSvg = this.nodeSvg
    
    // var simulation = d3.forceSimulation()
    // .force("link", d3.forceLink().id(function(d) { return d.id; }))
		// .force('charge', d3.forceManyBody()
    //   .strength(-200)
    //   .theta(0.8)
    //   .distanceMax(150)
    // )
    // .force("center", d3.forceCenter(width / 2, height / 2));

    // var link = d3.select(nodeSvg).append("g")
    //   .attr("class", "link")
    //   .selectAll("line")
    //   .data(graph.links)
    //   .enter().append("line");

    // var node = d3.select(nodeSvg).append("g")
    //   .attr("class", "nodes")
    //   .selectAll("circle")
    //   .data(graph.nodes)
    //   .enter().append("circle")
    //   .attr("r", 16)
    //   .call(d3.drag()
    //     .on("start", dragstarted)
    //     .on("drag", dragged)
    //     .on("end", dragended));
    
    // var label = d3.select(nodeSvg).append("g")
    //   .attr("class", "labels")
    //   .selectAll("text")
    //   .data(graph.nodes)
    //   .enter().append("text")
    //     .attr("text-anchor", "start")
    //     .text(function(d) { return d.id; })

    // simulation
    //   .nodes(graph.nodes)
    //   .on("tick", ticked);
  
    // simulation.force("link")
    //   .links(graph.links);

    // function ticked() {
    //   link
    //     .attr("x1", function(d) { return d.source.x; })
    //     .attr("y1", function(d) { return d.source.y; })
    //     .attr("x2", function(d) { return d.target.x; })
    //     .attr("y2", function(d) { return d.target.y; });
  
    //   node
    //     .attr("transform", function(d) {
    //       return "translate(" + d.x + "," + d.y + ")";
    //     })
      
    //   label
    //     .attr("x", function(d) { return d.x; })
    //     .attr("y", function (d) { return d.y; });
    //   }

    //   function dragstarted(d) {
    //     if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    //     d.fx = d.x
    //     d.fy = d.y
    //   }
      
    //   function dragged(d) {
    //     d.fx = d3.event.x
    //     d.fy = d3.event.y
    //   }
      
    //   function dragended(d) {
    //     d.fx = d3.event.x
    //     d.fy = d3.event.y
    //     if (!d3.event.active) simulation.alphaTarget(0);
    //   }

  }
  render() {
    return (
      <svg ref = { node => this.nodeSvg = node } 
        width = { 960 } height = { 500 } />
    )
  }
}
export default StixGraph;