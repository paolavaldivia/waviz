  var coeff, graph;

  var sG = {};
  var g = {};


  classScale = colorbrewer.RdYlBu[5].reverse();
  //classScale[2] = "#dadada";

  g.z = d3.scale.ordinal();
  g.strokecolor = "#ffffff";
  g.nClusters = 5;
  g.color = d3.scale.linear()
      .domain([0, 1 / 4, 2 / 4, 3 / 4, 1])
      .range(classScale)

  g.Scolor = d3.scale.linear()
      //.range(colorbrewer.YlOrRd[3])
      .range(["#FFF9DF", "#fee101", "#D04F00"])
      //#888

  g.Wthres = .1;

  var colorrange = [];
  var xlims = [];

  var opts = {
      lines: 9, // The number of lines to draw
      length: 5, // The length of each line
      width: 3, // The line thickness
      radius: 6, // The radius of the inner circle
      corners: 0.4, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#fff', // #rgb or #rrggbb or array of colors
      speed: 0.9, // Rounds per second
      trail: 73, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent
      left: '50%' // Left position relative to parent
  };


  var spinner = new Spinner(opts);


  g.target = document.getElementById('loadingdiv');

  refreshDataset();

  function refreshDataset() {

      spinner.spin(g.target);
      g.currHi = -1;
      g.lastHi = -1;
      g.currMouseDate = -1;
      g.lastMouseDate = -1;

      g.clickedI = -1;
      g.paused = false;

      var e = document.getElementById("dataset");
      g.test = e.options[e.selectedIndex].text
      console.log(g.test)

      document.getElementById("dataset").blur();

      if (g.test == "Manhattan 31-Oct") {
          g.Wfile = "WOct31.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.hours;
      } else if (g.test == "Manhattan 4-May") {
          g.Wfile = "W4May14.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.hours;
      } else if (g.test == "Manhattan LW Oct") {
          g.Wfile = "WOctLW.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Manhattan Oct 2013") {
          g.Wfile = "WOct.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Manhattan Aug 2014") {
          g.Wfile = "WAug2014.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Manhattan Sep 2014") {
          g.Wfile = "WSep2014.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Manhattan Oct 2014") {
          g.Wfile = "WOct2014.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Manhattan Taxi Jun 2013") {
          g.Wfile = "WJun2013_taxi.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Manhattan Taxi Aug 2013") {
          g.Wfile = "WAug2013_taxi.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Manhattan Taxi Aug 10 2013") {
          g.Wfile = "WAug2013_10.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Manhattan Taxi Aug 05-11 2013") {
          g.Wfile = "WAug2013_05_11.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Manhattan Taxi Aug 12-18 2013") {
          g.Wfile = "WAug2013_12_18.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Manhattan Taxi Aug 17 2013") {
          g.Wfile = "WAug2013_17.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.hour;
      } else if (g.test == "Manhattan Taxi Aug 18 2013") {
          g.Wfile = "WAug2013_18.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.hour;
      } else if (g.test == "Manhattan Taxi Oct 2013") {
          g.Wfile = "WOct2013_taxi.json";
          g.Gfile = "manhattan.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.day;
      } else if (g.test == "Synthetic DifSize 2") {
          g.Wfile = "WdifSizes2.json";
          g.Gfile = "graphS2.json";
          g.nodeSize = 20;
          g.lineStroke = 4;
      } else if (g.test == "Synthetic DifSize") {
          g.Wfile = "WdifSizes.json";
          g.Gfile = "graphDS.json";
          g.nodeSize = 22;
          g.lineStroke = 4;

      } else if (g.test == "Synthetic Stab") {
          g.Wfile = "Wstab.json";
          g.Gfile = "graphDS.json";
          g.nodeSize = 22;
          g.lineStroke = 4;
          g.tick = d3.time.hours;
      } else if (g.test == "Synthetic Freq") {
          g.Wfile = "Wfreq.json";
          g.Gfile = "graphDS.json";
          g.nodeSize = 22;
          g.lineStroke = 4;
          g.tick = d3.time.hours;
      } else if (g.test == "Synthetic Growth") {
          g.Wfile = "Wgrowth.json";
          g.Gfile = "graphDS.json";
          g.nodeSize = 22;
          g.lineStroke = 4;
          g.tick = d3.time.hours;
      } else if (g.test == "Synthetic Intensity") {
          g.Wfile = "Wintensity.json";
          g.Gfile = "graphDS.json";
          g.nodeSize = 22;
          g.lineStroke = 4;
          g.tick = d3.time.hours;
      } else if (g.test == "Synthetic IntInside") {
          g.Wfile = "WintInside.json";
          g.Gfile = "graphDS.json";
          g.nodeSize = 22;
          g.lineStroke = 4;
          g.tick = d3.time.hours;
      } else if (g.test == "Synthetic Moving") {
          g.Wfile = "Wmoving.json";
          g.Gfile = "graphDS.json";
          g.nodeSize = 22;
          g.lineStroke = 4;
          g.tick = d3.time.hours;
      } else if (g.test == "Synthetic Alone") {
          g.Wfile = "Walone.json";
          g.Gfile = "graphDS.json";
          g.nodeSize = 22;
          g.lineStroke = 4;
          g.tick = d3.time.hours;
      } else if (g.test == "Synthetic Alone 1") {
          g.Wfile = "Walone1.json";
          g.Gfile = "graphDS.json";
          g.nodeSize = 22;
          g.lineStroke = 4;
          g.tick = d3.time.hours;
      } else if (g.test == "Synthetic Alone 2") {
          g.Wfile = "Walone2.json";
          g.Gfile = "graphDS.json";
          g.nodeSize = 22;
          g.lineStroke = 4;
          g.tick = d3.time.hours;
      } else if (g.test == "Synthetic0") {
          g.Wfile = "Wface.json";
          g.Gfile = "graphS.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.hours;
      } else if (g.test == "Synthetic 1") {
          g.Wfile = "Wsynth1.json";
          g.Gfile = "graphS1.json";
          g.nodeSize = 5;
          g.lineStroke = 1;
          g.tick = d3.time.hours;
      }
      g.nodeSizeBig = g.nodeSize * 2;

      d3.select("#streamgraph-chart").selectAll("*").remove();
      d3.select("#streamgraph-slider").selectAll("*").remove();
      d3.select("#patterns").selectAll("*").remove();
      d3.select("#graph-chart").selectAll("*").remove();
      d3.select("#graph-chart-signal").selectAll("*").remove();
      d3.select("#graph-chart").selectAll("*").remove();
      d3.select("#vertex-info").selectAll("*").remove();



      queue()
          .defer(d3.json, 'json/' + g.Wfile) // 
          .defer(d3.json, 'json/' + g.Gfile)
          .await(waviz); // function that uses files
  }

  // var color = "qualitative";




  function refreshClusters() {
      var e = document.getElementById("numk");
      g.ik = e.selectedIndex;
      g.nClusters = parseInt(e.options[e.selectedIndex].text);
      //   console.log( g.nClusters);

      clusterdata();

      g.z.range(colorbrewer.RdBu[g.nClusters]);

      visualize_strgraph();
      visualizePatterns();

  }


  function clusterdata() {

      fmeanC = true;
      g.wmeanbycluster = [];
      g.noCoeffxCl = [];
      if (fmeanC) {
          for (k = 0; k < g.nClusters; k++) {
              g.noCoeffxCl[k] = 0;
              g.wmeanbycluster[k] = [];
              for (j = 0; j < coeff.nScales; j++) {
                  g.wmeanbycluster[k][j] = 0;
              }
          }


          coeff.clusters.forEach(function(vK, i) {
              k = vK[g.ik];
              if (0 <= k && k < g.nClusters) {
                  g.noCoeffxCl[k] += 1;
                  for (j = 0; j < coeff.nScales; j++) {
                      g.wmeanbycluster[k][j] += coeff.coeff[i][j];
                  }
              }
          });

          for (k = 0; k < g.nClusters; k++) {
              for (j = 0; j < coeff.nScales; j++) {
                  if (coeff.maxWCol[j] != 0) {
                      g.wmeanbycluster[k][j] /= (g.noCoeffxCl[k] * coeff.maxWCol[j]);
                  } else {
                      g.wmeanbycluster[k][j] = 0;
                  }
              }
          }


      }

      associateClass2Nodes();
      colorPerClass();
      labelPerClass();

      g.selectedClases = [];
      for (k = 0; k < g.nClusters; k++) {
          g.selectedClases[k] = true;
      }

  }

  function associateClass2Nodes() {
      intdata = [];
      for (k = 0; k < g.nClusters; k++) {
          intdata[k] = [];
          for (ti = 0; ti < coeff.n; ti++) {
              intdata[k][ti] = 0;
          }
      }

      graph.nodes.forEach(function(d) {
          d["class"] = [];
      });

      //   console.log("op: " + g.ik + "   nk: " + g.nClusters)

      coeff.clusters.forEach(function(vK, i) {
          //     console.log(vK)

          k = vK[g.ik];
          var ni = Math.floor(i / coeff.n);
          var ti = i % coeff.n;
          if (threshold(i) && 0 <= k && k < g.nClusters) {
              graph.nodes[ni]["class"][ti] = k;
              intdata[k][ti] += 1;
          } else
              graph.nodes[ni]["class"][ti] = -1;
      });



      data = [];

      intdata.forEach(function(d, k) {
          d.forEach(function(v, ti) {
              data.push({
                  "key": k,
                  "date": coeff.intervals[ti],
                  "value": v
              })
          });
      });

      function threshold(i) {
          return coeff.maxWCoeff[i] >= g.Wthres;

      }

  }

  g.ccolor = [];

  function colorPerClass() {

      g.kProfiles = {
          k3: [0, .5, 1],
          k5: [0, .25, .5, .75, 1]
      };

      if (g.nClusters == 3) g.kValue = g.kProfiles["k3"];
      else if (g.nClusters == 5) g.kValue = g.kProfiles["k5"];
      for (k = 0; k < g.nClusters; k++) {
          g.ccolor[k] = g.color(g.kValue[k]);
      }

  }

  function labelPerClass() {

      var lProfiles = {
          k3: ['Low', 'Indeterminate', 'High'],
          k5: ['Low', 'Mid-Low', 'Indeterm.', 'Mid-High', 'High'],
      };

      if (g.nClusters == 3) g.lValue = lProfiles["k3"];
      else if (g.nClusters == 5) g.lValue = lProfiles["k5"];

  }



  function highlight() {

      d3.selectAll(".gnode")
          .style("visibility", function(d) {
              if (g.currMouseDate == -1) {
                  arrval = d.class.slice(xlims[0], xlims[1]).filter(function(e) {
                      return e == g.currHi
                  });
                  if (arrval.length >= coeff.n / 2) return "visible";
                  //         if (d.class.slice(xlims[0], xlims[1]).indexOf(g.currHi) != -1) return "visible";

              } else {
                  if (d.class[g.currMouseDate] == g.currHi) return "visible";
              }
              return "hidden";
          })
          .attr("fill", g.ccolor[g.currHi]);

      d3.selectAll(".gsignal")
          .style("visibility", function(d) {
              if (g.currMouseDate != -1) {
                  if (d.class[g.currMouseDate] == g.currHi) return "visible";
                  return "hidden";
              }
              return "visible";
          })
          .attr("fill", function(d, i) {
              if (g.currMouseDate != -1) {
                  if (coeff.signal[g.currMouseDate + coeff.n * i] > 0)
                      return g.Scolor(coeff.signal[g.currMouseDate + coeff.n * i]);
                  return "none";
              } else {
                  cvalue = 0;
                  for (its = xlims[0]; its < xlims[1]; its++)
                      cvalue += coeff.signal[its + coeff.n * i];
                  cvalue /= xlims[1] - xlims[0] + 1;

                  if (cvalue > 0)
                      return g.Scolor(cvalue);
                  return "none"
              }
          });

      g.lastHi = g.currHi;
      g.lastMouseDate = g.currMouseDate;
  }

  function highlightAll() {

      d3.selectAll(".gnode")
          .style("visibility", "visible")
          .attr("fill", function(d) {
              coli = d.class[g.currMouseDate];
              if (coli >= 0 && g.selectedClases[coli]) return g.ccolor[coli];
              return "none";
          });

      d3.selectAll(".gsignal")
          .style("visibility", "visible")
          .attr("fill", function(d, i) {
              if (coeff.signal[g.currMouseDate + coeff.n * i] > 0)
                  return g.Scolor(coeff.signal[g.currMouseDate + coeff.n * i]);
              return "none";
          });

      g.lastMouseDate = g.currMouseDate;
  }


  function brushed() {
      if (!sG.brush.empty()) {
          dom = sG.brush.extent();
          //     d3.select("#debug").html("<p>" + sG.x(dom[0]) + "</p>");

          sG.fade1.attr("width", sG.x(dom[0]));

          sG.fade2.attr("width", sG.width - sG.x(dom[1]))
              .attr("transform", "translate(" + sG.x(dom[1]) + "," + " -5)");;


          xlims = [Math.round(g.dateArrayScale(dom[0])), Math.round(g.dateArrayScale(dom[1]))];
      } else {
          xlims = [0, coeff.n - 1];
          sG.fade1.attr("width", 0);
          sG.fade2.attr("width", 0)
      }
      highlight();

  }

  function waviz(error, fiC, fiG) {


      graph = fiG;
      coeff = fiC;
      coeff.n = coeff.intervals.length;
      coeff.N = coeff.coeff.length;
      coeff.nScales = coeff.coeff[0].length;

      xlims = [0, coeff.n - 1];

      g.Sminmaxmean = [d3.min(coeff.signal), 0, d3.max(coeff.signal)];
      g.Sminmaxmean[1] = (g.Sminmaxmean[0] + g.Sminmaxmean[2]) / 2;


      //now, update color scale
      g.Scolor.domain(g.Sminmaxmean);

      coeff.maxC = 0;
      coeff.meanWCoeff = [];
      coeff.maxWCoeff = [];
      coeff.normalized_coeff = [];
      coeff.coeff.forEach(function(d, i) {
          coeff.meanWCoeff[i] = d3.mean(d);
          coeff.maxWCoeff[i] = d3.max(d);
          coeff.maxC = Math.max(coeff.maxC, d3.max(d))
      });

      coeff.maxWCol = [];
      for (var j = 0; j < coeff.nScales; j++)
          coeff.maxWCol[j] = -1;
      for (var i = 0; i < coeff.N; i++) {
          for (var j = 0; j < coeff.nScales; j++) {
              coeff.maxWCol[j] = Math.max(coeff.coeff[i][j], coeff.maxWCol[j]);
          }
      }

      //   var projection = d3.geo.albersUsa();
      //   
      //   g.bounds = [
      //     projection([graph.nodes[0].y, graph.nodes[0].x]),
      //     projection([graph.nodes[0].y, graph.nodes[0].x])
      //   ];

      g.bounds = [
          [graph.nodes[0].x, graph.nodes[0].y],
          [graph.nodes[0].x, graph.nodes[0].y]
      ];
      graph.nodes.forEach(function(d) {
          //     pr = projection([d.y, d.x]);
          //     d.x = pr[0];
          //     d.y = pr[1];
          g.bounds[0][0] = Math.min(g.bounds[0][0], d.x);
          g.bounds[0][1] = Math.min(g.bounds[0][1], d.y);
          g.bounds[1][0] = Math.max(g.bounds[1][0], d.x);
          g.bounds[1][1] = Math.max(g.bounds[1][1], d.y);
      });

      graph.links.forEach(function(d) {
          d.source = graph.nodes[d.source];
          d.target = graph.nodes[d.target];
      });



      //   console.log(g.bounds)



      var format = d3.time.format("%m/%d/%Y %H:%M");
      coeff.intervals.forEach(function(d, ti) {
          coeff.intervals[ti] = format.parse(d);
          //     console.log(coeff.intervals[ti] + " " + d)
      });
      g.dateArrayScale = d3.time.scale().domain(coeff.intervals);
      g.dt = (coeff.intervals[1] - coeff.intervals[0]) / 1000;


      //   console.log(coeff.intervals)

      streamgraphchart();
      refreshClusters();
      graphchart(graph);
      graphschart(graph)
      makeSlider();

      spinner.stop();


  }



  function streamgraphchart() {

      sG.margin = {
          top: 20,
          right: 40,
          bottom: 50,
          left: 40
      };

      sG.width = document.getElementById('streamgraph-chart').offsetWidth - sG.margin.left - sG.margin.right;
      sG.contextheight = 5;
      sG.height = 400 - sG.contextheight - sG.margin.top - sG.margin.bottom;


      sG.x = d3.time.scale()
          .range([0, sG.width]);

      sG.y = d3.scale.linear()
          .range([sG.height - 10 - sG.contextheight, 0]);

      sG.xAxis = d3.svg.axis()
          .scale(sG.x)
          .orient("bottom")
          .ticks(g.tick);

      sG.yAxis = d3.svg.axis()
          //.tickFormat("")
          .scale(sG.y);

      sG.yAxisr = d3.svg.axis()
          .scale(sG.y);

      sG.brush = d3.svg.brush()
          .x(sG.x)
          .on("brush", brushed);


      sG.stack = d3.layout.stack() //y0 for each time cluster is calculated here!!
          .offset("silhouette")
          .order("inside-out")
          .values(function(d) {
              return d.values; // values must be an array with all clusters per each d (each time)
          })
          .x(function(d) {
              return d.date;
          })
          .y(function(d) {
              return d.value;
          });

      sG.nest = d3.nest() //reusable object to aggroup per key, values is the array with the aggrouped values
          .key(function(d) {
              return d.key;
          });

      sG.area = d3.svg.area()
          .interpolate("cardinal")
          .x(function(d) {
              return sG.x(d.date); // x is a time scale, here we are interpolating
          })
          .y0(function(d) {
              return sG.y(d.y0); // y is a scale, here we are interpolating
          })
          .y1(function(d) {
              return sG.y(d.y0 + d.y); // y is a scale, here we are interpolating
          });



  }

  function visualize_strgraph() {

      d3.select("#streamgraph-chart").selectAll("*").remove();

      sG.svg = d3.select("#streamgraph-chart").append("svg")
          .attr("width", sG.width + sG.margin.left + sG.margin.right)
          .attr("height", sG.height + sG.margin.top + sG.margin.bottom)
          .append("g")
          .attr("transform", "translate(" + sG.margin.left + "," + sG.margin.top + ")");

      var mouseclicked = false;
      var mouseoverlayer = false;

      fdata = data.filter(function(d) {
          return g.selectedClases[d.key];
      });

      var layers = sG.stack(sG.nest.entries(fdata));

      sG.x.domain(d3.extent(coeff.intervals));
      sG.y.domain([0, d3.max(fdata, function(d) { //sets y domain to extent (max min) of all dates
          return d.y0 + d.y;
      })]);


      sG.svg.selectAll(".layer")
          .data(layers)
          .enter().append("path")
          .attr("class", "layer")
          .attr("d", function(d) {
              return sG.area(d.values);
          })
          .style("fill", function(d, i) {
              return g.ccolor[d.key];
          })
          .attr("stroke", "#333")
          .attr("stroke-width", "0.5px");

      sG.fade1 = sG.svg.append("rect")
          .attr("class", "brrecr")
          .attr("width", 0)
          .attr("height", sG.height + 5)
          .style("fill", "#333333")
          .style("opacity", .1)
          .style("pointer-events", "none")
          .attr("transform", "translate(0, -" + 5 + ")");

      sG.fade2 = sG.svg.append("rect")
          .attr("class", "brrecr")
          .attr("width", 0)
          .attr("height", sG.height + 5)
          .style("fill", "#333333")
          .style("opacity", .1)
          .style("pointer-events", "none")
          .attr("transform", "translate(0, -" + 5 + ")");


      sG.context = sG.svg.append("g")
          .attr("class", "context")
          .attr("transform", "translate(" + 0 + "," + (sG.height - sG.contextheight) + ")");

      sG.context.append("g")
          .attr("class", "x brush")
          .call(sG.brush)
          .selectAll("rect")
          .attr("y", -7)
          .attr("height", sG.contextheight + 7)
          .attr("fill", "none");



      sG.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + sG.height + ")")
          .call(sG.xAxis)
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", function(d) {
              return "rotate(-65)"
          });

      sG.svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + sG.width + ", 0)")
          .call(sG.yAxis.orient("right"));

      sG.svg.append("g")
          .attr("class", "y axis")
          .call(sG.yAxis.orient("left"));

      sG.svg.selectAll(".layer")
          .attr("opacity", 1)
          .on("mouseover", function(d, i) {
              mouseOverLayer(this, d, d.key);
          })
          .on("mousemove", function(d, i) {
              mouseMoveLayer(this, d, d.key);
          })
          .on("mouseout", function(d, i) {
              mouseOutLayer(this, d, d.key);
          })
          .on("mousedown", function(d, i) {
              mouseDownLayer(this, d, d.key)
          });

      //       d3.select(".remove").remove();
      sG.vertical = d3.select("#streamgraph-chart")
          .append("div")
          .attr("class", "remove")
          .style("position", "absolute")
          .style("z-index", "19")
          .style("width", "1px")
          .style("height", sG.height)
          .style("top", "10px")
          .style("bottom", "30px")
          .style("left", "0px")
          .style("background", "#000");

      d3.select("#streamgraph-chart")
          .on("mousemove", function() {
              updateMouse(this);
          })
          .on("mouseover", function() {
              updateMouse(this);
          });

      d3.select('body')
          .call(d3.keybinding()
              .on('→', moveCursor(1))
              .on('←', moveCursor(-1))
              .on('space', disableEvents())
              .on('p', disableEvents())
              //       .on(space, function() {g.currMouseDate = Math.min(coeff.n-1, g.currMouseDate +1);})
          );

      function mouseOverLayer(element, d, i) {
          sG.svg.selectAll(".layer").transition()
              .duration(250)
              .attr("opacity", function(d, j) {
                  return j != i ? 0.6 : 1;
              })
              //  console.log(i)
              //       for(j=0; j<g.nClusters;j++){
              //  
              //  if (i!=j){
              //    pt.svg.selectAll(".bar" + j).transition()
              //      .duration(250)
              //      .attr("opacity", .2)
              //  }
              //       }
          g.currHi = i;
          highlight();
          mouseoverlayer = true;
      }

      function mouseMoveLayer(element, d, i) {
          d3.select(element)
              .classed("hover", true)
              .attr("stroke", g.strokecolor)
              .attr("stroke-width", "0.5px");
          g.currHi = i;
          if (g.lastHi != g.currHi || g.lastMouseDate != g.currMouseDate)
              highlight();

      }

      function mouseOutLayer(element, d, i) {
          sG.svg.selectAll(".layer")
              .transition()
              .duration(250)
              .attr("opacity", "1");

          //  for(j=0; j<g.nClusters;j++){
          //  
          //       
          //    pt.svg.selectAll(".bar" + j).transition()
          //      .duration(250)
          //      .attr("opacity", 1)
          //       }

          d3.select(element)
              .classed("hover", false)
              .attr("stroke", "#333")
              .attr("stroke-width", "0.5px");
          mouseoverlayer = false;
          g.lastMouseDate = -1;
      }

      function mouseDownLayer(element, d, i) {
          mouseclicked = true;
          g.currMouseDate = -1;
          highlight();
      }

      function updateMouse(element) {
          mousex = d3.mouse(element);
          mousex = mousex[0] + 5;
          sG.vertical.style("left", mousex + "px")
          mousex = d3.mouse(element)[0] - sG.margin.left;
          mousedate = Math.round(g.dateArrayScale(sG.x.invert(mousex)));
          g.currMouseDate = mousedate;
          //     console.log("here " + g.clickedI )
          if ((g.clickedI != -1) && (g.lastMouseDate != g.currMouseDate)) {
              visualizeVertexInfo();
          }
          if (!mouseoverlayer && g.lastMouseDate != g.currMouseDate) {
              highlightAll();
          }
      }



      function disableEvents() {
          return function(event) {

              event.preventDefault();
              if (!g.paused) {
                  d3.select("#streamgraph-chart")
                      .on("mousemove", null)
                      .on("mouseover", null);
                  sG.svg.selectAll(".layer")
                      .on("mouseover", null)
                      .on("mousemove", null)
                      .on("mouseout", null)
                      .on("mousedown", null);
                  g.paused = true;
              } else {
                  d3.select("#streamgraph-chart")
                      .on("mousemove", function() {
                          updateMouse(this);
                      })
                      .on("mouseover", function() {
                          updateMouse(this);
                      })
                  sG.svg.selectAll(".layer")
                      .on("mouseover", function(d, i) {
                          mouseOverLayer(this, d, i);
                      })
                      .on("mousemove", function(d, i) {
                          mouseMoveLayer(this, d, i);
                      })
                      .on("mouseout", function(d, i) {
                          mouseOutLayer(this, d, i);
                      })
                      .on("mousedown", function(d, i) {
                          mouseDownLayer(this, d, i)
                      });
                  g.paused = false;
              }

          }
      }

      function moveCursor(dcursor) {
          return function(event) {
              event.preventDefault();
              g.currMouseDate = Math.max(Math.min(coeff.n - 1, g.currMouseDate + dcursor), 0);
              vertx = sG.x(g.dateArrayScale.invert(g.currMouseDate)) + sG.margin.left + 10;
              sG.vertical.style("left", vertx + "px");
              if (g.lastMouseDate != g.currMouseDate) {

                  currTime = d3.time.format('%a %b %e %H:%M')(coeff.intervals[g.currMouseDate]);
                  nextTime = d3.time.format('%H:%M')(d3.time.second.offset(coeff.intervals[g.currMouseDate], g.dt));
                  console.log(currTime + ' - ' + nextTime)

                  if (!mouseoverlayer) {
                      highlightAll();
                  } else {
                      highlight();
                  }
                  if (g.clickedI != -1) {
                      visualizeVertexInfo();
                  }
              }

          }
      }

  }

  function makeSlider() {


      sld = {};
      var margin = {
          top: 5,
          right: 10,
          bottom: 10,
          left: 10
      };
      sld.width = .95 * document.getElementById('streamgraph-slider').offsetWidth - margin.left - margin.right;
      sld.height = 50 - margin.bottom - margin.top;

      sld.x = d3.scale.linear()
          .domain([0, coeff.maxC])
          .range([0, sld.width])
          .clamp(true);

      sld.brush = d3.svg.brush()
          .x(sld.x)
          .extent([0, 0])
          .on("brush", brushed);

      sld.svg = d3.select("#streamgraph-slider").append("svg")
          .attr("width", sld.width + margin.left + margin.right)
          .attr("height", sld.height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      sld.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + sld.height / 2 + ")")
          .call(d3.svg.axis()
              .scale(sld.x)
              .orient("bottom")
              .tickFormat(function(d) {
                  return d;
              })
              .tickSize(0)
              .tickPadding(12))
          .select(".domain")
          .attr("class", "ndomain")
          .select(function() {
              return this.parentNode.appendChild(this.cloneNode(true));
          })
          .attr("class", "halo");

      sld.slider = sld.svg.append("g")
          .attr("class", "slider")
          .call(sld.brush);

      sld.slider.selectAll(".extent,.resize")
          .remove();

      sld.slider.select(".background")
          .attr("height", sld.height);

      sld.handle = sld.slider.append("circle")
          .attr("class", "handle")
          .attr("transform", "translate(0," + sld.height / 2 + ")")
          .attr("r", 9);

      sld.slider
          .call(sld.brush.event)
          .call(sld.brush.extent([coeff.maxC / 4, coeff.maxC / 4]))
          .call(sld.brush.event);

      function brushed() {
          var value = sld.brush.extent()[0];

          if (d3.event.sourceEvent) { // not a programmatic event
              value = sld.x.invert(d3.mouse(this)[0]);
              sld.brush.extent([value, value]);
          }

          sld.handle.attr("cx", sld.x(value));
          g.Wthres = value;
          associateClass2Nodes();
          visualize_strgraph(data);

          g.lastMouseDate = -1;

      }
  }


  function graphchart(graph) {
      gr = {};

      var margin = {
          top: 2,
          right: 2,
          bottom: 2,
          left: 2
      };

      gr.width = document.getElementById('graph-chart').offsetWidth;
      gr.height = 600,

          gr.dx = g.bounds[1][0] - g.bounds[0][0],
          gr.dy = g.bounds[1][1] - g.bounds[0][1],
          gr.cx = (g.bounds[0][0] + g.bounds[1][0]) / 2,
          gr.cy = (g.bounds[0][1] + g.bounds[1][1]) / 2,
          gr.scale = Math.max(gr.dx / gr.width, gr.dy / gr.height),
          gr.translate = [gr.width / 2 - gr.scale * gr.cx, gr.height / 2 - gr.scale * gr.cy];

      var zoom = d3.behavior.zoom()
          .on("zoom", zoomed);

      gr.svg = d3.select("#graph-chart")
          .append("svg")
          .attr("width", gr.width + margin.left + margin.right)
          .attr("height", gr.height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
          .call(zoom);

      var rect = gr.svg.append("rect")
          .attr("width", gr.width)
          .attr("height", gr.height)
          .style("fill", "#333");

      g.containerg = gr.svg.append("g");

      var link = g.containerg.append("g")
          .attr("class", "link")
          .selectAll("line")
          .data(graph.links)
          .enter().append("line")
          .attr("x1", function(d) {
              return d.source.x;
          })
          .attr("y1", function(d) {
              return d.source.y;
          })
          .attr("x2", function(d) {
              return d.target.x;
          })
          .attr("y2", function(d) {
              return d.target.y;
          })
          .attr("stroke", "#999")
          .attr("stroke-width", g.lineStroke);


      gr.node = g.containerg.append("g")
          .attr("class", "node")
          .selectAll("circle")
          .data(graph.nodes)
          .enter().append("circle")
          .attr("class", "gnode")
          .attr("r", g.nodeSize)
          .attr("cx", function(d) {
              return d.x;
          })
          .attr("cy", function(d) {
              return d.y;
          })
          .style("visibility", "hidden");

      gr.svg.call(zoom.translate(gr.translate).scale(gr.scale).event);

      function zoomed() {
          g.containerg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
          if (g.containers) g.containers.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      }


      makeLegend();

      function makeLegend() {
          var legendRectSize = 15;
          var legendSpacing = 4;
          var legendRectWidth = 50;

          var legend = gr.svg.selectAll('.legend')
              .data(g.lValue)
              .enter()
              .append('g')
              .attr('class', 'legend')
              .attr('transform', function(d, i) {
                  var height = legendRectSize;
                  var offset = legendRectWidth * g.nClusters / 2;
                  var horz = -2 * i * legendRectWidth;
                  var vert = gr.height - height - 10;
                  return 'translate(' + (horz + gr.width - 80) + ',' + vert + ')';
              });

          legend.append('rect')
              .attr('width', legendRectSize)
              .attr('height', legendRectSize)
              .style('fill', function(d, i) {
                  return g.ccolor[i]
              })
              .style('stroke', '#aaa');

          legend.append('text')
              .attr('x', legendRectSize + legendSpacing)
              .attr('y', legendRectSize - legendSpacing)
              .text(function(d) {
                  return d;
              })
              .attr('fill', '#ccc')
              .style("font-size", "14px");

          d3.selectAll(".gnode")
              .on("mouseover", function(d, i) {
                  //       console.log(d.class[g.currMouseDate])
                  //       pointer.pointTo(g.ccolor[d.class[g.currMouseDate]])
                  d3.select(this).attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
                  d3.select(grs.node[0][i])
                      .attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
              })
              .on("mouseout", function(d, i) {
                  if (g.clickedI != i) {
                      d3.select(this)
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                      d3.select(grs.node[0][i])
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                  }
              })
              .on("mousedown", function(d, i) {
                  //  console.log("clck " +g.clickedI + " i:" + i)

                  if (g.clickedI != i) {
                      d3.select(gr.node[0][g.clickedI])
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                      d3.select(grs.node[0][g.clickedI])
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                  }
                  d3.select(this).attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
                  d3.select(grs.node[0][i])
                      .attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
                  g.clickedI = i;
                  visualizeVertexInfo();
              });


      }

      //makeColorBar();

      function makeColorBar() {
          colorbar = Colorbar()
              .origin([gr.width - 200 - 20, gr.height - 35])
              .thickness(4)
              .scale(g.color).barlength(200).thickness(7)
              .orient("horizontal")

          cbar = gr.svg.append("g").attr("id", "colorbarg")

          pointer = d3.selectAll("#colorbarg").call(colorbar)


          d3.selectAll(".gnode")
              .on("mouseover", function(d, i) {
                  //       console.log(d.class[g.currMouseDate])
                  //       pointer.pointTo(g.ccolor[d.class[g.currMouseDate]])
                  d3.select(this).attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
                  d3.select(grs.node[0][i])
                      .attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
              })
              .on("mouseout", function(d, i) {
                  if (g.clickedI != i) {
                      d3.select(this)
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                      d3.select(grs.node[0][i])
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                  }
              })
              .on("mousedown", function(d, i) {
                  //  console.log("clck " +g.clickedI + " i:" + i)

                  if (g.clickedI != i) {
                      d3.select(gr.node[0][g.clickedI])
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                      d3.select(grs.node[0][g.clickedI])
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                  }
                  d3.select(this).attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
                  d3.select(grs.node[0][i])
                      .attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
                  g.clickedI = i;
                  visualizeVertexInfo();
              });


      }

  }

  grs = {};

  function graphschart(graph) {


      var margin = {
          top: 2,
          right: 2,
          bottom: 2,
          left: 2
      };

      grs.width = document.getElementById('graph-chart-signal').offsetWidth;
      grs.height = 600,

          grs.dx = g.bounds[1][0] - g.bounds[0][0],
          grs.dy = g.bounds[1][1] - g.bounds[0][1],
          grs.cx = (g.bounds[0][0] + g.bounds[1][0]) / 2,
          grs.cy = (g.bounds[0][1] + g.bounds[1][1]) / 2,
          grs.scale = .9 / Math.max(grs.dx / grs.width, grs.dy / grs.height),
          grs.translate = [grs.width / 2 - grs.scale * grs.cx, grs.height / 2 - grs.scale * grs.cy];

      var zoom = d3.behavior.zoom()
          .on("zoom", zoomed);

      grs.svg = d3.select("#graph-chart-signal")
          .append("svg")
          .attr("width", grs.width + margin.left + margin.right)
          .attr("height", grs.height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
          .call(zoom);

      var rect = grs.svg.append("rect")
          .attr("width", grs.width)
          .attr("height", grs.height)
          .style("fill", "#333");

      g.containers = grs.svg.append("g");

      var link = g.containers.append("g")
          .attr("class", "link")
          .selectAll("line")
          .data(graph.links)
          .enter().append("line")
          .attr("x1", function(d) {
              return d.source.x;
          })
          .attr("y1", function(d) {
              return d.source.y;
          })
          .attr("x2", function(d) {
              return d.target.x;
          })
          .attr("y2", function(d) {
              return d.target.y;
          })
          .attr("stroke", "#999")
          .attr("stroke-width", g.lineStroke);


      grs.node = g.containers.append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(graph.nodes)
          .enter().append("circle")
          .attr("class", "gsignal")
          .attr("r", g.nodeSize)
          .attr("cx", function(d) {
              return d.x;
          })
          .attr("cy", function(d) {
              return d.y;
          })
          .style("visibility", "hidden");

      grs.svg.call(zoom.translate(grs.translate).scale(grs.scale).event);

      function zoomed() {
          g.containers.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
          g.containerg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      }
      makeColorBar();

      function makeColorBar() {
          colorbar = Colorbar()
              .origin([grs.width - 200 - 20, grs.height - 35])
              .thickness(4)
              .scale(g.Scolor).barlength(200).thickness(7)
              .orient("horizontal")

          cbar = grs.svg.append("g").attr("id", "colorbar")

          pointer = d3.selectAll("#colorbar").call(colorbar)

          d3.selectAll(".gsignal")
              .on("mouseover", function(d, i) {
                  pointer.pointTo(coeff.signal[g.currMouseDate + coeff.n * i])
                  d3.select(this).attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
                  d3.select(gr.node[0][i])
                      .attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
              })
              .on("mouseout", function(d, i) {
                  if (g.clickedI != i) {
                      d3.select(this)
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                      d3.select(gr.node[0][i])
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                  }
              })
              .on("mousedown", function(d, i) {
                  //  console.log("clck " +g.clickedI + " i:" +  i)

                  if (g.clickedI != i) {
                      d3.select(grs.node[0][g.clickedI])
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                      d3.select(gr.node[0][g.clickedI])
                          .attr("r", g.nodeSize)
                          .style("stroke-width", 0)
                  }
                  d3.select(this)
                      .attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
                  d3.select(gr.node[0][i])
                      .attr("r", g.nodeSizeBig)
                      .style("stroke", "#fff")
                      .style("stroke-width", 2)
                  g.clickedI = i;
                  visualizeVertexInfo();
              });
      }

  }


  pt = {};

  function visualizePatterns() {

      d3.select("#patterns").selectAll("*").remove();

      pt.margin = {
          top: 2,
          right: 2,
          bottom: 2,
          left: 2
      };

      pt.patternHeight = 100;

      pt.patternWidth = 0;
      var maxY = d3.max(g.wmeanbycluster, function(array) {
          return d3.max(array);
      });


      pt.y = d3.scale.linear()
          .domain([0, 1])
          .range([pt.patternHeight, 0]);


      for (var k = 0; k < g.nClusters; k++) {
          var wrapper = d3.select("#patterns")
              .append("div")
              .attr("class", "col-sm-2")
              .append("div")
              .attr("class", "chart-stage")
              .append("div")
              .attr("id", "patt" + k);


          createPatternBar(wrapper, k)
      }

      function createPatternBar(wrapper, k) {

          pt.patternWidth = .9 * document.getElementById('patt' + k).offsetWidth;

          pt.x = d3.scale.ordinal()
              .domain(d3.range(coeff.nScales))
              .rangeRoundBands([0, pt.patternWidth], .1);

          pt.xAxis = d3.svg.axis()
              .scale(pt.x)
              .orient("bottom");




          wrapper.append('foreignObject')
              .append("xhtml:body")
              .html("<label><input type='checkbox' id = 'check" + k + "' checked></input> " + g.lValue[k] + "</label>")
              .on("click", function(d, i) {
                  g.selectedClases[k] = document.getElementById("check" + k).checked;
                  document.getElementById("check" + k).blur();
                  visualize_strgraph();
              });



          pt.svg = wrapper.append('svg')
              .attr("width", pt.patternWidth)
              .attr("height", pt.patternHeight);

          pt.svg
              .append("line")
              .attr("x1", 0)
              .attr("x2", pt.patternWidth)
              .attr("y1", pt.patternHeight)
              .attr("y2", pt.patternHeight)
              .attr("stroke-width", 2)
              .attr("stroke", "#aaa");

          // Select all bars and bind data:  
          var bar = pt.svg.selectAll("g")
              .data(g.wmeanbycluster[k])
              .enter().append("rect")
              .attr("class", "bar" + k)
              .attr("x", function(d, i) {
                  return pt.x(i);
              })
              .attr("y", function(d) {
                  return pt.y(d);
              })
              .attr("height", function(d) {
                  return pt.patternHeight - 2 - pt.y(d);
              })
              .attr("width", pt.x.rangeBand())
              .attr("fill", g.ccolor[k]);

      }
  }

  function visualizeVertexInfo() {
      dpt = {};

      d3.select("#vertex-info").selectAll("*").remove();

      dpt.margin = {
          top: 10,
          right: 20,
          bottom: 60,
          left: 50
      };

      dpt.patternHeight = 150 - dpt.margin.top - dpt.margin.bottom;


      var wrapper = d3.select("#vertex-info")
          .append("div")
          .attr("class", "col-sm-3")
          .attr("id", "vfeature");
      dpt.patternWidth = .7 * document.getElementById('vfeature').offsetWidth;

      wrapper.append('p')
          .text("Vertex " + g.clickedI)
          .attr('class', 'legend');

      dpt.svg = wrapper.append('svg')
          .attr("width", dpt.patternWidth)
          .attr("height", dpt.patternHeight)
          //     .attr("transform", "translate(0,10)");

      var x = d3.scale.ordinal()
          .domain(d3.range(coeff.nScales))
          .rangeRoundBands([0, dpt.patternWidth], .1);

      var y = d3.scale.linear()
          .domain([0, 1])
          .range([dpt.patternHeight, 0]);

      dpt.svg
          .append("line")
          .attr("x1", 0)
          .attr("x2", dpt.patternWidth)
          .attr("y1", dpt.patternHeight)
          .attr("y2", dpt.patternHeight)
          .attr("stroke-width", 2)
          .attr("stroke", "#aaa");

      dpt.currk = graph.nodes[g.clickedI]["class"][g.currMouseDate];
      dpt.currval = coeff.signal[g.currMouseDate + coeff.n * g.clickedI]

      // Select all bars and bind data:  
      var bar = dpt.svg.selectAll("g")
          .data(coeff.coeff[g.currMouseDate + coeff.n * g.clickedI])
          .enter().append("rect")
          .attr("class", "barclicked" + g.clickedI)
          .attr("x", function(d, i) {
              return x(i);
          })
          .attr("y", function(d) {
              return y(d);
          })
          .attr("height", function(d) {
              return dpt.patternHeight - y(d) - 2;
          })
          .attr("width", x.rangeBand())
          .attr("fill", function() {
              if (dpt.currk >= 0 && dpt.currk < g.nClusters)
                  return g.ccolor[dpt.currk];
              return "none";
          });



      var wrapper = d3.select("#vertex-info")
          .append("div")
          .attr("class", "col-sm-9")
          .append("div")
          .attr("class", "chart-stage")
          .append("div")
          .attr("id", "vsignal");

      currTime = d3.time.format('%a %b %e %H:%M')(coeff.intervals[g.currMouseDate]);
      nextTime = d3.time.format('%H:%M')(d3.time.second.offset(coeff.intervals[g.currMouseDate], g.dt));

      wrapper.append('p')
          .text("Vertex signal at " + currTime + " - " + nextTime + ": " + dpt.currval)
          .attr('class', 'legend');

      dpt.signalWidth = document.getElementById('vsignal').offsetWidth - dpt.margin.left - dpt.margin.right - 20;

      dpt.svg = wrapper.append('div').attr('class', 'chart-stage').append('svg')
          .attr("width", dpt.signalWidth + dpt.margin.left + dpt.margin.right)
          .attr("height", dpt.patternHeight + dpt.margin.top + dpt.margin.bottom)
          .append("g")
          .attr("transform", "translate(" + dpt.margin.left + "," + dpt.margin.top + ")");

      var x = d3.time.scale()
          .range([0, dpt.signalWidth]);

      var y = d3.scale.linear()
          .domain([0, g.Sminmaxmean[2]])
          .range([dpt.patternHeight - 5, +10]);

      dpt.xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .ticks(g.tick);

      dpt.yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(5);

      x.domain(d3.extent(coeff.intervals));

      var currentsignal = [];
      coeff.intervals.forEach(function(d, i) {
          currentsignal.push({
              date: d,
              value: coeff.signal[i + coeff.n * g.clickedI]
          });
      });


      var line = d3.svg.line()
          .x(function(d) {
              return x(d.date);
          })
          .y(function(d) {
              return y(d.value);
          });


      dpt.svg.append("g")
          .attr("class", "x saxis")
          .attr("transform", "translate(0," + dpt.patternHeight + ")")
          .call(dpt.xAxis)
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", function(d) {
              return "rotate(-65)"
          });

      dpt.svg.append("g")
          .attr("class", "y saxis")
          .call(dpt.yAxis);

      //     dpt.svg.append("path")
      //       .datum(currentsignal)
      //       .attr("class", "line")
      //       .attr("d", line)
      //       .attr("fill", "none")
      //       .attr("stroke", "#aaa")
      //       .attr("stroke-width", 1.7);

      dpt.svg.append("path")
          .datum(currentsignal)
          .attr("class", "linegrad")
          .attr("d", line)

      //       .attr("stroke", function() {  
      //  if (dpt.currk >= 0 && dpt.currk < g.nClusters)
      //    return g.ccolor[dpt.currk];
      //  return "#aaa";
      //       })
      //       .attr("stroke-width", 1.5)
      //       .style("opacity", .8);



      var currentsignalcolor = [];
      coeff.intervals.forEach(function(d, i) {
          tmp = 100 * i / (coeff.n - 1);
          //  tmp = x(coeff.intervals[i]);
          tmpck = graph.nodes[g.clickedI]["class"][i];
          tmpcol = (tmpck >= 0 && tmpck < g.nClusters) ? shadeColor2(g.ccolor[tmpck], -.2) : "#aaa";
          currentsignalcolor.push({
              offset: tmp + '%',
              color: tmpcol
          });
      });


      dpt.svg.append("linearGradient")
          .attr("id", "line-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", x(coeff.intervals[0])).attr("y1", y(0))
          .attr("x2", x(coeff.intervals[coeff.n - 1])).attr("y2", y(0))
          .selectAll("stop")
          .data(currentsignalcolor)
          .enter().append("stop")
          .attr("offset", function(d) {
              return d.offset;
          })
          .attr("stop-color", function(d) {
              return d.color;
          });

      dpt.svg
          .append("line")
          .attr("x1", x(coeff.intervals[g.currMouseDate]))
          .attr("x2", x(coeff.intervals[g.currMouseDate]))
          .attr("y1", -dpt.margin.bottom)
          .attr("y2", dpt.patternHeight)
          .attr("stroke-width", 2)
          .attr("stroke", "#777")
          .attr("stroke-dasharray", "5,5")
          .style("opacity", .8);

  }


  function shadeColor2(color, percent) {
      var f = parseInt(color.slice(1), 16),
          t = percent < 0 ? 0 : 255,
          p = percent < 0 ? percent * -1 : percent,
          R = f >> 16,
          G = f >> 8 & 0x00FF,
          B = f & 0x0000FF;
      return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
  }
