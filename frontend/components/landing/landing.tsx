"use client";

import Head from "next/head";

import Hero from "./Hero";
import FeaturesGrid from "./FeaturesGrid";
import AIReviewSection from "./AIReviewSection";
import WorkflowTimeline from "./WorkflowTimeline";
import AIProviders from "./AIProviders";
import DashboardPreview from "./DashboardPreview";
import Architecture from "./Architecture";
import WhyThisProject from "./WhyThisProject";

function Landing() {
  return (
    <div className="w-full bg-zinc-950 text-zinc-100">
      <Head>
        <title>AI Code Review Assistant</title>
        <meta
          name="description"
          content="AI-powered code intelligence for modern developers."
        />
      </Head>

      <Hero />
      <FeaturesGrid />
      <AIReviewSection />
      <WorkflowTimeline />
      <AIProviders />
      <DashboardPreview />
      <Architecture />
      <WhyThisProject />
    </div>
  );
}

export default Landing;