function Header() {
	return(
			<div className="header-container">
				<header>
					<h1 className="header"></h1>
				</header>
			</div>
		)
}

ReactDOM.render(
		<Header />
		document.getElementsByClassName("react-header")[0];
	)