function AboutView({ onHomeClicked }) {
    const members = [
      {
        name: "Sebastian Rone",
        university: "Royal Institute of Technology",
        email: "sebgro@kth.se",
        image: "aboutCardImage1",
        developerRole: "Web Developer, Firebase Master",
      },
      {
        name: "Valter Lindeberg",
        university: "Royal Institute of Technology",
        email: "vlindbe@kth.se",
        image: "aboutCardImage5",
        developerRole: "Scum Master, Hardware engineer",
      },
      {
        name: "William Eriksson",
        university: "Royal Institute of Technology",
        email: "werik@kth.se",
        image: "aboutCardImage3",
        developerRole: "Web Developer,",
      },
      {
        name: "Ingemar Cederholm",
        university: "Royal Institute of Technology",
        email: "ngemarc@kth.se",
        image: "aboutCardImage4",
        developerRole: "Hardware Engineer,",
      },
      {
        name: "Samir Alami",
        university: "Royal Institute of Technology",
        email: "samirala@kth.se",
        image: "aboutCardImage2",
        developerRole: "Web Developer",
      },
      {
        name: "Dinh Vu",
        university: "Royal Institute of Technology",
        email: "dinhv@kth.se",
        image: "aboutCardImage6",
        developerRole: "Web Developer",
      },
      {
        name: "Liam Battini",
        university: "Royal Institute of Technology",
        email: "liamb@kth.se",
        image: "aboutCardImage7",
        developerRole: "Designer, Product Owner",
      },
    ];
  
    return (
      <div>
        <div className="aboutTitle">ABOUT US</div>
        <div>
          <div className="aboutContent">
            {members.map((member, index) => (
              <div key={index} className="aboutCard blurBackground">
                <div className={`aboutCardImage ${member.image}`}></div>
                <div className="aboutTitleText">{member.name}</div>
                <div className="aboutUniversity">University: {member.university}</div>
                <div className="aboutDeveloperRole">Role: {member.developerRole}</div>
                <div className="aboutEmail">{member.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default AboutView;
  