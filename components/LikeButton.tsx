'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
  className?: string;
}

export default function LikeButton({ postId, initialLikes, className = '' }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has liked this post (using localStorage for now)
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    setIsLiked(likedPosts.includes(postId));
  }, [postId]);

  const handleLike = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      
      if (isLiked) {
        // Unlike
        const updatedLikedPosts = likedPosts.filter((id: number) => id !== postId);
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
        setLikes(prev => prev - 1);
        setIsLiked(false);
      } else {
        // Like
        const updatedLikedPosts = [...likedPosts, postId];
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
        setLikes(prev => prev + 1);
        setIsLiked(true);
      }
      
      // In a real app, you'd make an API call here
      // await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
      
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isLiked 
          ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' 
          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${className}`}
    >
      <Heart 
        size={16} 
        className={`transition-all duration-200 ${
          isLiked ? 'fill-current scale-110' : ''
        } ${isLoading ? 'animate-pulse' : ''}`}
      />
      <span className="text-sm">{likes}</span>
    </button>
  );
}