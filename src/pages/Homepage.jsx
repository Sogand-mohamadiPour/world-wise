import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

export default function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>Homepge</h1>
      <Link to="/app">Go to App Layout</Link>
    </div>
  )
}
