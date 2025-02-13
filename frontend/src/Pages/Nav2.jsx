import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoggedinNavbar = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetch("https://blogjeet-1.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        alert("Logged Out Successfully!");
        navigate("/");
      } else {
        alert("Error logging out!");
      }
    } catch (err) {
      alert("Network error occurred!");
      console.error(err);
    }
  }

  return (
    <>
      <motion.div
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link className="heading">BlogJeet</Link>
        </motion.div>
        <motion.div
          className="options"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.6,
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <Link to="/home">Home</Link>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <Link onClick={handleLogout}>Logout</Link>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <Link to="/contact">Contact Us</Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        className="line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.0, delay: 1.0 }}
      ></motion.div>
    </>
  );
};

export default LoggedinNavbar;
