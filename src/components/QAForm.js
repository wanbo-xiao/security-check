import React from "react";

import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import selects from "../data/selects";
import '../style/qaform.scss';

class QAForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: props.answers,
        }
    }

    updateAnswer(name, event) {
        this.setState({
            "answers": {...this.state.answers, [name]: event.target.value}
        });
        this.props.updateAnswers(this.props.questionIndex, name, event.target.value)
    }

    render() {
        const createSelects = (selects) => {
            return selects.map((select) => {
                return (
                    <Grid item key={1} xs={4}>
                        <FormControlLabel
                            control={
                                <Select className="select-class" key={this.state.answers[select.name]} value={this.state.answers[select.name]}
                                        onChange={(e) => this.updateAnswer(select.name, e)}>
                                    {select.options.map((option) => {
                                        return <MenuItem key={option.name}
                                                         value={option.score}>{option.name}</MenuItem>;
                                    })}
                                </Select>
                            }
                            labelPlacement="top"
                            label={select.name}
                            className="select-label-class"
                        />
                    </Grid>
                )
            });
        }

        return (
            <div id="qa-form-id">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>{this.props.questionText} </h1>
                    </Grid>
                    {createSelects(selects)}
                </Grid>
            </div>

        )
    }
}

export default QAForm;
