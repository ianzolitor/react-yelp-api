function LogoutButton() {
	
	function logout() {
		axios({
			method: 'post',
			url: '/logout'
		}).then(function(response) {
			location = "/"
		})
	}
	
	return(
				<div onClick={logout} className="button logout-button">Logout</div>
				)
	}

ReactDOM.render(
		<LogoutButton />,
		document.getElementsByClassName("react-logout")[0]
	)


