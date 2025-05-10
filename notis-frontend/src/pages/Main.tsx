import { HelpCircle, Search } from "lucide-react";
import { Nav } from "../components/sections/Nav";
import { useState } from "react";
import { CaDataRender, GlobalDataRender, IndiaDataRenderer } from "../components/sections/Renderer";
import { IndiaDataFetcher } from "../components/apiCalls/IndiaDataFetcher";
import { RecoilRoot } from "recoil";
import { GlobalDataFetcher } from "../components/apiCalls/GlobalDataFetcher";
import { CaDataFetcher } from "../components/apiCalls/CaDataFetcher";

export const MainPage = () => {
    const [category, setCategory] = useState('India');

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
        console.log("Category updated in MainPage:", newCategory);
    };

    return (
        <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-500/15 to-black z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,70,0.3),rgba(0,0,0,0))] z-0" />

            <div className="relative z-10">
                <header className="px-6 lg:px-20 py-6">
                    <div className="flex items-center justify-between">
                        <div className="relative">
                            <div className="text-4xl font-bold text-white">
                                Notis<span className="text-blue-400">.</span>
                            </div>
                            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full -z-10"></div>

                        </div>

                        <Nav
                            currentCategory={category}
                            onCategoryChange={handleCategoryChange}
                        />
                    </div>
                </header>

                <main className="px-6 lg:px-20 mt-12">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            <span className="text-blue-400">{category}</span>
                        </h1>

                        <div className="mt-6">
                            {category === 'India' && (
                                <p className="text-xl text-gray-300">
                                    <IndiaDataFetcher />
                                    <IndiaDataRenderer />
                                </p>
                            )}
                            {category === 'Global' && (
                                <p className="text-xl text-gray-300">
                                    <GlobalDataFetcher />
                                    <GlobalDataRender />
                                </p>
                            )}
                            {category === 'Current Affairs' && (
                                <p className="text-xl text-gray-300">
                                    <CaDataFetcher />
                                    <CaDataRender />
                                </p>
                            )}
                        </div>
                    </div>
                </main>
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={() => alert("Floating button clicked!")}
                        className="w-14 h-14 rounded-full bg-black bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white shadow-xl flex items-center justify-center 
             transition-all duration-500 ease-in-out 
             hover:bg-gradient-to-br hover:from-blue-900 hover:via-blue-800 hover:to-blue-900 hover:shadow-blue-500/40"
                    >
                        <h2 className="font-bold text-2xl flex justify-center items-center">
                            N<span className="text-blue-400">.</span>  
                        </h2>
                    </button>

                </div>
            </div>
        </div>
    );
};
