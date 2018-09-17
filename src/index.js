import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAFVkgpFeV_cTPzfG7JLfCdMFcM5WEFAy4';



class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null
		};
		this.videoSearch('surfboards');
	}
	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) => {
			//console.log(data);
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
			//this.setState({videos: videos});
		});
	}
	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300); // This function will be called every 300 ms
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('div.container'));
