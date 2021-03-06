import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3F51B5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tablehead : {
    align:'center',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class ViewSales extends React.Component {

  componentDidMount(){
    var details = {
      'token':this.state.t,
      'cnic':this.state.c
  };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch('/emp/fetchsales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
      },
      body: formBody
    })
    .then(res=>res.json())
    .then(res=>{
      console.log("we are in this function");
      console.log(this.state.t);
      console.log(this.state.c)
      if(res){
       this.setState({
         data:res
       });
      };
    }
    );

  };

    
  

  constructor(props){
      super(props)
      this.state={
        data:{},
        t:this.props.token,
        c:this.props.cnic
      }

    };


  render() {
    const { classes } = this.props;
    return (
      <div>
      <Typography variant="display2"> Your Sales</Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead className={classes.tablehead}>
            <TableRow>
              <CustomTableCell>Sold By</CustomTableCell>
              <CustomTableCell>Total</CustomTableCell>
              <CustomTableCell>Date</CustomTableCell>
              <CustomTableCell>Items</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
               Object.values(this.state.data).map((type,index) => {
                 return (
                    <TableRow className={classes.row} key={index} selectable={true}>
                      <CustomTableCell>{type.Emp_Cnic}</CustomTableCell>
                      <CustomTableCell >{type.total}</CustomTableCell>
                      <CustomTableCell > {type.date_sale} </CustomTableCell>
                      <CustomTableCell>
                        {
                          type.products.map((item)=>{
                            return(item.item_name)+"," 
                          })
                          }
                      </CustomTableCell>     
                    </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}


ViewSales.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewSales);
