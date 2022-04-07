import Link from "next/link";

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Crud App</a>
        </Link>
        <Link href="/new">
            <a className="create">Create User</a>
        </Link>
    </nav>
)


export default Navbar;