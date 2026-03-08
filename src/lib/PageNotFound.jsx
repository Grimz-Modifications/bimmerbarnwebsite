import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <div className="mb-6 flex justify-center">
          <AlertCircle className="w-20 h-20 text-neutral-800" />
        </div>
        
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
          404: Page Lost
        </h1>
        
        <p className="text-neutral-400 mb-8 leading-relaxed">
          The part you're looking for isn't in our catalog. It might have been moved or deleted.
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Garage
        </Link>
      </div>
    </div>
  );
}