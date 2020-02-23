import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MobileStepper from '@material-ui/core/MobileStepper';

import queryString from 'query-string';
import AddMember from '../Components/AddMember';


class OneTimeMeetingPage extends Component {

    state = {
        circularProgress: false,
        members: [{ name: "", location: "" }],
        searchDialog: false,
        addr: '',
        results: [],
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }


    handleChange = (e) => {
        this.setState({
            addr: e.target.value,
        });
    }

    handleAddMember = () => {
        this.setState({
            members: this.state.members.concat([{ name: "", location: "" }])
        });
    }


    componentDidMount() {
        const { location: { search } } = this.props;
        if (search.length > 0) {
            const parsedQuery = queryString.parse(search);
            if (!parsedQuery.name) return;
            const name = parsedQuery.name.split(',');
            const place = parsedQuery.place.split('.');
            const x = parsedQuery.x.split(',');
            const y = parsedQuery.y.splict(',');

            const arrLen = name.length;
            const pointArr = [];
            for (let i = 0; i < arrLen; i += 1) {
                const obj = {
                    name: name[i],
                    place_name: place[i],
                };
                pointArr.push(obj);
            }
            this.setState({
                members: pointArr,
            });

        }
    }

    goSpot = () => {
        const { history } = this.props;
        const { members } = this.state;
        if (members.length > 1) {
            const xs = members.map(v => v.x).reduce((p, v) => `${p},${v}`);
            const ys = members.map(v => v.y).reduce((p, v) => `${p},${v}`);
            const placeNames = members.map(v => (v.place_name ? v.place_name : v.address_name)).reduce((p, v) => `${p},${v}`);
            const names = members.map(v => v.name).reduce((p, v) => `${p},${v}`);
            history.push(`/spot?x=${xs}&y=${ys}&place=${placeNames}&name=${names}&count=2&category=0&select=0`);
        } else {
            alert('적어도 두명 이상의 멤버를 설정해주세요!');
        }
    }

    handleRemoveMember = idx => () => {
        this.setState({
            members: this.state.members.filter((s, sidx) => idx !== sidx)
        });
    }

    addList = (item) => {
        const { members } = this.state;
        this.setState({
            members: members.concat(item),
        });
    }



    render() {
        const { classes } = this.props;
        const { circularProgress, } = this.state;

        return (
            <Typography component="div">
                {
                    circularProgress && <Box className={classes.centerProgress}><CircularProgress color="primary" /></Box>
                }
                <Container fixed >
                    <div style={{ backgroundColor: "lightblue" }}>Decide Spot</div>
                    <div >
                        <MobileStepper
                            variant="dots"
                            steps={4}
                            position="static"
                            activeStep={0}
                            nextButton={
                                <Button size="small"  >
                                    Next
                                </Button>
                            }
                            backButton={
                                <Button size="small"   >
                                    Back
                                </Button>
                            }
                        />
                    </div>
                    <div>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <Paper elevation={0} >
                                    <Typography variant="h5" gutterBottom>
                                        멤버 & 출발지 등록
                            </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} >
                                <AddMember />
                            </Grid>
                            <div>
                                <Grid item xs={12}>
                                    <Button variant="outlined">
                                        내 그룹에서 찾기
                            </Button>

                                </Grid>
                            </div>
                        </Grid>
                    </div>
                    <Button variant="contained" color="primary" onClick={this.goSpot}>
                        중간 위치 찾기
                    </Button>
                </Container>
            </Typography>
        );
    }
}

export default OneTimeMeetingPage;