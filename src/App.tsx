import "./App.css";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import NavigationBar from "./components/NavigationBar";
import ProjectsSection from "./components/ProjectsSection";

function App() {
	return (
	<main>
      <NavigationBar />
      <HeroSection />
      <AboutSection />
	  < ProjectsSection />
	</main>
	);
}

export default App;
