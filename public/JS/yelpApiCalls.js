
class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			businesses: [],
			term: "",
			location: ""
		}
		this.updateLocation = this.updateLocation.bind(this)
		this.updateTerm = this.updateTerm.bind(this)
		this.yelpApiCall = this.yelpApiCall.bind(this)

}
	render() {
		return(
			<div>
				<div className="yelpResults">
					<YelpResults results={this.state.businesses} />
				</div>

				<div className="data">
					<input className="food" onChange={this.updateTerm} className="input" type="text" placeholder="Food" />
					<input className="location" onChange={this.updateLocation} className="input" type="text" placeholder="location" />
					<button onClick={this.yelpApiCall}>Search</button>
				</div>
			</div>
		)
	}

	updateLocation(event) {
		this.setState({location: event.target.value})
	}
	updateTerm(event) {
		this.setState({term: event.target.value})
	}

	yelpApiCall() {

		axios.get("https://yelp-search.herokuapp.com/search", {
			params: {
				location: this.state.location,
				term: this.state.term
			}
		}).then(function(response) {
			console.log(response)
			this.setState({businesses: response.data.businesses})
		}.bind(this))

	}

}

function YelpResults(props) {

		let businesses = props.results.map(function(result, index){
			return(	 <div key={index}>
						 <div>{result.name}</div>
						 <img src={result.image_url} alt="" />
					 </div>
				)
		})

	return(
		<div>{businesses}</div>
	)
}


ReactDOM.render(
	<App />,
	document.getElementById("react")
)
