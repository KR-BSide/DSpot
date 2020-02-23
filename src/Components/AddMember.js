import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import {
  List, ListItem, ListItemText,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Divider from '@material-ui/core/Divider';

class AddMember extends React.Component {
  state = {
    addr: '',
    members: [{ name: "", location: "" }],
    searchDialog: false,
    results: [],
    name: '',
  }

  openSearchDialog = () => {
    this.setState({ searchDialog: true });

    console.log("handleClick open");
    console.log(this.state.searchDialog);
}


  addList = (item) => {
    const { members } = this.state;
    this.setState({
        members: members.concat(item),
    });
  }

  handleRemoveMember = idx => () => {
    this.setState({
        members: this.state.members.filter((s, sidx) => idx !== sidx)
    });
  }

  handleAddMember = () => {
    this.setState({
        members: this.state.members.concat([{ name: "", location: "" }])
    });
  }


  handleClose = () => {
    this.setState({ searchDialog: false });
}

  render() {
    const { circularProgress, members } = this.state;
    const { results, addr } = this.state;
    return (

      <div>
        {this.state.members.map((members, idx) => (
          <form className="addMemberform">
            <TextField id="memberlist-name" label="Name" variant="outlined"
              value={this.state.name}
              onChange={this.handleChange}
              name="name" />
            <TextField
              id="memberlist-departure"
              label="departure"
              variant="outlined"
              onClick={this.openSearchDialog} />
            <IconButton color="primary" aria-label="add">
              <RemoveCircleOutlineIcon onClick={this.handleRemoveMember(idx)} />
            </IconButton>

            <Dialog
              id="dialog"
              onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
              open={this.state.searchDialog}>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-end">
                <Grid item xs={12} >
                  <IconButton
                    aria-label="Directions"
                    onClick={this.handleMyPClick}>
                  </IconButton>
                </Grid>
                <Grid item xs={12} >
                  <InputBase
                    id="standard-search"
                    value={addr}
                    onChange={this.handleChange}
                    placeholder="어디서 출발하시나요?"
                    inputProps={{ 'aria-label': '어디서 출발하시나요?' }}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        this.handleBtnClick();
                      }
                    }}
                  />
                  <IconButton
                    id="searchBtn"
                    onClick={this.handleBtnClick}
                    color="primary"
                    aria-label="Search">
                    <SearchIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <List>
                  {results.map((value, i) => (
                    <ListItem
                      button
                      onClick={e => this.handleSearchResult(value, e)}
                      key={i.toString()}
                    >
                      <ListItemText
                        primary={value.place_name ? value.place_name : value.address_name}
                        secondary={(
                          <Typography
                            variant="body2"
                          >
                            {value.place_name && value.address_name}
                          </Typography>
                        )}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Dialog>
          </form>
        ))}
        <Grid item xs={12}><Divider /></Grid>
        <Grid item xs={12} onClick={this.handleAddMember}>
          <IconButton color="primary" aria-label="add" >
            <AddCircleOutlineRoundedIcon
              addList={item => this.addList(item)} memberLen={this.state.members.length + 1} />
          </IconButton>
        </Grid>
      </div>
    );
  }
}

export default AddMember;