/**
 * Dynamic Favicon Generator
 * This script updates the favicon to show a notification count for remaining demos
 */
(function() {
  // Function to update the favicon with a notification count
  function updateFavicon(count) {
    if (!count || count <= 0 || count >= 4) {
      return; // Only show for counts 1-3
    }
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // First, draw the existing favicon as background
    const img = new Image();
    img.onload = function() {
      // Draw the original favicon
      ctx.drawImage(img, 0, 0, 32, 32);
      
      // Draw notification bubble
      if (count < 4) {
        // Position in top right
        ctx.beginPath();
        ctx.arc(24, 8, 8, 0, 2 * Math.PI);
        
        // Color based on count
        if (count === 1) {
          ctx.fillStyle = '#f59e0b'; // amber-500
        } else {
          ctx.fillStyle = '#3b82f6'; // blue-500
        }
        
        ctx.fill();
        
        // Add count text
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(count, 24, 8);
      }
      
      // Set the new favicon
      const link = document.querySelector('link[rel="icon"]') || 
                   document.querySelector('link[rel="shortcut icon"]');
      
      if (link) {
        link.href = canvas.toDataURL('image/png');
      } else {
        // If no favicon exists, create one
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = canvas.toDataURL('image/png');
        document.head.appendChild(newLink);
      }
    };
    
    // Load the current favicon
    const currentFavicon = document.querySelector('link[rel="icon"]')?.href || 
                          document.querySelector('link[rel="shortcut icon"]')?.href || 
                          '/favicon.svg';
    img.src = currentFavicon;
  }
  
  // Add to window object for external access
  window.updateFavicon = updateFavicon;
  
  // Try to detect if we're on the demo page and update automatically
  const isDemoPage = window.location.pathname.includes('/demo');
  if (isDemoPage) {
    // Check local storage for demo count
    const usageCount = parseInt(localStorage.getItem('demoUsageCount') || '0', 10);
    const remainingCount = Math.max(0, 3 - usageCount);
    
    // Update favicon if we have a valid count
    if (remainingCount > 0 && remainingCount < 4) {
      updateFavicon(remainingCount);
    }
  }
})(); 