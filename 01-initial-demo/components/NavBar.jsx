import { ActiveLink } from "./ActiveLink";
import styles from "./NavBar.module.css";

const menuItems = [
    {
        text: 'Home',
        href: '/'
    },
    {
        text: 'About',
        href: '/about'
    },
    {
        text: 'Contact',
        href: '/contact'
    },
    {
        text: 'Pricing',
        href: '/pricing'
    },
];

export const NavBar = () => {
  return (
    <nav className={styles['menu-container']}>
        {
            menuItems.map(({text,href}) => (
                <ActiveLink key={href} text={text} href={href} />
            ))
        }
    </nav>
  )
}
