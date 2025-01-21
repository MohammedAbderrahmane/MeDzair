import Card from "../reusable_components/Card";

function About(params) {
  const email = "louriachiabderrahman13@gmail.com";
  const studies = [
    {
      duration: "2020 - 2023",
      subject: "Computer science",
      place: "Abou-Bakr Balkaid university - Tlemcen",
      img: "univ-tlemcen.png",
    },
    {
      duration: "2023 - 2025",
      subject: "Networking and distributed system",
      place: "Abou-Bakr Balkaid university - Tlemcen",
      img: "univ-tlemcen.png",
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
      <Card title="Studies : ">
        <ul>
          <For each={studies}>{(study) => <StudyCard study={study} />}</For>
        </ul>
      </Card>
      <Card title="Certerfications : ">comming soon</Card>
      <Card title="Projects : ">comming soon</Card>
      <Card title="Qualities : ">comming soon</Card>
    </div>
  );
}

const StudyCard = ({ study }) => (
  <div className="study-log">
    <span>{study.duration}</span>
    <span>{study.subject}</span>
    <span>{study.place}</span>
    <img src={study.img} width="30px"/>
  </div>
);

export default About;
