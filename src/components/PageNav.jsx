import { Link, NavLink } from "react-router-dom";

export default function PageNav() {
  return (
    <nav>
      <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/Pricing">Pricing</L>
        </li>
        <li>
            <Link to="/Product">Product</Link>
        </li>
      </ul>
    </nav>
  )
}
