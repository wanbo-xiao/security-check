import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import questions from "../data/questions"
import selects from "../data/selects";


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
                    if (index == 0 && row[3] === option.score) {
                        row[3] = option.name
                    } else if (index == 1 && row[4] === option.score) {
                        row[4] = option.name
                    } else if (index == 2 && row[5] === option.score) {
                        row[5] = option.name
                    }
                })
            });

        });

        console.log(rows);
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


    render() {
        const rows = this.createTableRows(questions, selects, this.props.location.state.allQuestionAnswers)
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Clause</TableCell>
                            <TableCell align="right">Section</TableCell>
                            <TableCell align="right">Control Objective/Control</TableCell>
                            <TableCell align="right">Applicability</TableCell>
                            <TableCell align="right">Implementation Level</TableCell>
                            <TableCell align="right">Maturity of Control</TableCell>
                            <TableCell align="right">Score</TableCell>
                            <TableCell align="right">Values As Applicability</TableCell>
                            <TableCell align="right">Values As Implementation Level</TableCell>
                            <TableCell align="right">Values As Maturity of Control</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row[0] + row[1]}>
                                {
                                    row.map(item => (
                                        <TableCell align="right"> {item}</TableCell>
                                    ))
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default Dashboard;
