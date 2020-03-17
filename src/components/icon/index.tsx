import React from 'react';
import classnames from 'classnames';
import { ReactSVG } from 'react-svg';
import './icon.less';

interface IconSVGProps {
  type: string,
  className?: string
}

export default ({ type, className }: IconSVGProps) => {
  return <ReactSVG className={classnames('svg-icon', className)} src={require(`./svg/${type}.svg`)} wrapper="span" />;
};