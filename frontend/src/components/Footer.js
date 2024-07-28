import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 py-6'>
      <div className='container mx-auto flex items-center justify-center space-x-4'>
        <a 
          href="https://github.com/your-profile" 
          className='text-gray-400 hover:text-white transition-colors duration-300'
          title='GitHub Profile'
        >
          <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.16 6.84 9.5.5.09.68-.22.68-.49v-1.78c-2.81.61-3.41-1.37-3.41-1.37-.46-1.16-1.13-1.47-1.13-1.47-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.91 1.56 2.38 1.11 2.96.85.09-.66.35-1.11.64-1.36-2.28-.26-4.69-1.14-4.69-5.08 0-1.12.4-2.05 1.06-2.77-.11-.26-.46-1.27.1-2.65 0 0 .87-.28 2.85 1.08.83-.23 1.73-.35 2.63-.35.9 0 1.8.12 2.63.35 1.98-1.36 2.85-1.08 2.85-1.08.57 1.38.21 2.39.1 2.65.66.72 1.06 1.65 1.06 2.77 0 3.94-2.42 4.81-4.7 5.07.36.31.68.91.68 1.82v2.71c0 .28.18.58.68.49C19.13 20.16 22 16.41 22 12c0-5.52-4.48-10-10-10z' />
          </svg>
        </a>
        <p className='text-white text-lg font-semibold uppercase tracking-widest'>
          MADE BY GAGAN
        </p>
        <a 
          href="https://linkedin.com/in/your-profile" 
          className='text-gray-400 hover:text-white transition-colors duration-300'
          title='LinkedIn Profile'
        >
          <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M22.23 0H1.77C.79 0 0 .79 0 1.77v20.46c0 .98.79 1.77 1.77 1.77h20.46c.98 0 1.77-.79 1.77-1.77V1.77c0-.98-.79-1.77-1.77-1.77zM7.06 20.45H3.73V9.1h3.33v11.35zm-1.66-12.9c-1.08 0-1.94-.89-1.94-1.99s.86-1.99 1.94-1.99 1.94.89 1.94 1.99-.86 1.99-1.94 1.99zm15.07 12.9h-3.34v-5.75c0-1.37-.03-3.14-1.91-3.14-1.91 0-2.21 1.49-2.21 2.98v5.91h-3.33V9.1h3.19v1.55h.04c.44-.83 1.51-1.71 3.11-1.71 3.33 0 3.95 2.19 3.95 5.04v6.47z' />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
