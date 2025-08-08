import React from "react";
function About(): React.ReactElement {
  return (
    <div className="about">
      <div className="about-page">
        <h1>Star Wars Planets App</h1>
        <p>The author of the application is Pavel Kozin</p>
        <a
          href="https://rs.school/"
          className="rs_link"
          target="_blank"
          rel="noreferrer"
        >
          RS School
        </a>
      </div>
    </div>
  );
}

export default About;
