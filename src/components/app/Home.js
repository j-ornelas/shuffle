import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import canistreamit from 'canistreamit';
import { findMovie } from '../../helpers';
import { fetchStreamingInfo } from '../../helpers/api';

export default class Home extends React.Component {
  defaultState = {
    selectedMovie: null,
    movieInfo: null,
    loading: true,
    streamingOptions: null
  }

  state = this.defaultState;

  componentDidMount() {
    this.findNewMovie();
  }

  async getStreamingInfo() {
    const { movieInfo } = this.state;
    const title = (movieInfo && movieInfo[0] && movieInfo[0].title);
    const results = await fetchStreamingInfo(title);
    const streamingOptions = results.results[0].locations;
    console.log('STREAMING', results, streamingOptions)
    this.setState({ streamingOptions });
  }

  resetState() {
    Object.keys(this.defaultState).forEach((prop) => {
      this.setState({ [prop]: this.defaultState[prop] });
    });
  }

  findNewMovie() {
    this.resetState();
    const selectedMovie = findMovie();
    canistreamit.search(selectedMovie)
      .then((movieInfo) => {
        this.setState({ movieInfo, selectedMovie, loading: false });
      });
  }

  renderImageUrl(movieInfo) {
    if (movieInfo && movieInfo[0] && movieInfo[0].image) {
      return `http:${movieInfo[0].image}`
    };
    return null;
  }

  render() {
    const { movieInfo, selectedMovie, loading, streamingOptions } = this.state;
    const imageURL = this.renderImageUrl(movieInfo);
    if (movieInfo) console.log('MOVIE INFO', movieInfo);
    return loading ? (
      <ActivityIndicator />
    ) : (
      <View style={styles.container}>

        <Text>{selectedMovie}</Text>

        {imageURL !== null && (
          <Image
            style={{ width: 200, height: 500, resizeMode: 'center' }}
            source={{ uri: imageURL }}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.findNewMovie()}
        >
          <Text>Shuffle!</Text>
        </TouchableOpacity>

        {streamingOptions === null ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'teal' }]}
            onPress={() => this.getStreamingInfo()}
          >
            <Text>Get Streaming Info</Text>
          </TouchableOpacity>
        ) : (
          <View>
            {streamingOptions.map((option) => {
              return <Text>{option.display_name || ''}</Text>
            })}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 100,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
