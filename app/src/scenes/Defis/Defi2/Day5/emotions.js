import React from 'react';
import NoReassuredSmiley from '../../../../components/illustrations/smiley/NoReassuredSmiley';
import SadSmiley from '../../../../components/illustrations/smiley/SadSmiley';
import IllSmiley from '../../../../components/illustrations/smiley/IllSmiley';
import AngrySmiley from '../../../../components/illustrations/smiley/AngrySmiley';
import PleasureSmiley from '../../../../components/illustrations/smiley/PleasureSmiley';

const emotions = [
  {
    value: 1,
    description: 'Me rassurer',
    icon: <NoReassuredSmiley size={56} />,
    iconclicked: <NoReassuredSmiley size={56} color={'#DE285E'} />,
    iconBilan: <NoReassuredSmiley size={56} color={'#4030A5'} />,
  },
  {
    value: 2,
    description: 'Me faire plaisir',
    icon: <PleasureSmiley size={56} />,
    iconclicked: <PleasureSmiley size={56} color={'#DE285E'} />,
    iconBilan: <PleasureSmiley size={56} color={'#4030A5'} />,
  },
  {
    value: 3,
    description: 'Me calmer',
    icon: <AngrySmiley size={56} />,
    iconclicked: <AngrySmiley size={56} color={'#DE285E'} />,
    iconBilan: <AngrySmiley size={56} color={'#4030A5'} />,
  },
  {
    value: 4,
    description: 'Aller moins mal',
    icon: <SadSmiley size={56} />,
    iconclicked: <SadSmiley size={56} color={'#DE285E'} />,
    iconBilan: <SadSmiley size={56} color={'#4030A5'} />,
  },
  {
    value: 5,
    description: 'Avoir moins mal',
    icon: <IllSmiley size={56} />,
    iconclicked: <IllSmiley size={56} color={'#DE285E'} />,
    iconBilan: <IllSmiley size={56} color={'#4030A5'} />,
  },
];

export default emotions;
