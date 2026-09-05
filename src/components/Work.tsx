import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    name: "Airline Management System",
    category: "Python / Tkinter / MySQL",
    description:
      "A desktop-based Airline Management System developed using Python, Tkinter, and MySQL to manage passenger registration, flight booking, seat allocation, boarding pass generation, ticket cancellation, and journey details.",
    tools:
      "Python, Tkinter, MySQL, Database Management, CRUD Operations",
    link: "https://github.com/rabinarayan-mishra/Airlinemanagement_system",
    image:
      "https://raw.githubusercontent.com/rabinarayan-mishra/Airlinemanagement_system/main/airlinemanagementsystem/assets/front.png",
  },

  {
    name: "Airline Management System Analysis",
    category: "SQL / Excel / Power BI",
    description:
      "A Business Intelligence project that transforms airline operational data into interactive Power BI dashboards to analyze bookings, revenue, airline performance, passengers, routes, seat occupancy, and business trends.",
    tools:
      "SQL, Excel, Power Query, Power BI, DAX, Data Cleaning, Data Visualization",
    link: "https://github.com/rabinarayan-mishra/Airlinemanagement_system_Analysis",
    image:
      "https://raw.githubusercontent.com/rabinarayan-mishra/Airlinemanagement_system_Analysis/main/airline_analysisfiles/images/Flight_Dashboard_DarkTheme_Screenshot.png",
  },

  {
    name: "HR Analytics Dashboard",
    category: "Tableau / HR Analytics",
    description:
      "An interactive HR Analytics Dashboard developed using Tableau to analyze workforce demographics, departments, salary, education, performance, employment status, and geographic distribution.",
    tools:
      "Python, SQL, Excel, Tableau, Data Cleaning, EDA, Data Visualization",
    link:
      "https://public.tableau.com/views/HRDashboard_17875880303560/HRSummary",
    image:
      "https://raw.githubusercontent.com/rabinarayan-mishra/HR-Analytics-Dashboard/main/HR-Analytics-Dashboard/images/HR_Dashboard_Overview.png",
  },

  {
    name: "Blinkit Analysis",
    category: "Power BI / Data Analytics",
    description:
      "A business analytics project analyzing Blinkit sales and operational data to understand sales performance, product categories, outlet characteristics, customer demand, and business trends.",
    tools:
      "Excel, Power BI, Data Cleaning, Data Transformation, DAX, Data Visualization",
    link: "",
    image: "/images/blinkit_analysis.png",
  },

  {
    name: "COVID-19 India Dashboard",
    category: "Data Visualization / Analytics",
    description:
      "An interactive dashboard analyzing COVID-19 data in India, providing insights into cases, recoveries, deaths, testing, vaccination, age groups, gender distribution, and state-wise trends.",
    tools:
      "Excel, Power BI, Data Analysis, Data Visualization, Dashboarding",
    link: "",
    image: "/images/covid19_india.png",
  },
];

const Work = () => {
  useGSAP(() => {
    if (window.innerWidth <= 1024) return;

    const workFlex = document.querySelector(
      ".work-flex"
    ) as HTMLElement;

    if (!workFlex) return;

    const getScrollAmount = () =>
      -(workFlex.scrollWidth - window.innerWidth);

    const tween = gsap.to(workFlex, {
      x: getScrollAmount,
      ease: "none",

      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () =>
          `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container">

        {/* SECTION TITLE */}
        <div
          className="section-container"
          style={{ margin: "0 auto" }}
        >
          <h2>
            My <span>Projects</span>
          </h2>
        </div>

        {/* PROJECT CARDS */}
        <div className="work-flex">

          {projects.map((project, index) => (
            <div
              className="work-box"
              key={index}
            >

              {/* PROJECT INFORMATION */}
              <div className="work-info">

                <div className="work-title">

                  <h3>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </h3>

                  <div>

                    <h4>
                      {project.name}
                    </h4>

                    <p>
                      {project.category}
                    </p>

                  </div>

                </div>

                {/* DESCRIPTION */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "#a3a3a3",
                    marginTop: "-10px",
                    lineHeight: "1.5",
                  }}
                >
                  {project.description}
                </p>

                {/* TOOLS */}
                <h4>
                  Tools and Skills
                </h4>

                <p>
                  {project.tools}
                </p>

              </div>

              {/* PROJECT IMAGE */}
              <WorkImage
                image={project.image}
                alt={project.name}
                link={
                  project.link || undefined
                }
              />

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Work;