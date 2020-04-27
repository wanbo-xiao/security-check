import React from 'react'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';

import questions from "../data/questions"

import '../style/sidebar.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openStatus: []
        }
    }

    toggle(index) {
        this.setState({
            openStatus: {
                ...this.state.openStatus,
                [index]: !this.state.openStatus[index]
            }
        });
    }

    render() {
        const createNestList = (questions) => {
            return questions.map((question) => {
                if (question.children) {
                    return (
                        <div key={question.index}>
                            <ListItem button onClick={() => this.toggle(question.index)}>
                                <ListItemText key={question.index}
                                              primary={question.index + " " + question.name}/>
                                {this.state.openStatus[question.index] ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse in={this.state.openStatus[question.index]} timeout="auto" unmountOnExit style={{paddingLeft: '16px'}}>
                                <List component="div" disablePadding>
                                    {createNestList(question.children)}
                                </List>
                            </Collapse>
                        </div>
                    )
                }
                return (
                    <ListItem button key={question.index} onClick={() => this.props.updateQuestion(question.index, question.name)} >
                        <ListItemText key={question.index} primary={question.index + " " + question.name}/>
                    </ListItem>
                )
            });
        }

        return (
            <div id="side-bar-id">
                <List component="nav"
                      aria-labelledby="nested-list-subheader"
                      subheader={
                          <ListSubheader component="div" id="nested-list-subheader">
                              Security Questions
                          </ListSubheader>
                      }
                      className="list-item"
                >
                    {createNestList(questions)}
                </List>
                <Button variant="contained" color="primary" onClick={this.props.onSubmit}>
                    Generate Report
                </Button>
            </div>
        )
    }
}

export default Sidebar;
