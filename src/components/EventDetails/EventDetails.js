import React, { Component } from 'react';
import { connect } from 'react-redux';
import Financials from './Financials/Financials';
import General from './General/General';
import Programs from './Programs/Programs';
import Travel from './Travel/Travel';
import './EventDetails.css';

class EventDetails extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_EVENT', payload: this.props.match.params.id });
        this.props.dispatch({ type: 'FETCH_PROGRAMS_TABLE', payload: this.props.match.params.id });
        this.props.dispatch({ type: 'FETCH_TRAVEL_TABLE', payload: this.props.match.params.id });
        this.props.dispatch({ type: 'FETCH_GENERAL_TABLE', payload: this.props.match.params.id });
        this.props.dispatch({ type: 'FETCH_FINANCIALS_TABLE', payload: this.props.match.params.id });
        // this.props.dispatch({ type: 'FETCH_NOTES_TABLE', payload: this.props.match.params.id });
    }

    state = {
        general: true,
        financials: false,
        programs: false,
        travel: false,

        generalStyle: {
            backgroundColor: 'antiquewhite',
        },
        financialsStyle: {
            backgroundColor: 'gray',
        },
        programsStyle: {
            backgroundColor: 'gray',
        },
        travelStyle: {
            backgroundColor: 'gray',
        },
    }

    // Function that takes in two paramaters related to local state properties, called on click of inner window tab
    // Sets the value of the tab that was clicked to true in local state, backgroundColor to 'antiquewhite', and all other booleans and backgroundColors to false and gray respectively
    handleTabClick = (propertyName, styleName) => {

        Object.keys(this.state).forEach(property => {
            if (property === propertyName) {
                this.setState({
                    [propertyName]: true,
                })
            } else if (property === styleName) {
                this.setState({
                    [styleName]: {
                        backgroundColor: 'antiquewhite',
                    },
                })
            } else if (property.includes('Style')) {
                this.setState({
                    [property]: {
                        backgroundColor: 'gray',
                    },
                })
            } else {
                this.setState({
                    [property]: false,
                })
            }
        });
    } // End handleTabClick function
    handleSaveChangesButtonClick = () => {
        this.props.dispatch({ type: 'SAVE_EVENTS_TRAVEL', payload: this.props.reduxState.eventsTravelReducer });
        this.props.dispatch({ type: 'SAVE_EVENTS_GENERAL', payload: this.props.reduxState.eventsGeneralReducer });
        this.props.dispatch({ type: 'SAVE_EVENTS_PROGRAMS', payload: this.props.reduxState.eventsProgramsReducer });
        this.props.dispatch({ type: 'SAVE_EVENTS_FINANCIALS', payload: this.props.reduxState.eventsFinancialsReducer });
    }
    handleDeleteClick = () => {
        console.log("handleDeleteClick has been clicked, action payload is",{value: this.props.match.params.id} );
        this.props.dispatch({ type: 'DELETE_EVENT', payload: this.props.match.params.id })
        this.props.history.push('/home')
    }

    handleDeleteButtonClick = (venueId) => {
        this.props.dispatch({ type: 'DELETE_VENUE', payload: venueId });
    }
    render() {
        return (
            <>
                <div className="header">
                    <h1>Event Details Component</h1>
                </div>
                <div className="mainWindow">
                    <div className="mainInfo">
                        <h3>When?<button className="tabButtonPosition" onClick={() => { if (window.confirm('Are you sure you wish to delete this event? This cannot be undone.')) this.handleDeleteClick() }}>Delete Event</button><button className="tabButtonPosition" onClick={this.handleSaveChangesButtonClick}>Save Changes</button></h3>
                    </div>
                    <div className="generalTab" onClick={() => this.handleTabClick('general', 'generalStyle')} style={this.state.generalStyle}>
                        General
                    </div>
                    <div className="travelTab" onClick={() => this.handleTabClick('travel', 'travelStyle')} style={this.state.travelStyle}>
                        Travel
                    </div>
                    <div className="financialsTab" onClick={() => this.handleTabClick('financials', 'financialsStyle')} style={this.state.financialsStyle}>
                        Financials
                    </div>
                    <div className="programsTab" onClick={() => this.handleTabClick('programs', 'programsStyle')} style={this.state.programsStyle}>
                        Programs
                    </div>



                    {this.state.general &&
                        <div className="tabWindow">
                            <General eventId={this.props.match.params.id} />
                        </div>
                    }
                    {this.state.financials &&
                        <div className="tabWindow">
                            <Financials eventId={this.props.match.params.id} />
                        </div>
                    }
                    {this.state.programs &&
                        <div className="tabWindow">
                            <Programs eventId={this.props.match.params.id} />
                        </div>
                    }
                    {this.state.travel &&
                        <div className="tabWindow">
                            <Travel eventId={this.props.match.params.id} />
                        </div>
                    }
                </div>

            </>
        )
    }
} // End VenueDetails component

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(EventDetails);