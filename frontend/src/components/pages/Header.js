import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo.png';

export default class Header extends Component {


	constructor(props) {
		super(props);


		this.state = {
			showMenu: false
		};
		this.menuClick = this.menuClick.bind(this);
		this.logoutClick = this.logoutClick.bind(this);

	}

	componentWillReceiveProps(){
		this.setState({showMenu: false});
	}

	menuClick() {
		this.setState({ showMenu: !this.state.showMenu });
	}


	logoutClick(){
		console.log("LOGOUT");
		localStorage.removeItem("token");
	}

	render() {
		const { user } = this.props;
		const { showMenu } = this.state;

		return (
			<div className={`header-content ${showMenu === true && "responsive"}`}>

				<div className="header-content-logo"> <img src={Logo} /> </div>

				

				<NavLink className="header-content-link" to="/events/main"><i className="fas fa-home" /></NavLink>

				{
					window.innerWidth < 800 &&
					<NavLink onClick={this.logoutClick} className="header-content-link" to="/login"> <i className="fas fa-sign-out-alt"/>Logout</NavLink>
				}
				{
					window.innerWidth < 700 &&
					<NavLink className="header-content-link" to="/user/profile"><div><i className="fas fa-user"/> Profile</div></NavLink> 
				}
				{
					window.innerWidth < 700 &&
					<NavLink className="header-content-link" to="/user/bets"><div><i className="fas fa-money-bill-alt"/> My bets</div></NavLink>
				}

				<NavLink className="header-content-link" to="/events/3_hours">Next 3 hours</NavLink>


				{
					[1, 2, 3, 4, 5, 6, 7].map((nr) => (
						<NavLink key={nr} className="header-content-link" to={`/events/${nr}`}> {nr} day(s)</NavLink>
					))
				}
				
				<a className="icon"> <i className="fas fa-bars" onClick={this.menuClick}/></a>
				



				<div className="user-info">
					<div className="user-name">{user.name}</div>
					<img className="user-avatar" src={user.avatar} />
					
					{
						window.innerWidth >= 800 && 
						<NavLink onClick={this.logoutClick} className="user-name" to="/login"> <i className="fas fa-sign-out-alt"/>Logout</NavLink>
					}
				</div>
			</div>
		);
	}
}