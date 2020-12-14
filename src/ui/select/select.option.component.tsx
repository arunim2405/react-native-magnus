import * as React from 'react';
import { GestureResponderEvent as RNGestureResponderEvent } from 'react-native';

import { Div } from '../div/div.component';
import { Icon } from '../icon/icon.component';
import { Text } from '../text/text.component';
import { OptionProps } from './select.option.type';
import { Button } from '../button/button.component';

const Option: React.FunctionComponent<OptionProps> = (props) => {
  const {
    children,
    value,
    prefix,
    onPress: onPressProp,
    onSelect,
    selectedValue,
    ...rest
  } = props;
  const isSelected = Array.isArray(selectedValue)
    ? selectedValue.includes(value)
    : selectedValue === value;

  /**
   * on press select option
   *
   * @param e
   */
  const onPress = (event: RNGestureResponderEvent) => {
    if (onSelect) {
      onSelect(value);
    }

    if (onPressProp) {
      onPressProp(event);
    }
  };

  /**
   * render suffix
   */
  const renderPrefix = () => {
    if (prefix && isSelected) {
      if (typeof prefix === 'string') {
        return <Icon name={prefix} fontSize="xl" color="green600" mr="md" />;
      }

      return prefix;
    }

    if (isSelected) {
      return <Icon name="check" fontSize="xl" color="green600" mr="md" />;
    }

    return false;
  };

  const renderChildren = () => {
    if (typeof children === 'string') {
      return <Text>{children}</Text>;
    }

    return children;
  };
  return (
    <Button {...rest} onPress={onPress} block alignItems="center">
      <Div w="8%">{renderPrefix()}</Div>
      <Div flex={1} bg="transparent">
        {renderChildren()}
      </Div>
    </Button>
  );
};

Option.defaultProps = {
  onSelect: () => {},
  rounded: 0,
  bg: 'white',
  p: 0,
  color: 'black',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  center: false,
};

export { Option };