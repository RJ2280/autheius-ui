import React from 'react';
import LessonCard from '../components/LessonCard.jsx';
import RecommendedPanel from '../components/RecommendedPanel.jsx';
import CapstoneUploader from '../components/CapstoneUploader.jsx';
import LessonEnhancer from '../components/LessonEnhancer.jsx';
import VeoBuilderForm from '../components/VeoBuilderForm.jsx';
import ReflexSuggestion from '../components/ReflexSuggestion.jsx';
import PortfolioExporter from '../components/PortfolioExporter.jsx';
import VideoSearch from '../components/VideoSearch.jsx';
import VideoSuggestions from '../components/VideoSuggestions.jsx';

const Dashboard = ({ userId }) => {
  return (
    <div className="dashboard">
      <h1>🧠 Welcome, {userId}</h1>
      <RecommendedPanel userId={userId} />
      <ReflexSuggestion userId={userId} />
      <LessonCard lesson={{ id: 17, title: "Prompt Engineering", objective: "Design smart prompts." }} userId={userId} />
      <LessonEnhancer lessonId={17} />
      <CapstoneUploader userId={userId} />
      <VeoBuilderForm />
      <PortfolioExporter userId={userId} />
      <VideoSearch />
      <VideoSuggestions userId={userId} />
    </div>
  );
};

export default Dashboard;
