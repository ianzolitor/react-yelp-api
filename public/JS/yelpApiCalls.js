
class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			businesses: [],
			term: "",
			location: ""
		}
		this.updateLocation = this.updateLocation.bind(this);
		this.updateTerm = this.updateTerm.bind(this);
		this.yelpApiCall = this.yelpApiCall.bind(this);
		this.myFavorites = this.myFavorites.bind(this);

}
	render() {
		return(
			<div>

			<div className="yelp_input">

				<div className="data">
					<input className="food" onChange={this.updateTerm} className="input" type="text" placeholder="Food" />
					<input className="location" onChange={this.updateLocation} className="input" type="text" placeholder="location" />
					<button onClick={this.yelpApiCall}>Search</button>


					<button onClick={this.myFavorites}>My Favorites</button>


					<div className="yelpResults">
						<YelpResults results={this.state.businesses} />
					</div>
					<div className="favoriteResults">
						<FavoriteResults />
					</div>

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
	myFavorites(){
		axios.get("/favorites", {

		}).then(function(response) {
			console.log(response)

		})
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

						<div className="yelpContainer">

								<img className="yelp_image" src={result.image_url} alt="" />

								<div className="yelp_2">
									<div className="yelp_name">{result.name}</div>
									<div className="yelp_phone">{result.display_phone}</div>
									<div className="yelp_address">{result.location.address}</div>
									<div className="yelp_location">{result.location.city}</div>
									<img className="yelp_stars" src={result.rating_img_url_small} alt="" />
									<button className="yelp_button" onClick={addToFavorites}>Add To Favorites</button>
								</div>
								<div className="clear"></div>

						</div>

					 </div>
				)

				function addToFavorites(){

					axios({
					  method: 'post',
					  url: '/business',
					  params: {
							name: result.name,
							city: result.location.city,
							image_url: result.image_url
					  }

					}).then(function(response) {


					})
				}
		})

	return(
		<div>{businesses}</div>
	)
}


ReactDOM.render(
	<App />,
	document.getElementById("react")
)
