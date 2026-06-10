import { useEffect, useRef } from "react";
import "./ProfileCard.css";

const ProfileCard = ({
  avatarUrl = "",
  iconUrl = "",
  name = "Your Name",
  title = "Your Title",
  handle = "yourhandle",
  status = "Online",
  contactText = "Contact Me",
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  behindGlowEnabled = false,
  behindGlowColor = "rgba(125,190,255,0.67)",
  innerGradient = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)",
}) => {
  const cardRef = useRef(null);
  const isMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (!enableTilt) return;
    if (isMobile() && !enableMobileTilt) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    };

    const handleMouseLeave = () => {
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enableTilt, enableMobileTilt]);

  return (
    <div className="pc-card-wrapper">
      {behindGlowEnabled && (
        <div
          className="pc-behind-glow"
          style={{ background: behindGlowColor }}
        />
      )}

      <div
        className="pc-card"
        ref={cardRef}
        style={{ "--inner-gradient": innerGradient }}
      >
        {/* Icon pattern background */}
        {iconUrl && (
          <div
            className="pc-icon-bg"
            style={{ backgroundImage: `url(${iconUrl})` }}
          />
        )}

        {/* Inner gradient overlay */}
        <div
          className="pc-inner-gradient"
          style={{ background: innerGradient }}
        />

        {/* Avatar */}
        <div className="pc-avatar-wrapper">
          <img
            src={avatarUrl}
            alt={name}
            className="pc-avatar"
          />
        </div>

        {/* Info */}
        {showUserInfo && (
          <div className="pc-user-info">
            <div className="pc-name">{name}</div>
            <div className="pc-title">{title}</div>
            <div className="pc-handle-row">
              <span className="pc-status-dot" />
              <span className="pc-handle">@{handle}</span>
              <span className="pc-status-text">{status}</span>
            </div>
          </div>
        )}

        {/* Contact Button */}
        <button
          className="pc-contact-btn"
          onClick={onContactClick}
        >
          {contactText}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;