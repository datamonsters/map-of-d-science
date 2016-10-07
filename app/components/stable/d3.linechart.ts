const linechart = {
    init: init,
    draw: draw
}
export default linechart


const margin = {top: 20, right: 0, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 300 - margin.top * 2 - margin.bottom;

let svg
function init() {
    svg = d3.select("#svglines")
        .attr("viewBox", "00 0 800 300")
}


function draw(data) {
    svg.selectAll("*").remove()
    const fx = d3.scaleTime()
        .domain(d3.extent(data.graph, d=>d.d))
        .range([margin.left, width - margin.right]) as any
    const fy = d3.scaleLinear()
        .domain([data.min, data.max])
        .range([height, 0]) as any

    const valueline = (i)=>d3.line()
        .x(d => fx(d.d))
        .y(d => fy(d.l[i]))
        .curve(d3.curveCatmullRom.alpha(0.5));

    svg.append("g")
        .attr("transform", "translate(0," + (height ) + ")")
        .call(d3.axisBottom(fx)
            .ticks(d3.timeWeek)
            .tickSize(6, 0)
        )

    svg.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(fy))


    data.labels.forEach(l=> {
        svg.append("path")
            .data([data.graph])
            .attr("class", "line")
            .attr("id", l.id)
            .attr("stroke", l.color)
            .attr("d", valueline(l.i))
    })


    svg.append("text")
        .attr("transform", "rotate(270 100, 100)")
        // .attr("dx", 0)
        // .attr("dy", 0)
        .attr("x", -32)
        .attr("y", 20)
        .attr("class", "fontLabel")
        .style("font-weigh", "light")
        .text("Number of events");


}
