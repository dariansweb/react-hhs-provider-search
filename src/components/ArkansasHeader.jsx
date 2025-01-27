import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import FlagOfArkansas from "../assets/images/arkansas/Flag_of_Arkansas.svg";
import "./styles/ArkansasHeader.css";

const ArkansasHeader = () => {
  // State to control the dropdown visibility
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showRightMenu, setShowRightMenu] = useState(false);

  return (
    <header className="arkansas-header-container">
      {/* Top thin line with stars */}
      <div className="arkansas-header-stars-line">
        {Array.from({ length: 25 }, (_, i) => (
          <span key={i} className="arkansas-header-star">
            ★
          </span>
        ))}
      </div>

      {/* Main header bar */}
      <div className="arkansas-header-main">
        {/* Left Diamond with Sidebar */}
        <div
          className="arkansas-header-diamond-menu arkansas-header-diamond-left"
          onClick={() => setShowLeftMenu(true)}
        >
          <FontAwesomeIcon icon={faBars} className="menu-icon" /> 
        </div>

        <div className="arkansas-header">
          <img
            src={FlagOfArkansas}
            alt="Flag of Arkansas"
            className="arkansas-header-flag"
          />
        </div>

        {/* Right Diamond with Sidebar */}
        <div
          className="arkansas-header-diamond-menu arkansas-header-diamond-right"
          onClick={() => setShowRightMenu(true)}
        >
          <FontAwesomeIcon icon={faBars} className="menu-icon" /> 
        </div>
      </div>

      {/* Left Sidebar Menu */}
      <div
        className={`arkansas-sidebar arkansas-sidebar-left ${
          showLeftMenu ? "open" : ""
        }`}
      >
        <button className="close-button" onClick={() => setShowLeftMenu(false)}>
          ✕
        </button>
        <h2 className="arkansas-sidebar-header">Human Services</h2>

        <a
          href="https://humanservices.arkansas.gov/apply-for-services/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply for Services
        </a>
        <a
          href="https://humanservices.arkansas.gov/divisions-shared-services/county-operations/health-care-programs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Health Care Programs
        </a>
        <a
          href="https://humanservices.arkansas.gov/divisions-shared-services/county-operations/supplemental-nutrition-assistance-snap/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SNAP
        </a>
        <a
          href="https://humanservices.arkansas.gov/contact-us/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Adult Protective Services
        </a>
        <a
          href="https://humanservices.arkansas.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developmental Disabilities Services
        </a>
        <a
          href="https://humanservices.arkansas.gov/divisions-shared-services/county-operations/low-income-home-energy-assistance-program/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LIHEAP
        </a>
        <a
          href="https://www.arcareereducation.org/about/arkansas-rehabilitation-services"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rehabilitation Services
        </a>
        <a
          href="https://www.washingtoncountyar.gov/government/departments-a-e/circuit-courts/circuit-court-division-3-juvenile/fins-faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          Families in Need of Services (FINS)
        </a>
        <a
          href="https://www.faulknercounty.org/2nd-div-circuit/juvenile-probation/2-uncategorised/1091-programs-services-provided-through-juvenile-court"
          target="_blank"
          rel="noopener noreferrer"
        >
          Juvenile Court Programs & Services
        </a>
        <a
          href="https://healthy.arkansas.gov/programs-services/community-family-child-health/faith-based-outreach/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Faith-Based Outreach
        </a>
      </div>

      {/* Right Sidebar Menu */}
      <div
        className={`arkansas-sidebar arkansas-sidebar-right ${
          showRightMenu ? "open" : ""
        }`}
      >
        <button
          className="close-button"
          onClick={() => setShowRightMenu(false)}
        >
          ✕
        </button>
        <h2 className="arkansas-sidebar-header">Health Services</h2>

        <a
          href="https://healthy.arkansas.gov/programs-services/community-family-child-health/wic-women-infants-children/"
          target="_blank"
          rel="noopener noreferrer"
        >
          WIC Program
        </a>
        <a
          href="https://healthy.arkansas.gov/programs-services/prevention-healthy-living/tobacco-prevention-cessation/tobacco-cessation-resources/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tobacco Cessation
        </a>
        <a
          href="https://healthy.arkansas.gov/programs-services/community-family-child-health/family-health/womens-health/pregnancy-parenting-resources/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pregnancy & Parenting
        </a>
        <a
          href="https://healthy.arkansas.gov/programs-services/community-family-child-health/rural-health-primary-care/rural-health-programs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rural Health Programs
        </a>
        <a
          href="https://healthy.arkansas.gov/programs-services/prevention-healthy-living/substance-misuse-injury-prevention/injury-violence-prevention/suicide-prevention/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suicide Prevention
        </a>
        <a
          href="https://healthy.arkansas.gov/programs-services/prevention-healthy-living/tobacco-prevention-cessation/project-prevent-youth-coalition/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Youth Health
        </a>
        <a
          href="https://healthy.arkansas.gov/programs-services/prevention-healthy-living/nutrition/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nutrition
        </a>
        <a
          href="https://healthy.arkansas.gov/programs-services/public-health-safety/swimming-pools-related-facilities/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Swimming Pools & Facilities
        </a>
        <a
          href="https://healthy.arkansas.gov/programs-services/environmental-health/food-protection"
          target="_blank"
          rel="noopener noreferrer"
        >
          Food Protection Program
        </a>
        <a
          href="https://healthy.arkansas.gov/programs-services/epidemiology/chronic-disease"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chronic Disease Programs
        </a>
      </div>

      {/* Bottom thin line with Arkansas motto */}
      <div className="arkansas-header-motto-line">
        <span>Regnat Populus</span>
      </div>
    </header>
  );
};

export default ArkansasHeader;
