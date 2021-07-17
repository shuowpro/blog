import React from 'react'
function Header() {
  return (
    <header className="header fixed w-screen p-3 z-50 top-0 left-0">
      <div className="flex items-center justify-between flex-wrap container mx-auto px-2 container">
        <div className="flex items-center flex-shrink-0 text-white">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">我的博客</span>
        </div>
        <div className="text-white">画画</div>
      </div>
      <style jsx>{`
        .header {
          background: hsla(0, 0%, 30%, 0.5);
          backdrop-filter: saturate(180%) blur(8px);
        }
      `}</style>
    </header>
  )
}

export default Header
