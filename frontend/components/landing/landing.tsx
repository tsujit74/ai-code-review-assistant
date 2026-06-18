"use client"

import Head from 'next/head'
import Navbar from './Navbar'
import Hero from './Hero'
import FeaturesGrid from './FeaturesGrid'
import AIReviewSection from './AIReviewSection'
import WorkflowTimeline from './WorkflowTimeline'
import AIProviders from './AIProviders'
import DashboardPreview from './DashboardPreview'
import Architecture from './Architecture'
import WhyThisProject from './WhyThisProject'
import Footer from './Footer'

function Landing() {
  return (
    <div className="w-full bg-zinc-950 text-zinc-100">
    <Head>
        <title>AI-Powered Code Review Assistant | Professional Code Intelligence</title>
        <meta 
          name="description" 
          content="AI-powered code intelligence for modern developers. Upload projects and receive structured AI-powered reviews for security, performance, and code quality." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      
      <Navbar />
      <main>
        <Hero />
        <FeaturesGrid />
        <AIReviewSection />
        <WorkflowTimeline />
        <AIProviders/>
        <DashboardPreview/>
        <Architecture/>
        <WhyThisProject/>
      </main>
      <Footer />
    </div>
  )
}

export default Landing
