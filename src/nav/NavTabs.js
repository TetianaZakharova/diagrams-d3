import { NavLink } from "react-router-dom";
import { orderBy } from "lodash";
import tabs from "../tabs.json";
import './navTabs.scss'

export const NavTabs = () => {
  return (
      <ul className="nav-list">
        {orderBy(tabs, "order").map((tab) => {
          return (
            <li key={tab.id}>
              <NavLink to={tab.id}>{tab.title}</NavLink>
            </li>
          );
        })}
      </ul>
  );
};
