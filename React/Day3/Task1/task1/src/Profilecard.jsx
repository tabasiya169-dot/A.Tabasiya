import profileImage from "./assets/img1.avif";

const Profilecard = () => {
  return (
    <div className="profileCard">
      <img src={profileImage} alt="Profile" />
      <h2>Tabasiya</h2>
      <p>Frontend Developer</p>
      <button>View Profile</button>
    </div>
  );
};

export default Profilecard;