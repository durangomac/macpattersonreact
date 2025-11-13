import me from '../assets/me.png';
export default function Home() {
  return (
    <section className="page home-two-col">
      <div className="home-text">
      <h1>Hi, I&apos;m Mac 👋</h1>
      <p>
        I&apos;m a software engineer who loves building systems, tools, and civic-tech projects.
        This site is a home for my work, projects, and ways to connect.
      </p>
      <p>
        Thanks for stopping by my site — I truly appreciate you being here. Feel free to explore the different pages,
        check out the projects, and reach out through the contact form with comments, questions, or feedback.
        I&apos;d love to hear from you! I&apos;ll also be adding more content soon, so stay tuned.
      </p>
      <p>
        Mac
      </p>
      </div>
      <div className="home-photo">
        <img 
          src={me} 
          alt="Mac Patterson" 
          className="profile-pic" 
        />
      </div>
    </section>
  );
}
