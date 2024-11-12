function About(params) {
  const email = "louriachiabderrahman13@gmail.com";
  const studies = [
    {
      duration: "2020 - 2023",
      subject: "Computer science",
      place: "Abou-Bakr Balkaid university - Tlemcen",
    },
    {
      duration: "2023 - 2025",
      subject: "Networking and distributed system",
      place: "Abou-Bakr Balkaid university - Tlemcen",
    },
  ];

  return (
    <div className="about">
      <div>
        <h1>Louriachi Mohammed Abderrahmane </h1>
        <a href="/TODO">CV</a>
        <span>
          at <a href={email}>{email}</a>
        </span>
      </div>
      <div>
        <h2>Studies :</h2>
        <For each={studies}>{(study) => <StudyCard study={study} />}</For>
      </div>
      <div>
        <h2>Certerfications : comming soon</h2>
      </div>
      <div>
        <h2>Projects : comming soon</h2>
      </div>
      <div>
        <h2>Qualities : comming soon</h2>
      </div>
    </div>
  );
}

const StudyCard = ({ study }) => (
  <div className="study-log">
    <span>{study.duration}</span>
    <span>{study.subject}</span>
    <span>{study.place}</span>
  </div>
);

export default About;
