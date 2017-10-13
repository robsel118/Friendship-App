import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ViewContainer, FullscreenCentered } from '../../components/Layout';
import Person from '../../components/Person';

const mapStateToProps = state => {
  return { tagId: state.tagId };
};

class SearchList extends React.Component {
  static navigationOptions = {
    title: 'Search for users with tag ',
  };

  state = { data: {}, tagId: this.props.navigation.state.params.tagId };

  keyExtractor = item => item.userId;
  renderItem = ({ item }) => <Person data={item} />;

  componentDidMount() {
    fetch('http://0.0.0.0:3888/tag_user/tag/' + this.state.tagId, {
      method: 'get',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
      },
    })
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render = () => (
    <ViewContainer>
      <FullscreenCentered>
        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          // onEndReached={this.handleEnd}
          // onEndReachedThreshold={0.4}
          // style={{ flex: 1 }}
          // horizontal
        />
        {/* {this.renderSpinner()} */}
      </FullscreenCentered>
    </ViewContainer>
  );
}

export default connect(mapStateToProps)(SearchList);
