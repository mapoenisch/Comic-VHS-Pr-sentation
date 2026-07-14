import React, { useState, useEffect } from 'react';
import { slides } from '../data/slides';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ChevronLeft, ChevronRight, Play, Maximize, FileEdit } from 'lucide-react';
import { ExportToSlidesButton } from './ExportToSlidesButton';
import { motion, AnimatePresence } from 'motion/react';

export function SlideViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = slides[currentIndex];
  const progress = ((currentIndex + 1) / slides.length) * 100;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const renderContent = () => {
    return (
      <div className="flex flex-col gap-6 text-[#4A443D] text-lg md:text-xl lg:text-2xl leading-relaxed">
        {currentSlide.content.map((text, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 + 0.2 }}
            className="flex items-start gap-4"
          >
            {text.startsWith('•') ? (
              <span className="block">{text}</span>
            ) : text.match(/^[0-9]\./) ? (
              <span className="block font-medium text-[#C59B6D]">{text}</span>
            ) : (
              <span className="block">{text}</span>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderLayout = () => {
    switch (currentSlide.layout) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-12 relative overflow-hidden">
             {/* Decorative background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#F4F1E9] rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#EEEBE1] rounded-full blur-3xl" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="z-10"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#EEEBE1] text-[#5A5A40] rounded-full font-bold text-[10px] uppercase tracking-widest mb-8 border border-[#E2DED0]">
                <FileEdit className="w-4 h-4" />
                VHS Kurs
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-serif text-[#5A5A40] mb-12 tracking-tight flex flex-col gap-4">
                {currentSlide.title.split('–').map((part, i) => (
                  <span key={i} className={i === 1 ? "text-3xl md:text-5xl text-[#C59B6D] font-sans font-normal italic" : ""}>
                    {part.trim()}
                  </span>
                ))}
              </h1>
              <div className="space-y-2">
                <p className="text-xl md:text-2xl text-[#6B645A]">Dozentin: <span className="font-semibold text-[#5A5A40]">Christiane Pönisch</span></p>
                <p className="text-[#8C8273] uppercase tracking-wider text-sm font-semibold">Volkshochschule</p>
              </div>
            </motion.div>
          </div>
        );

      case 'text-only':
        return (
          <div className="flex flex-col h-full p-12 md:p-20 justify-center max-w-4xl mx-auto relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9F7F2] rounded-bl-full flex items-start justify-end p-6">
                <span className="font-serif italic text-4xl text-[#D1CABB]">
                  {currentSlide.id < 10 ? `0${currentSlide.id}` : currentSlide.id}
                </span>
             </div>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#5A5A40] mb-12 border-l-4 border-[#C59B6D] pl-6">
              {currentSlide.title}
            </h2>
            {renderContent()}
          </div>
        );

      case 'full-image':
         return (
          <div className="flex flex-col h-full p-12 md:p-16 text-center justify-center items-center relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9F7F2] rounded-bl-full flex items-start justify-end p-6">
                <span className="font-serif italic text-4xl text-[#D1CABB]">
                  {currentSlide.id < 10 ? `0${currentSlide.id}` : currentSlide.id}
                </span>
             </div>
            <h2 className="text-4xl md:text-6xl font-bold font-serif text-[#5A5A40] mb-8">
              {currentSlide.title}
            </h2>
            <div className="max-w-2xl mx-auto mb-12">
               {renderContent()}
            </div>
            <div className="w-full max-w-3xl aspect-video mx-auto h-[400px]">
              <ImagePlaceholder promptSuggestion={currentSlide.imagePromptSuggestion} />
            </div>
          </div>
        );

      case 'content-left':
      case 'content-right':
        const isLeft = currentSlide.layout === 'content-left';
        return (
          <div className="flex flex-col h-full p-10 md:p-16 relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9F7F2] rounded-bl-full flex items-start justify-end p-6">
                <span className="font-serif italic text-4xl text-[#D1CABB]">
                  {currentSlide.id < 10 ? `0${currentSlide.id}` : currentSlide.id}
                </span>
             </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#5A5A40] mb-12 flex items-center gap-4">
              {currentSlide.title}
            </h2>
            <div className={`flex flex-1 flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              <div className="flex-1 w-full h-full flex flex-col justify-center">
                {renderContent()}
              </div>
              <div className="flex-1 w-full h-full min-h-[300px]">
                <ImagePlaceholder promptSuggestion={currentSlide.imagePromptSuggestion} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-[#F9F7F2] text-[#2C2C2C] flex flex-col items-center justify-center overflow-hidden p-2 md:p-6 font-sans">
      
      {/* Main Slide Container */}
      <div className="w-full max-w-7xl aspect-[16/9] bg-[#FDFCF8] rounded-2xl shadow-xl border border-[#E2DED0] overflow-hidden relative flex flex-col">
        
        {/* Progress bar at top */}
        <div className="h-1.5 w-full bg-[#E2DED0]">
          <motion.div 
            className="h-full bg-[#C59B6D]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Slide Content Area */}
        <div className="flex-1 relative overflow-hidden bg-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {renderLayout()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Controls Overlay */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#5A5A40] p-2 rounded-2xl flex items-center gap-2 shadow-xl z-40 border border-[#5A5A40]">
        <button 
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="p-3 text-[#EEEBE1] hover:bg-white/10 rounded-xl disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="px-4 text-[#EEEBE1] font-mono font-medium text-sm">
          {currentIndex + 1} / {slides.length}
        </div>
        
        <button 
          onClick={nextSlide}
          disabled={currentIndex === slides.length - 1}
          className="p-3 text-[#EEEBE1] hover:bg-white/10 rounded-xl disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="w-px h-8 bg-white/20 mx-2" />
        
        <ExportToSlidesButton />

        <button 
          onClick={toggleFullscreen}
          className="p-3 text-[#EEEBE1] hover:bg-white/10 rounded-xl transition-colors"
          title="Vollbild"
        >
          <Maximize className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
