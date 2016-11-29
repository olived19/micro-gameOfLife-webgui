import React from 'react';
import {connect} from 'react-redux';

class GridCell extends React.Component {
    isAlive() {
        return this.props.isAlive;
    }
    render() {
        return (
            <td>{this.isAlive() ? 1 : 0}</td>
        );
    }
}

class GridRow extends React.Component {
    getRow() {
        return this.props.row;
    }
    render() {
        let cells = this.getRow().map((cell, index) => {
            return(
                <GridCell key={index} isAlive={cell} />
            );
        }, this);
        return (
            <tr>
               {cells}
            </tr>
        );
    }
}

export class Grid extends React.Component {
    getWorld() {
        return this.props.world || [];
    }
    render() {
        let rows = this.getWorld().map((row, index) => {
            return (
                <GridRow key={index} row={row} />
            );
        }, this);
        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
};

function mapStateToProps(state) {
    console.log(state);
  return {
    world: state.getIn(['grid', 'currentWorld']),
  };
}

export const GridContainer = connect(mapStateToProps)(Grid);
