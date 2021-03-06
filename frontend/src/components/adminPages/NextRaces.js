import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export default class NextRaces extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updateClick: false,
            indexUpdate: undefined,
            newOdd: undefined,
            isEventClicked: false,
            eventIndex: undefined
        };
        this.updateClick = this.updateClick.bind(this);
        this.updateOdd = this.updateOdd.bind(this);
        this.oddInput = this.oddInput.bind(this);
        this.eventNameClick = this.eventNameClick.bind(this);
    }

    eventNameClick(index) {

        const { eventIndex } = this.state;
        if (eventIndex !== index) {
            this.setState({ eventIndex: index });
        }
        else {
            this.setState({ isEventClicked: !this.state.isEventClicked, eventIndex: index });
        }
    }
    oddInput(e) {
        this.setState({ newOdd: e.target.value });
    }

    updateOdd(eventIndex, pairIndex) {

        //API UPDATE CALL HERE

        const { newOdd } = this.state;
        

        
        if (newOdd !== undefined){

            if (newOdd.length !== 0){
                this.props.events[eventIndex].pairs[pairIndex].odd = newOdd;
            }
        }
        
        this.setState({ updateClick: false });
    }


    updateClick(index) {
        this.setState({ updateClick: true, indexUpdate: index, newOdd: undefined });
    }

    render() {

        if (this.props.events === null) return null;
        
        const { events, pairs } = this.props;
        const { updateClick, indexUpdate, isEventClicked, eventIndex } = this.state;


        if (events.length === 0 || Object.keys(pairs).length === 0) return null;




        return (
            <div className="margin-auto">
                {
                    events.map((event, index) => {
                        return (
                            <div key={index}>
                                <div className="event admin">
                                    <div className={`title margin-bottom ${isEventClicked === true && index === eventIndex && "active"}`} onClick={() => { this.eventNameClick(index); }}>{event.name}</div>
                                    <div className={`event-info ${isEventClicked == true && index === eventIndex && "active"}`}>
                                        <div className="sub-title margin-bottom">{event.bet_description}</div>
                                        <div className="date margin-bottom">Data si ora cursei: {new Date(event.timestamp).toLocaleString('en-US')}</div>
                                    </div>
                                    <div className="participants margin-bottom">


                                        {window.innerWidth < 1000 && isEventClicked === true && index === eventIndex && 

                                            event.pairs.map((pair, ind) => {

                                                 let index;  
                                                 for (index in pairs){
                                                    if (pairs[index]._id === pair.pair){
                                                        break;
                                                    }
                                                 }

                                                return (<div key={ind} className="next-races active-users">
                                                            Pereche: {(pairs[index].name)}<br/>
                                                            Id pereche: {pair.pair}<br/>
                                                            Cota: {pair.odd}<br/>
                                                        </div>);
                                            })

                                        }
                                        {window.innerWidth >= 1000 &&
                                        <table className={`${isEventClicked === true && index === eventIndex && "table-active"}`}>
                                            <thead>
                                                <tr>
                                                    <th>Pereche</th>
                                                    {
                                                        event.pairs.map((pair, ind) => {


                                                             let index;  
                                                             for (index in pairs){
                                                                if (pairs[index]._id === pair.pair){
                                                                    break;
                                                                }
                                                             }

                                                            return (<td key={ind}>{(pairs[index].name)}</td>);
       
                                                        })
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Id pereche</th>
                                                    {
                                                        event.pairs.map((pair, ind) => {

                                                            return (<td key={ind}>{pair.pair}</td>);
                                                        })
                                                    }
                                                </tr>
                                                <tr>
                                                    <th>Cota</th>
                                                    {
                                                        event.pairs.map((pair, ind) => {
                                                            if (updateClick === true && ind === indexUpdate)
                                                                return (
                                                                    <td className="odd margin-bottom" key={ind}>
                                                                        <input onChange={this.oddInput} className="update-input" placeholder={pair.odd} />
                                                                        <i onClick={() => { this.updateOdd(index, ind); }} className="fas fa-pen-square update-button" />
                                                                    </td>
                                                                );
                                                            else
                                                                return (<td className="odd margin-bottom" key={ind}>{pair.odd}</td>);

                                                        })
                                                    }
                                                </tr>
                                                {/* <tr>
                                                    <th>Update Cota</th>
                                                    {
                                                        event.pairs.map((pair, ind) => {

                                                            return (<td key={ind} onClick={() => { this.updateClick(ind); }}><i className="fas fa-pen-square update-button-open" /></td>);
                                                        })
                                                    }
                                                </tr> */}
                                            </tbody>
                                        </table>
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}