import React, { Component } from 'react'
import * as d3 from 'd3';

import '../css/StixGraph.css';

class StixGraph extends Component {
  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
    this.state = {
      size: {
        width: 800,
        height: 500
      },
      selectedNode: ""
    }
  }

  static defaultProps = {
    handleSelectNode: null
  };

  componentDidMount() {
    this.setState({
      width: this.props.size.width,
      height: this.props.size.height
    });
    this.createGraph();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.size.width !== this.props.size.width) {
      this.setState({
       size: {
        width: this.props.size.width,
        height: this.props.size.height
       }
      });
    }
    if (prevProps.data !== this.props.data) {
      this.createGraph();
    }
  }

  createGraph() {
    if (this.props.data != null) {
      // RESET FIRST
      
      // Bagian Config
      const nodeSvg = this.nodeSvg;
      var d3Config = {
        color: d3.scaleOrdinal(d3.schemeCategory10),
        nodeSize: 17.5,
        iconSize: 37,
        linkMultiplier: 20,
        width: this.state.size.width,
        height: this.state.size.height,
        iconDir: "icons"
      };
      
      // inisialisasi variabel
      var dataRelationships = [];
      var tempRelationships = [];
      var dataNodes = [];

      // reset node
      reset();
      
      var objects = this.props.data.objects;
      objects.forEach(item => {
        if (item['type'] === 'relationship') {
          tempRelationships.push(item);
        }
        else {
          dataNodes.push(item);
        }
      });

      // update relationship
      tempRelationships.forEach(item => {
        dataRelationships.push({source: item.source_ref, target: item.target_ref, label: item.relationship_type});
      });

      var container = d3.select(nodeSvg).append("g");

      // create filter with id #drop-shadow
      // height=130% so that the shadow is not clipped
      var filter = d3.select(nodeSvg).append("svg:defs").append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "200%")
        .attr("width", "200%")
        .attr("x", "-50%") // x and y have to have negative offsets to
        .attr("y", "-50%"); // stop the edges from getting cut off
      // translate output of Gaussian blur to the right and downwards with 2px
      // store result in offsetBlur
      filter.append("feOffset")
      .attr("in", "SourceAlpha")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offOut");
      // SourceAlpha refers to opacity of graphic that this filter will be applied to
      // convolve that with a Gaussian with standard deviation 3 and store result
      // in blur
      filter.append("feGaussianBlur")
          .attr("in", "offOut")
          .attr("stdDeviation", 5)
          .attr("result", "blurOut");
      filter.append("feBlend")
          .attr("in", "SourceGraphic")
          .attr("in2", "blurOut")
          .attr("mode", "normal");

      var link = container.append("g")
        .attr("class", "link")
        .selectAll("line")
        .data(dataRelationships)
        .enter()
        .append("path")
        .style("fill","#aaa").style("stroke", "#aaa").style("stroke-width", "3px")
        .attr('id', function(d, i) { 
          return "link_" + i; 
        });

      var linkText = container.append("g")
        .selectAll("linkLabelHolder")
        .data(dataRelationships)
        .enter()
        .append("text")
        .attr("class", "linkLabel")
        .style("font-size", "13px")
        .attr("text-anchor", "start")
        .style("fill","#000")
        .append("textPath")
        .attr("xlink:href", function(d,i) { 
          return "#link_" + i;
        })
        .attr("startOffset", "20%")
        .text(function(d) {
          return d.label;
        });

      var node = container.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(dataNodes)
        .enter()
        .append("g")
        .style("cursor", "pointer")
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
          .on("click", handleSelect.bind(this))

      var circles = node.append("circle")
        .attr("r", d3Config.nodeSize)
        .attr('id', function(d, i) { 
          return "node_" + i; 
        })
        .style("stroke", "#555").style("stroke-width", 2)
        .style("fill", d => d3Config.color(d.type))
      
      var images = node.append("image")
      .attr("xlink:href", function(d) {
        return "/img/icons/stix2_" + d.type.replace(/\-/g, '_') + "_icon_tiny_round_v1.png"
      })
      .attr("x", "-" + (d3Config.nodeSize + 0.5) + "px")
      .attr("y", "-" + (d3Config.nodeSize + 1.5)  + "px")
      .attr("width", d3Config.iconSize + "px")
      .attr("height", d3Config.iconSize + "px");

      var nodeText = node.append("text")
        .style("fill", "#555").style("font-size", "13px")
        .attr("x", d3Config.nodeSize + 10)
        .text(function (d) {
          return d.name;
        });

      d3.select(nodeSvg).call(d3.zoom()
        .scaleExtent([0.25, 5])
        .on("zoom", function() {
          container.attr("transform", d3.event.transform);
        })
      ).on("dblclick.zoom", null);

      var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { 
        return d.id; 
      }).distance(150).strength(2))
      .force('charge', d3.forceManyBody()
        .strength(-400)
        .theta(0.8)
        .distanceMax(d3Config.linkMultiplier * d3Config.nodeSize)
      )
      .force("center", d3.forceCenter(d3Config.width / 2, d3Config.height / 2));
  
      simulation
        .nodes(dataNodes)
        .on("tick", ticked);
    
      simulation.force("link")
        .links(dataRelationships);
  
      function ticked() {
        link.attr("d", function(d) { 
          return drawArrow(d); 
        });

        circles.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })

        images.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })

        nodeText.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
      }
  
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x
        d.fy = d.y
      }
      
      function dragged(d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
      }
      
      function dragended(d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
        if (!d3.event.active) simulation.alphaTarget(0);
      }

      function handleSelect(d, i) {
        var id = "#node_" + i
        d3.select('.selected').classed('selected', false);
        d3.select(id).classed('selected', true);

        if (this.props.handleSelectNode !== null) {
          this.props.handleSelectNode(d);
        } else {
          this.setState({
            selectedNode: d
          });
        }

      }

      /* ******************************************************
      *                 HELPER FUNCTION
      * ******************************************************/

      function reset() {
        // inisialisasi variabel
        dataRelationships = [];
        tempRelationships = [];
        dataNodes = [];
        d3.select(nodeSvg).selectAll("g").remove();
      }

      /* ******************************************************
      * Draws an arrow between two points.
      * ******************************************************/
      function drawArrow(d) {
        return drawLine(d) + drawArrowHead(d);
      }

      /* ******************************************************
      * Draws a line between two points
      * ******************************************************/
      function drawLine(d) {
        return startAt(d.source) + lineTo(d.target);
      }

      /* ******************************************************
      * Draws an arrow head.
      * ******************************************************/
      function drawArrowHead(d) {
        var arrowTipPoint = calculateArrowTipPoint(d);
        return startAt(arrowTipPoint)
          + lineTo(calculateArrowBaseRightCornerPoint(d, arrowTipPoint))
          + lineTo(calculateArrowBaseLeftCornerPoint(d, arrowTipPoint))
          + lineTo(arrowTipPoint)
          + closePath();
      }

      /* ******************************************************
      * Creates the SVG for a starting point.
      * ******************************************************/
      function startAt(startPoint) {
        return 'M' + startPoint.x + ',' + startPoint.y;
      }

      /* ******************************************************
      * Creates the SVG for line to a point.
      * ******************************************************/
      function lineTo(endPoint) {
        return 'L' + endPoint.x + ',' + endPoint.y;
      }

      /* ******************************************************
      * Calculates the point at which the arrow tip should be.
      * ******************************************************/
      function calculateArrowTipPoint(d) {
        var nodeRadius = Math.max(d3Config.iconSize, d3Config.nodeSize) / 2;
        return translatePoint(d.target, calculateUnitVectorAlongLine(d), -(d3Config.nodeSize + 3));
      }

      /* ******************************************************
      * Calculates the point at which the right corner of the
      * base of the arrow head should be.
      * ******************************************************/
      function calculateArrowBaseRightCornerPoint(d, arrowTipPoint) {
        var arrowBaseWidth = 13;
        var unitVector = calculateUnitVectorAlongLine(d);
        var arrowBasePoint = calculateArrowBaseCentrePoint(d, arrowTipPoint);
        return translatePoint(arrowBasePoint, calculateNormal(unitVector), -arrowBaseWidth / 2);
      }

      /* ******************************************************
      * Calculates the point at which the left corner of the
      * base of the arrow head should be.
      * ******************************************************/
      function calculateArrowBaseLeftCornerPoint(d, arrowTipPoint) {
        var arrowBaseWidth = 13;
        var unitVector = calculateUnitVectorAlongLine(d);
        var arrowBasePoint = calculateArrowBaseCentrePoint(d, arrowTipPoint);
        return translatePoint(arrowBasePoint, calculateNormal(unitVector), arrowBaseWidth / 2);
      }

      /* ******************************************************
      * Calculates the point at the centre of the base of the
      * arrow head.
      * ******************************************************/
      function calculateArrowBaseCentrePoint(d, arrowTipPoint) {
        var arrowHeadLength = 13;
        return translatePoint(arrowTipPoint, calculateUnitVectorAlongLine(d), -arrowHeadLength);
      }

      /* ******************************************************
      * Calculates the point at the centre of the base of the
      * arrow head.
      * ******************************************************/
      function calculateArrowBaseCentrePoint(d, arrowTipPoint) {
        var arrowHeadLength = 13;
        return translatePoint(arrowTipPoint, calculateUnitVectorAlongLine(d), -arrowHeadLength);
      }

      /* ******************************************************
      * Translates a point.
      * ******************************************************/
      function translatePoint(startPoint, directionUnitVector, distance) {
        return { x: startPoint.x + distance * directionUnitVector.x, y: startPoint.y + distance * directionUnitVector.y };
      }

      /* ******************************************************
      * Calculates a unit vector along a particular line.
      * ******************************************************/
      function calculateUnitVectorAlongLine(d) {
        var dx = d.target.x - d.source.x;
        var dy = d.target.y - d.source.y;
        var dr = Math.sqrt(dx * dx + dy * dy);
        return { x: dx / dr, y: dy / dr };
      }

      /* ******************************************************
      * Calculates a normal to a unit vector.
      * ******************************************************/
      function calculateNormal(unitVector) {
        return { x: -unitVector.y, y: unitVector.x };
      }

      /* ******************************************************
      * Closes an SVG path.
      * ******************************************************/
      function closePath() {
        return 'Z';
      }

    } 

  }

  render() {
    return (
      <svg ref = { node => this.nodeSvg = node } 
        width = { this.state.size.width } 
        height = { this.state.size.height } 
        style={{ 
          border: "1px solid #efefef",
          borderRadius: "2px"
        }} />
    )
  }
}
export default StixGraph;