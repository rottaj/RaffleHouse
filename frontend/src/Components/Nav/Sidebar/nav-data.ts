import { FaHome, FaMusic, FaUserAlt, FaHeart, FaDatabase } from 'react-icons/fa';
import { GiTicket, GiCoinflip, GiRollingDices } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { IoIosSettings } from 'react-icons/io';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { NavItem } from './types/nav-item';

export const navItems: NavItem[] = [
  {
    type: 'link',
    href: '/',
    icon: FaHome,
    label: 'Home',
  },
  {
    type: 'header',
    label: 'Games',
  },
  {
    type: 'link',
    href: '/raffles',
    icon: GiTicket,
    label: 'Raffles',
  },
  {
    type: 'link',
    href: '/coin-flips',
    icon:  GiCoinflip,
    label: 'Coin Flips',
  },
  {
    type: 'link',
    href: '/high-rollers',
    icon: GiRollingDices,
    label: 'High Roller',
  },
  {
    type: 'header',
    label: 'General',
  },
  {
    type: 'link',
    href: '/profile',
    icon: CgProfile,
    label: 'Profile',
  },
  {
    type: 'link',
    href: '/settings',
    icon: IoIosSettings,
    label: 'Settings',
  },
];
