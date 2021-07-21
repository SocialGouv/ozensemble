import React from 'react';
import { AppState } from 'react-native';

class AppStateHandler extends React.PureComponent {
  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (newState) => {
    const { appState } = this.state;
    if (newState === 'active' && appState !== 'active') {
      this.props.isActive();
    }
    if (newState.match(/inactive|background/) && !appState.match(/inactive|background/)) {
      this.props.isInactive();
    }
    this.setState({ appState: newState });
  };

  render() {
    return null;
  }
}

export default AppStateHandler;
