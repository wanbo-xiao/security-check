import React from 'react';
import Grid from "@material-ui/core/Grid";
import Sidebar from "../components/Sidebar";
import QAForm from "../components/QAForm";

import answers from "../data/answers";

class SubmitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionIndex: "",
            questionText: "",
            allQuestionAnswers: answers,
            currentQuestionAnswers: {},
        }
    }

    updateQuestion(questionIndex, questionText) {
        this.setState({
            questionIndex: questionIndex,
            questionText: questionText,
            currentQuestionAnswers: this.state.allQuestionAnswers.filter(
                item => item.questionIndex === questionIndex
            )[0]
        });
    }

    updateAnswers(questionIndex, selectName, score) {
        this.setState({
            allQuestionAnswers: this.state.allQuestionAnswers.map(item => {
                if (item.questionIndex === questionIndex) {
                    return {...item, answerScores: {...item.answerScores, [selectName]: score}}
                } else {
                    return item;
                }
            }),
        });
    }


    onSubmit() {
        this.props.history.push({
            pathname: "/dashboard",
            state: {allQuestionAnswers: this.state.allQuestionAnswers}
        });
    }


    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Sidebar updateQuestion={this.updateQuestion.bind(this)} onSubmit={this.onSubmit.bind(this)}/>
                    </Grid>
                    <Grid item xs={9}>
                        {this.state.questionIndex &&
                        <QAForm
                            key={this.state.questionIndex}
                            questionText={this.state.questionText}
                            questionIndex={this.state.questionIndex}
                            answers={this.state.currentQuestionAnswers.answerScores}
                            updateAnswers={this.updateAnswers.bind(this)}
                        />
                        }
                        {!this.state.questionIndex && <h3>Please select the questions from right (All answers have been prefill for a quick demo)</h3>}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default SubmitPage;
