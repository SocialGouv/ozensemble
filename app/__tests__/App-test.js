/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import App from '../App';

it('renders correctly', () => {
  renderer.create(<App />);
});
