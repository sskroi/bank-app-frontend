import "./Header.scss"

function Header() {

    return (
        <header>
            <div className="Container">
                <div className="HeaderCont">
                    <Logo />
                    <NavigateMenu />
                    <LogOutBtn />
                </div>
            </div>
        </header>
    )
}

function Logo() {
    return (
        <div className="Logo">
            <a href="#">F-BANK</a>
        </div>
    )
}

function NavigateMenu() {
    return (
        <nav className="NavMenuCont">
            <button className="NavBtn">HOME</button>
            <button className="NavBtn">TRANSFERS</button>
            <button className="NavBtn">HISTORY</button>
        </nav>
    )
}

function LogOutBtn() {
    return (
        <div className="LogOutBtn">
            <a href="#">Log Out</a>
        </div>
    )
}

export default Header;
