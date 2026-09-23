import "./App.css";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import NavigationBar from "./components/NavigationBar";
import FantasySection from "./components/FantasySection";
import VideosSection from "./components/VideosSection";

function App() {
	return (
	<main className="isolate">
      <NavigationBar />
      <HeroSection />
	< ProjectsSection />
      <FantasySection />
      <VideosSection />
	</main>
	);
}

export default App;
