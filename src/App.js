import React, { Component } from 'react';
import * as d3 from 'd3';

var num = [[{ "number": 1, "name": "one" }, { "number": 2, "name": "two" }, { "number": 3, "name": "three" }]];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    setInterval(() => {
      fetch('http://localhost:8080').then((req) => {
        return req.json()
      }).then((res) => {
        this.setState({
          data: res.data
        }, () => {
          num.push(this.state.data);
          this.drawChart();
        })
      })
    }, 2000)
  }
  drawChart() {
    var width = 400, height = 400;
    var svg = d3.select('svg').attr('width', width).attr('height', height);
    svg.selectAll('*').remove();
    var outerRadius = 150, innerRadius = 0;
    var arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    var pie = d3.pie().value(function (d) { return d.number }).sort(function (a, b) { return a.name.localeCompare(b.name) });
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var arcs = svg.selectAll('g')
      .data(pie(num.shift()))
      .enter()
      .append('g')
      .attr('transform','translate(' + (width/2) + ',' + (width/2) + ")")
      .attr('d',arc)

    var path = arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => {
        return color(i)
      })

    var text = arcs.append('text')
      .attr('class', 'text')
      .attr('transform', (d) => {
        return "translate(" + arc.centroid(d) + ")";
      })
      .text((d) => {
        return d.data.name
      })
      .attr('text-anchor', "middle")
      .attr('font-size', '16px')
      .attr('fill', '#000')

    path.transition().duration(1000).attrTween('d', (d, i) => {
      var compute = d3.interpolate(d, pie(this.state.data)[i]);
      return function (t) {
        d = compute(t);
        return arc(d)
      }
    })

    text.transition().duration(1000).attrTween('transform', (d, i) => {
      var computed = d3.interpolate(arc.centroid(d), arc.centroid(pie(this.state.data)[i]))
      return function (t) {
        d = computed(t);
        return "translate(" + d + ")"
      }
    })

  }
  render() {
    return (
      <svg className="App">
      </svg>
    )
  }
}

export default App;