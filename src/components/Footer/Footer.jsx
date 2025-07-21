// import React from 'react'

// function Footer() {
//   return (
//     <footer className="shadow fixed z-50 bottom-0 w-full">
//       <div className="bg-amber-400 text-white py-6">
//         <div className="flex flex-wrap justify-between items-center px-6 max-w-screen-xl mx-auto">
//           <div className="flex items-center">
//             <img src={logo} alt="Logo" className="mr-3 h-12 w-auto" />
//             <span className="text-lg font-semibold">MyBlog</span>
//           </div>
//           <div className="text-sm">
//             © {new Date().getFullYear()} MyBlog. All rights reserved.
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


// export default Footer

import React from 'react'
import logo from "../../assets/logo.png"
export default function Footer() {
  return (
    <footer className="bg-blue-400">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-wrap justify-between items-center px-6 max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="mr-3 h-12 w-auto" />
            <span className="text-lg font-semibold">PingMe</span>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} MyBlog. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}