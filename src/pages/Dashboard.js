import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import RadarChart from "../components/RadarChart";
import questions from "../data/questions"
import selects from "../data/selects";
import '../style/dashboard.scss';
import Grid from "@material-ui/core/Grid";


class Dashboard extends React.Component {


    createTableRows(questions, selects, answers) {
        let rows = [];


        let questionsArray = this.initRowsByQuestion(questions);
        questionsArray.map(questionItem => {
            let clause = questionItem.shift();
            rows.push(...questionItem);
            rows.push([clause[1] + " " + clause[2], "", ""]);
        })


        rows.map(row => {
            answers.map(answer => {
                if (row[1] === answer.questionIndex) {
                    row.push(...Object.values(answer.answerScores), 0, ...Object.values(answer.answerScores))
                    row[6] = row[7] * row[8] * row[9];
                }
            });

            selects.map((select, index) => {
                select.options.map(option => {
                    if (index === 0 && row[3] === option.score) {
                        row[3] = option.name
                    } else if (index === 1 && row[4] === option.score) {
                        row[4] = option.name
                    } else if (index === 2 && row[5] === option.score) {
                        row[5] = option.name
                    }
                })
            });
            row.push(...Array(10 - row.length).fill(null))
        });

        let sectionIndex = 0;
        let sectionGroup = [];
        let clauseGroup = [];
        rows.map((row, index) => {
            if (row[1] && row[6] === null) {
                if (sectionGroup.length) {
                    rows[sectionIndex][6] = this.calAverage(sectionGroup);
                    clauseGroup.push(rows[sectionIndex][6])
                }
                sectionIndex = index;
                sectionGroup = [];

            } else if (row[6] !== null) {
                sectionGroup.push(row[6])
            } else {
                rows[sectionIndex][6] = this.calAverage(sectionGroup);
                clauseGroup.push(rows[sectionIndex][6])
                row[6] = this.calAverage(clauseGroup);
                sectionIndex = index + 1;
                sectionGroup = [];
                clauseGroup = []
            }
        })
        return rows;

    }

    initRowsByQuestion(questions) {
        return questions.map(question => {
            if (question.children) {
                return [["", question.index, question.name]].concat(...this.initRowsByQuestion(question.children))
            } else {
                return [["", question.index, question.name]]
            }
        })
    }

    calAverage(arr) {
        const total = arr.reduce((a, b) => a + b, 0);
        return arr.length === 0 ? 0 : parseFloat(parseFloat(total / arr.length).toFixed(2));
    }

    render() {
        const rows = this.createTableRows(questions, selects, this.props.location.state.allQuestionAnswers);
        const rowsSummary = rows.filter(row => row[0])

        return (

            <div id="dashboard-id">
                <RadarChart rows={rowsSummary}></RadarChart>
                <h1>Raw table data</h1>
                <TableContainer component={Paper} id="raw-table-data-id">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Clause</TableCell>
                                <TableCell>Section</TableCell>
                                <TableCell>Control Objective/Control</TableCell>
                                <TableCell>Applicability</TableCell>
                                <TableCell>Implementation Level</TableCell>
                                <TableCell>Maturity of Control</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Values As Applicability</TableCell>
                                <TableCell>Values As Implementation Level</TableCell>
                                <TableCell>Values As Maturity of Control</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row[0] + row[1]} class={row[0] ? "clause-row" : (row[3] ? "question-row" : "section-row")}>
                                    {
                                        row.map((item, index) => (
                                            <TableCell key={index}> {item}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>

        )
            ;
    }
}

export default Dashboard;
