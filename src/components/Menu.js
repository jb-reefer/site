import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withState } from 'recompose';
import Link from './Link';
import toLowerCase from '../utils/toLowerCase';
import docs from '../index.md';

const MenuLink = Link.extend`
  padding: 6px 10px;
  color: ${props => (props.active ? props.theme.black : props.theme.gray1)};
  border-left: ${props => props.active && '2px solid #F01E00'};
`;

const List = styled.ul`
  flex: 1;
  margin: 0px;
  width: 100%;
  list-style: none;
`;

const Item = styled(({ index, href, onClick, className, children, ...props }) =>
  <li className={className}>
    <MenuLink
      href={href || `#${toLowerCase(children)}`}
      onClick={() => onClick(index)}
      {...props}
    >
      {children}
    </MenuLink>
  </li>,
)`padding: 6px 12px;`;

const docItems = docs
  .match(/###(.*)/g)
  .map(match => match.replace('###', '').trim());

const Menu = ({ activeItem, setActiveItem }) =>
  <List>
    {docItems.map((item, index) =>
      <Item
        key={item}
        index={index}
        active={activeItem === index}
        onClick={setActiveItem}
      >
        {item}
      </Item>,
    )}
    <Item>Playground / REPL</Item>
    <Item href="https://opencollective.com/react-pdf" target="_blank">
      Donate
    </Item>
    <Item href="https://github.com/diegomura/react-pdf/issues" target="_blank">
      Forum
    </Item>
  </List>;

Menu.propTypes = {
  activeItem: PropTypes.number,
  setActiveItem: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {},
};

export default withState('activeItem', 'setActiveItem', 0)(Menu);
