'use client';

import { useEffect } from 'react';

interface ViewTrackerProps {
  postId: number;
}

export default function ViewTracker({ postId }: ViewTrackerProps) {
  useEffect(() => {
    // Track view after a short delay to ensure user actually viewed the content
    const timer = setTimeout(() => {
      // Check if we've already tracked a view for this post in this session
      const viewedPosts = JSON.parse(sessionStorage.getItem('viewedPosts') || '[]');
      
      if (!viewedPosts.includes(postId)) {
        // In a real app, you'd make an API call here
        // fetch(`/api/posts/${postId}/view`, { method: 'POST' });
        
        // For now, just track in session storage
        const updatedViewedPosts = [...viewedPosts, postId];
        sessionStorage.setItem('viewedPosts', JSON.stringify(updatedViewedPosts));
        
        console.log(`Tracked view for post ${postId}`);
      }
    }, 2000); // Track after 2 seconds

    return () => clearTimeout(timer);
  }, [postId]);

  return null; // This component doesn't render anything
}