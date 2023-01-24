import AdPremium from "./AdPremium";
import Edit from "./Edit";
import PeopleKnow from "./PeopleKnow";
import PeopleViewed from "./PeopleViewed";
import "./sidebar.css";

const SideBar = () => {
  return (
    <>
      <Edit />
      <AdPremium />
      <PeopleViewed />
      <PeopleKnow />
    </>
  );
};
export default SideBar;
