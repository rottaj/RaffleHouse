// import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import React from 'react';
import './MenuItems.css';

interface Props {
    context: string;
    mode: string;
    style: any;
    defaultSelectedKeys: any;
}

declare let window: any;

export default class MenuItems extends React.Component {
    render() {
      return (
          <div className="test">
            <Link to="/">🏠 Home</Link>
            <Link to="/raffles">💰 Current Raffles</Link>
            <Link to="/profile">🖼 Profile</Link>
            <Link to="/">📄 Host</Link>
        </div>
      )
    }
}

{/* <Menu>
    <Menu.Item key="/quickstart">
    <Link to="/quickstart">🏠 Home</Link>
    </Menu.Item>
    <Menu.Item key="/erc20balance">
    <Link to="/erc20balance">💰 Current Raffles</Link>
    </Menu.Item>
    <Menu.Item key="/nftBalance">
    <Link to="/nftBalance">🖼 Profile</Link>
    </Menu.Item>
    <Menu.Item key="/contract">
    <Link to="/contract">📄 Host</Link>
    </Menu.Item>
</Menu> */}