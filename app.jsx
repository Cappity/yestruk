import React, { useState, useEffect, useRef } from 'react';
import { Heart, Camera, MessageCircle, Gift, TreePine, ArrowRight, Home } from 'lucide-react';

const App = () => {
  // Define different pages for navigation
  const PAGES = {
    WELCOME: 'welcome',
    PHOTOS: 'photos',
    HEART_TREE: 'heart_tree',
    MESSAGE: 'message',
    SURPRISE: 'surprise',
  };

  // State to manage the current page and typewriter effect
  const [currentPage, setCurrentPage] = useState(PAGES.WELCOME);
  const [typedMessage, setTypedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  // A list of placeholder image URLs.
  // Replace these with your own images!
  const photos = [
    'https://images.unsplash.com/photo-1549419163-548981b997c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3MHwwfDF8c2VhcmNofDE3fHxjb3VwbGV8ZW58MHx8fHwxNjQ3MjI3MzE3&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1517721867140-5e3656104353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3MHwwfDF8c2VhcmNofDM5fHxjb3VwbGV8ZW58MHx8fHwxNjQ3MjI3MzQ2&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1520649722336-d4190c1e8745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3MHwwfDF8c2VhcmNofDExMHx8Y291cGxlfGVufDB8fHwxNjQ3MjI3NDA5&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1549298539-c5c24e0b3c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3MHwwfDF8c2VhcmNofDIwM3x8Y291cGxlfGVufDB8fHwxNjQ3MjI3NDc4&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1521742468305-6187b5a266ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3MHwwfDF8c2VhcmNofDIxMnx8Y291cGxlfGVufDB8fHwxNjQ3MjI3NDgx&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1529158309191-0305f8849646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3MHwwfDF8c2VhcmNofDYxMnx8Y291cGxlfGVufDB8fHwxNjQ3MjI3NTUy&ixlib=rb-12.1&q=80&w=400',
    'https://images.unsplash.com/photo-1506197369986-90c7493a3885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3MHwwfDF8c2VhcmNofDIyMXx8Y291cGxlfGVufDB8fHwxNjQ3MjI3NDg5&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1550882772-a169b0051e06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3MHwwfDF8c2VhcmNofDE3NXx8Y291cGxlfGVufDB8fHwxNjQ3MjI3NDcxfDQ&ixlib=rb-1.2.1&q=80&w=400',
  ];

  // The custom message for the typewriter effect.
  // You can change this to your own heartfelt message!
  const messageText = "My dearest [Her Name], from the moment we met, you've painted my world with so much love and laughter. This day is a reminder of how lucky I am to have you. You are my greatest adventure, my beautiful safe harbor, and the best part of my every day. Thank you for being my love. Happy Girlfriend's Day!";

  // Function to simulate the typewriter effect
  useEffect(() => {
    if (currentPage === PAGES.MESSAGE && !isTyping) {
      setTypedMessage(''); // Clear previous message
      let i = 0;
      const interval = setInterval(() => {
        setTypedMessage(messageText.substring(0, i + 1));
        i++;
        if (i === messageText.length) {
          clearInterval(interval);
          setIsTyping(true);
        }
      }, 50); // Adjust typing speed here
      return () => clearInterval(interval);
    }
  }, [currentPage, isTyping, messageText]);

  // Function to trigger the confetti animation
  useEffect(() => {
    if (isConfettiActive) {
      const confettiColors = ['#ffc0cb', '#87ceeb', '#90ee90', '#ffd700'];
      const createConfetti = () => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        document.body.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 3000);
      };

      for (let i = 0; i < 100; i++) {
        setTimeout(createConfetti, Math.random() * 1000);
      }
      setTimeout(() => setIsConfettiActive(false), 3000);
    }
  }, [isConfettiActive]);

  // --- UI Components ---
  
  // Custom button component
  const ActionButton = ({ onClick, children, icon: Icon, className = '' }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg transform transition-all duration-300
      bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700
      hover:scale-105 active:scale-95 ${className}`}
    >
      <span>{children}</span>
      {Icon && <Icon size={24} />}
    </button>
  );

  // Navigation bar at the top
  const NavBar = () => (
    <div className="absolute top-0 left-0 right-0 z-20 flex justify-center p-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentPage(PAGES.WELCOME)}
          className="p-3 bg-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Home className="text-gray-600" />
        </button>
      </div>
    </div>
  );

  // Welcome Page component
  const WelcomePage = () => (
    <div className="flex flex-col items-center text-center p-8 animate-fade-in">
      <Heart className="w-24 h-24 text-red-500 animate-pulse-slow mb-6" />
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tight mb-4 animate-slide-in-up">
        Happy Girlfriend's Day, My Love!
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in-delay">
        This is a little journey, just for you.
      </p>
      <ActionButton onClick={() => setCurrentPage(PAGES.PHOTOS)} icon={ArrowRight}>
        Begin our adventure
      </ActionButton>
    </div>
  );

  // Photos Page component
  const PhotosPage = () => (
    <div className="flex flex-col items-center p-4 md:p-8 animate-fade-in">
      <div className="flex items-center space-x-4 mb-8">
        <Camera className="w-12 h-12 text-purple-600" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          A Look Back at Our Best Moments
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl">
        {photos.map((url, index) => (
          <div
            key={index}
            className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={url}
              alt={`A photo of us, memory ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/400x400/D1D5DB/4B5563?text=Photo%20${index + 1}`;
              }}
            />
          </div>
        ))}
      </div>
      <ActionButton onClick={() => setCurrentPage(PAGES.HEART_TREE)} className="mt-12" icon={ArrowRight}>
        Continue to the next surprise
      </ActionButton>
    </div>
  );

  // Heart Tree Animation Page
  const HeartTreePage = () => {
    const canvasRef = useRef(null);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const treeData = useRef(null); // Stores the pre-calculated tree structure
    const hearts = useRef([]); // Stores all the heart objects

    // Function to draw a single heart on the canvas
    const drawHeart = (ctx, x, y, size, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#ff69b4';
      ctx.beginPath();
      // Heart shape using bezier curves
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x + size / 2, y - size / 2, x + size, y, x, y + size);
      ctx.bezierCurveTo(x - size, y, x - size / 2, y - size / 2, x, y + size / 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Recursive function to generate the tree branches and store them
    const generateTree = (startX, startY, endX, endY, depth, maxDepth, branches = []) => {
      branches.push({ startX, startY, endX, endY, depth });

      if (depth >= maxDepth) return;
      
      const branchLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      const angle = Math.atan2(endY - startY, endX - startX);

      // Create two new branches from the current endpoint
      const newBranchLength = branchLength * (0.7 + Math.random() * 0.2);
      const newAngle1 = angle - Math.PI / 6 + (Math.random() - 0.5) * 0.2;
      const newEndX1 = endX + newBranchLength * Math.cos(newAngle1);
      const newEndY1 = endY + newBranchLength * Math.sin(newAngle1);
      generateTree(endX, endY, newEndX1, newEndY1, depth + 1, maxDepth, branches);

      const newAngle2 = angle + Math.PI / 6 + (Math.random() - 0.5) * 0.2;
      const newEndX2 = endX + newBranchLength * Math.cos(newAngle2);
      const newEndY2 = endY + newBranchLength * Math.sin(newAngle2);
      generateTree(endX, endY, newEndX2, newEndY2, depth + 1, maxDepth, branches);
      return branches;
    };

    // Main animation effect hook
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;
      let treeAnimationProgress = 0; // Controls the drawing of the tree
      let heartSpawnProgress = 0; // Controls the spawning of hearts
      const MAX_HEARTS = 50;

      // Generate the full tree structure only once
      if (!treeData.current) {
        treeData.current = generateTree(0, 0, 0, -100, 0, 5);
      }

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height);
        
        // Phase 1: Grow the tree
        if (treeAnimationProgress < 1) {
          treeAnimationProgress += 0.008; // Control tree growth speed
          const branchesToDraw = Math.floor(treeData.current.length * treeAnimationProgress);
          
          for (let i = 0; i < branchesToDraw; i++) {
            const branch = treeData.current[i];
            ctx.beginPath();
            ctx.moveTo(branch.startX, branch.startY);
            ctx.lineTo(branch.endX, branch.endY);
            ctx.lineWidth = 10 * (1 - branch.depth / 5);
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#6d4c41';
            ctx.stroke();
          }
        } else {
          // Phase 2: Tree is fully grown, draw it statically and start spawning hearts
          treeData.current.forEach(branch => {
            ctx.beginPath();
            ctx.moveTo(branch.startX, branch.startY);
            ctx.lineTo(branch.endX, branch.endY);
            ctx.lineWidth = 10 * (1 - branch.depth / 5);
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#6d4c41';
            ctx.stroke();
          });

          if (heartSpawnProgress < MAX_HEARTS) {
            // Spawn a new heart
            const branch = treeData.current[Math.floor(Math.random() * treeData.current.length)];
            hearts.current.push({
              x: branch.endX,
              y: branch.endY,
              size: 0,
              targetSize: 10 + Math.random() * 10,
              opacity: 0,
              vy: -0.5 - Math.random() * 0.5,
              vx: (Math.random() - 0.5) * 1,
              isSpawning: true,
            });
            heartSpawnProgress++;
          }
        }
        ctx.restore();

        // Animate all existing hearts
        hearts.current = hearts.current.filter(heart => heart.opacity > 0);
        hearts.current.forEach(heart => {
          if (heart.isSpawning) {
            heart.size = Math.min(heart.targetSize, heart.size + 0.5);
            heart.opacity = Math.min(1, heart.opacity + 0.05);
            if (heart.size >= heart.targetSize && heart.opacity >= 1) {
              heart.isSpawning = false;
            }
          }
          
          heart.y += heart.vy;
          heart.x += heart.vx;
          
          // Fade out as the heart floats away
          if (heart.y < -canvas.height / 2) {
            heart.opacity -= 0.02;
          }

          drawHeart(ctx, canvas.width / 2 + heart.x, canvas.height + heart.y, heart.size, heart.opacity);
        });

        // Check if all hearts have been spawned and have faded away
        if (treeAnimationProgress >= 1 && heartSpawnProgress >= MAX_HEARTS && hearts.current.length === 0) {
          setAnimationComplete(true);
        } else {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      
      animationFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resizeCanvas);
      };
    }, []);

    // Show the "Continue" button once the animation is complete
    useEffect(() => {
      if (animationComplete) {
        const timer = setTimeout(() => {
          setShowNextButton(true);
        }, 1000); // Wait 1 second before showing the button
        return () => clearTimeout(timer);
      }
    }, [animationComplete]);

    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-transparent"></canvas>
        <div className="relative z-10 text-center animate-fade-in-delay-2">
          <TreePine className="w-24 h-24 text-green-700 mx-auto mb-4 animate-bounce-slow" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Our Love Story...
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mt-2">
            A tree filled with all my love for you.
          </p>
        </div>
        {showNextButton && (
          <div className="relative z-10 mt-12 animate-pop-in">
            <ActionButton onClick={() => setCurrentPage(PAGES.MESSAGE)} icon={ArrowRight}>
              Continue to the message
            </ActionButton>
          </div>
        )}
      </div>
    );
  };

  // Message Page component
  const MessagePage = () => (
    <div className="flex flex-col items-center text-center p-8 animate-fade-in">
      <div className="flex items-center space-x-4 mb-8">
        <MessageCircle className="w-12 h-12 text-pink-600" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          A Message from My Heart
        </h2>
      </div>
      <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-xl border-t-4 border-b-4 border-pink-400">
        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-serif whitespace-pre-wrap">
          {typedMessage}
          <span className="animate-blink">|</span>
        </p>
      </div>
      {isTyping && (
        <ActionButton onClick={() => setCurrentPage(PAGES.SURPRISE)} className="mt-12" icon={Gift}>
          One Final Surprise!
        </ActionButton>
      )}
    </div>
  );

  // Surprise Page component
  const SurprisePage = () => {
    useEffect(() => {
      setIsConfettiActive(true);
    }, []);

    return (
      <div className="relative flex flex-col items-center text-center p-8 animate-fade-in min-h-screen">
        <div className="absolute inset-0 z-0">
          {/* Confetti effect using CSS keyframes */}
          <style>
            {`
              @keyframes confetti-fall {
                0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
              }
              .confetti {
                position: fixed;
                width: 10px;
                height: 10px;
                background-color: #f0f;
                border-radius: 50%;
                opacity: 0;
                animation: confetti-fall 3s ease-in-out forwards;
              }
              .confetti::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 7px;
                height: 7px;
                background-color: #ff0;
                border-radius: 50%;
                transform: translate(-50%, -50%);
              }
              .confetti::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 5px;
                height: 5px;
                background-color: #0ff;
                border-radius: 50%;
                transform: translate(-50%, -50%);
              }
            `}
          </style>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <Gift className="w-24 h-24 text-green-500 animate-bounce-slow mb-6" />
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tight animate-pop-in">
            I Love You!
          </h2>
          <p className="text-2xl md:text-3xl text-gray-600 mt-4 animate-fade-in-delay-2">
            You make every day better just by being in it.
          </p>
          <div className="mt-12">
            <ActionButton onClick={() => setCurrentPage(PAGES.WELCOME)}>
              Start Again?
            </ActionButton>
          </div>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case PAGES.WELCOME:
        return <WelcomePage />;
      case PAGES.PHOTOS:
        return <PhotosPage />;
      case PAGES.HEART_TREE:
        return <HeartTreePage />;
      case PAGES.MESSAGE:
        return <MessagePage />;
      case PAGES.SURPRISE:
        return <SurprisePage />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-purple-100 to-indigo-100 font-inter text-gray-800 p-4 md:p-12 flex items-center justify-center">
      {/* Container with a floating, rounded effect */}
      <div className="bg-white p-6 md:p-12 rounded-3xl shadow-2xl max-w-full lg:max-w-7xl mx-auto w-full transition-all duration-500 transform hover:scale-[1.01] relative z-10">
        <NavBar />
        {/* CSS for animations */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Playfair+Display:wght@400;700&display=swap');
            .font-inter { font-family: 'Inter', sans-serif; }
            .font-serif { font-family: 'Playfair Display', serif; }

            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fadeIn 1s ease-in-out forwards;
            }
            .animate-fade-in-delay {
              animation: fadeIn 1s ease-in-out 1s forwards;
              opacity: 0;
            }
            .animate-fade-in-delay-2 {
              animation: fadeIn 1s ease-in-out 1.5s forwards;
              opacity: 0;
            }

            @keyframes pulseSlow {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            .animate-pulse-slow {
              animation: pulseSlow 3s infinite ease-in-out;
            }

            @keyframes slideInUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            .animate-slide-in-up {
              animation: slideInUp 0.8s ease-out forwards;
            }

            @keyframes popIn {
              0% { transform: scale(0.5); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-pop-in {
              animation: popIn 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
            }

            @keyframes blink {
              50% { opacity: 0; }
            }
            .animate-blink {
              animation: blink 1s step-end infinite;
            }

            @keyframes bounceSlow {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
            .animate-bounce-slow {
              animation: bounceSlow 2s infinite ease-in-out;
            }
          `}
        </style>
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
