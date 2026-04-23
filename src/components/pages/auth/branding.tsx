

import { FileCode2 } from 'lucide-react';

const Branding = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 p-12 flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <FileCode2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-white text-2xl">DocGen</h1>
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <h2 className="text-white text-4xl leading-tight">
          AI-Powered Documentation
          <br />
          That Writes Itself
        </h2>
        <p className="text-white/80 text-lg max-w-md">
          Transform your codebase with intelligent, automated documentation.
          Powered by advanced AI to understand and document your code perfectly.
        </p>

        <div className="flex gap-8 pt-4">
          <div>
            <div className="text-white text-3xl">10K+</div>
            <div className="text-white/70">Files Documented</div>
          </div>
          <div>
            <div className="text-white text-3xl">500+</div>
            <div className="text-white/70">Teams</div>
          </div>
          <div>
            <div className="text-white text-3xl">99%</div>
            <div className="text-white/70">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
    </div>
  );
}

export default Branding;
