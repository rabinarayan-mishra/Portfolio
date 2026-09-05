import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = (
    el: HTMLDivElement | null,
    index: number
  ) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () =>
            handleClick(container)
          );
        }
      });
    }

    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () =>
            handleClick(container)
          );
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO">

      {/* TITLE */}
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>

      {/* CONTENT */}
      <div className="what-box">

        <div className="what-box-in">

          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />

              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>

          {/* DATA ANALYSIS */}
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >

            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />

                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>

            <div className="what-corner"></div>

            <div className="what-content-in">

              <h3>DATA ANALYSIS</h3>

              <h4>
                Turning Data Into Insights
              </h4>

              <p>
                Analyzing raw datasets to identify
                patterns, trends, and useful insights.
                I work with Python and MySQL to
                clean, transform, query, and analyze
                data for meaningful results.
              </p>

              <h5>Skillset & tools</h5>

              <div className="what-content-flex">

                <div className="what-tags">
                  Python
                </div>

                <div className="what-tags">
                  MySQL
                </div>

                <div className="what-tags">
                  Pandas
                </div>

                <div className="what-tags">
                  NumPy
                </div>

                <div className="what-tags">
                  Data Cleaning
                </div>

                <div className="what-tags">
                  Data Handling
                </div>

                <div className="what-tags">
                  SQL Analysis
                </div>

                <div className="what-tags">
                  EDA
                </div>

                <div className="what-tags">
                  Data Transformation
                </div>

                <div className="what-tags">
                  Statistics
                </div>

              </div>

              <div className="what-arrow"></div>

            </div>
          </div>

          {/* DATA VISUALIZATION */}
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >

            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>

            <div className="what-corner"></div>

            <div className="what-content-in">

              <h3>
                VISUALIZATION & BI
              </h3>

              <h4>
                Dashboards & Business Insights
              </h4>

              <p>
                Creating interactive dashboards,
                reports, KPIs, and visualizations
                that make complex data easier to
                understand and support data-driven
                decision making.
              </p>

              <h5>Skillset & tools</h5>

              <div className="what-content-flex">

                <div className="what-tags">
                  Excel
                </div>

                <div className="what-tags">
                  Power BI
                </div>

                <div className="what-tags">
                  Tableau
                </div>

                <div className="what-tags">
                  Data Visualization
                </div>

                <div className="what-tags">
                  Dashboards
                </div>

                <div className="what-tags">
                  KPI Reports
                </div>

                <div className="what-tags">
                  Charts
                </div>

                <div className="what-tags">
                  Business Analysis
                </div>

                <div className="what-tags">
                  Excel Reports
                </div>

                <div className="what-tags">
                  Power BI Reports
                </div>

              </div>

              <div className="what-arrow"></div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle(
    "what-content-active"
  );

  container.classList.remove(
    "what-sibling"
  );

  if (container.parentElement) {

    const siblings = Array.from(
      container.parentElement.children
    );

    siblings.forEach((sibling) => {

      if (sibling !== container) {

        sibling.classList.remove(
          "what-content-active"
        );

        sibling.classList.toggle(
          "what-sibling"
        );
      }

    });
  }
}