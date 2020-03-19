import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import { ReactSVG } from 'react-svg';
import './icon.less';

interface IconSVGProps {
  type: string,
  className?: string,
  style?: CSSProperties,
}

export default ({ type, className, style }: IconSVGProps) => {
  return <ReactSVG className={classnames('svg-icon', className)} style={style} src={require(`./svg/${type}.svg`)} wrapper="span" />;
};