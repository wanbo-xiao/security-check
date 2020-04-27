import React from "react";
import ReactApexCharts from "react-apexcharts";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

class RadarChart extends React.Component {

    constructor(props) {
        super(props);
    }

    prepareApexChartsOptions(rows) {
        const chart = {
            series: [{
                name: 'ISO 27001 Maturity',
                data: [],
            }],
            options: {
                title: {
                    text: 'ISO 27001 Maturity',
                },
                xaxis: {
                    categories: []
                },
                yaxis: [{
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(2)
                        }
                    }
                }]
            },
        }
        rows.map((row) => {
            chart.series[0].data.push(row[6]);
            chart.options.xaxis.categories.push(row[0])
        })
        console.log(chart);
        return chart;
    }

    render() {
        const chart = this.prepareApexChartsOptions(this.props.rows)
        return (
            <Grid container key={1} spacing={3}>
                <Grid item xs={8}>
                    <ReactApexCharts options={chart.options} series={chart.series} type="radar" height={600}/>
                </Grid>
                <Grid item xs={4}>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Graph Data</TableCell>
                                    <TableCell align="left">Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.rows.map((row, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="left"> {row[0]}</TableCell>
                                                <TableCell align="right"> {parseFloat(row[6]).toFixed(2)}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        )
    }
}

export default RadarChart;
