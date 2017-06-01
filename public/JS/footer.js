function Footer() {
	return(
			<div className="footer-container">
				<footer>
					<h2 className="footer">Copyright 2017</h2>
					<h2 className="footer-span">La Guerilla Yelp Brigada Inc.</h2>
				</footer>
			</div>
		)
}

ReactDOM.render(
		<Footer />,
		document.getElementsByClassName("react-footer")[0]
	)