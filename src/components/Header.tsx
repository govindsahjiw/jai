// import React, { useState, useEffect } from "react";
// import { FaAngular, FaNodeJs, FaReact, FaRobot } from "react-icons/fa";
// import { HiCode } from "react-icons/hi";
// import { FiMenu, FiX } from "react-icons/fi";
// import { useParamsContext } from "@/context/PageContext";

// // Define icon mapping
// const iconMap: Record<string, React.ElementType> = {
//   FaAngular,
//   FaNodeJs,
//   FaReact,
//   FaRobot,
//   HiCode,
// };

// // Define the MenuItem type
// interface MenuItem {
//   name: string;
//   icon: string;
//   url: string;
//   color?: string;
// }

// const Header: any = ({setSelectedItem}:any) => {
//   const {setSelectedPage} = useParamsContext();
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     fetch(
//       "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjtrmWRrx3ddsR8ZpP7AStChhnRj6D3l5qbxzm5VrRmcmwacWQrV6KAssrggrVu69HX526HYD1kgGL6bxHtVYovIC5X8ezwToCLrb3UmlbswiL3yytiVay7bN6iX-U3MoIiDrAj25Eb4k4th6clMfo4D8zUXLxNrEpWQX01OlGQtWC3h9j1eojWECqLAq9dodaICrkppCJPzXFIYFaUYG7T2uO001JyPy2VXuiV5LkaWm6hgWK6WWsGVBJBtICLuufYYHMOs2GpaxKrPbIAdvSRBs70R9xwU0vFZAAo&lib=MlhqZVQ7trLZ4_nyPCS4HqCx8ZFlIpigL"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setMenuItems(data.home?.headermenu || []);
//       })
//       .catch((error) => console.error("Error fetching menu items:", error));
//   }, []);

//   const selectedPage = (item:any)=>{
//     console.log("selected", item);
//     setSelectedPage({pageName: item});
//   }  

//   return (
//     <header className="bg-white sticky top-0 z-50 shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col items-center py-4">
//           {/* Desktop Menu */}
//           <nav className="hidden md:flex space-x-4">
//             {menuItems.map((item, index) => {
//               const IconComponent = iconMap[item.icon] || null;
            
//               return (
//                 <div
//                   key={index} 
//                   onClick={()=>selectedPage(item.name)}
//                   className="flex items-center px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   {IconComponent && (
//                     <IconComponent className={`${item.color || "text-gray-700"} mr-2`} />
//                   )}
//                   {item.name}
//                 </div>
//               );
//             })}
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100 mt-2"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden pb-4 border-t flex justify-center">
//             <div className="flex flex-col items-center space-y-2">
//               {menuItems.map((item, index) => {
//                 const IconComponent = iconMap[item.icon] || null;
//                 return (
//                   <a
//                     key={index}
//                     href={item.url}
//                     className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     {IconComponent && (
//                       <IconComponent className={`${item.color || "text-gray-700"} mr-3`} />
//                     )}
//                     {item.name}
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>

//   );
// };

// export default Header;

"use client"

import React, { useState, useEffect } from "react";
import { FaAngular, FaNodeJs, FaReact, FaRobot } from "react-icons/fa";
import { HiCode } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";
import { useParamsContext } from "@/context/PageContext";

// Define icon mapping
const iconMap: Record<string, React.ElementType> = {
  FaAngular,
  FaNodeJs,
  FaReact,
  FaRobot,
  HiCode,
};

// Define the MenuItem type
interface MenuItem {
  name: string;
  icon: string;
  url: string;
  color?: string;
}

const Header: React.FC<any> = ({ setSelectedItem }) => {
  const { setSelectedPage } = useParamsContext();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjtrmWRrx3ddsR8ZpP7AStChhnRj6D3l5qbxzm5VrRmcmwacWQrV6KAssrggrVu69HX526HYD1kgGL6bxHtVYovIC5X8ezwToCLrb3UmlbswiL3yytiVay7bN6iX-U3MoIiDrAj25Eb4k4th6clMfo4D8zUXLxNrEpWQX01OlGQtWC3h9j1eojWECqLAq9dodaICrkppCJPzXFIYFaUYG7T2uO001JyPy2VXuiV5LkaWm6hgWK6WWsGVBJBtICLuufYYHMOs2GpaxKrPbIAdvSRBs70R9xwU0vFZAAo&lib=MlhqZVQ7trLZ4_nyPCS4HqCx8ZFlIpigL"
    )
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data.home?.headermenu || []);
      })
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

  // Here, we pass item.url instead of item.name.
  const selectedPage = (item: any) => {
    console.log("Selected", item);
    setSelectedPage({ pageName: item }); 
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center py-4">
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item, index) => {
              const IconComponent = iconMap[item.icon] || null;
              return (
                <div
                  key={index}
                  onClick={() => selectedPage(item.url)} // Pass URL to update context
                  className="cursor-pointer flex items-center px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {IconComponent && (
                    <IconComponent className={`${item.color || "text-gray-700"} mr-2`} />
                  )}
                  {/* You can display item.name or item.url as needed */}
                  {item.name}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100 mt-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t flex justify-center">
            <div className="flex flex-col items-center space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = iconMap[item.icon] || null;
                return (
                  <a
                    key={index}
                    href={item.url}
                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {IconComponent && (
                      <IconComponent className={`${item.color || "text-gray-700"} mr-3`} />
                    )}
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


// import React, { useState, useEffect } from "react";
// import { FaAngular, FaNodeJs, FaReact, FaRobot } from "react-icons/fa";
// import { HiCode } from "react-icons/hi";
// import { FiMenu, FiX } from "react-icons/fi";
// import { useParamsContext } from "@/context/PageContext";

// // Define icon mapping
// const iconMap: Record<string, React.ElementType> = {
//   FaAngular,
//   FaNodeJs,
//   FaReact,
//   FaRobot,
//   HiCode,
// };

// // Define the MenuItem type
// interface MenuItem {
//   name: string;
//   icon: string;
//   url: string;
//   color?: string;
// }

// const Header: React.FC<any> = ({ setSelectedItem }) => {
//   const { setSelectedPage } = useParamsContext();
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     fetch(
//       "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjtrmWRrx3ddsR8ZpP7AStChhnRj6D3l5qbxzm5VrRmcmwacWQrV6KAssrggrVu69HX526HYD1kgGL6bxHtVYovIC5X8ezwToCLrb3UmlbswiL3yytiVay7bN6iX-U3MoIiDrAj25Eb4k4th6clMfo4D8zUXLxNrEpWQX01OlGQtWC3h9j1eojWECqLAq9dodaICrkppCJPzXFIYFaUYG7T2uO001JyPy2VXuiV5LkaWm6hgWK6WWsGVBJBtICLuufYYHMOs2GpaxKrPbIAdvSRBs70R9xwU0vFZAAo&lib=MlhqZVQ7trLZ4_nyPCS4HqCx8ZFlIpigL"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setMenuItems(data.home?.headermenu || []);
//       })
//       .catch((error) => console.error("Error fetching menu items:", error));
//   }, []);

//   // Update selected page with the url instead of the name.
//   const selectedPage = (item: any) => {
//     console.log("selected", item);
//     setSelectedPage({ pageName: item }); // now you pass url instead of name
//   };

//   return (
//     <header className="bg-white sticky top-0 z-50 shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col items-center py-4">
//           {/* Desktop Menu */}
//           <nav className="hidden md:flex space-x-4">
//             {menuItems.map((item, index) => {
//               const IconComponent = iconMap[item.icon] || null;
//               return (
//                 <div
//                   key={index}
//                   onClick={() => selectedPage(item.url)} // Changed from item.name to item.url
//                   className="flex items-center px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   {IconComponent && (
//                     <IconComponent className={`${item.color || "text-gray-700"} mr-2`} />
//                   )}
//                   {item.name}
//                 </div>
//               );
//             })}
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100 mt-2"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden pb-4 border-t flex justify-center">
//             <div className="flex flex-col items-center space-y-2">
//               {menuItems.map((item, index) => {
//                 const IconComponent = iconMap[item.icon] || null;
//                 return (
//                   <a
//                     key={index}
//                     href={item.url}
//                     className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     {IconComponent && (
//                       <IconComponent className={`${item.color || "text-gray-700"} mr-3`} />
//                     )}
//                     {item.name}
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
