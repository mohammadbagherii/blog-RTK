import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <section>
                <h1>وبلاگ کوچک ریداکسی من</h1>

                <div className="navContent" style={{direction:'rtl'}}>
                    <div className="navLinks">
                        <Link style={{marginLeft:'1rem'}} to={'/'}>وبلاگ</Link>
                        <Link to={'/users'}>نویسنگان</Link>
                    </div>
                </div>
            </section>
        </nav>
    );
};

export default Navbar;
