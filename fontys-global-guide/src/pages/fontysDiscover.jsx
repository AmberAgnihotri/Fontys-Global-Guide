import { useState } from 'react';

// Import je eigen images
import imgMyron from '../../assets/man-silliouet-pasfoto.jpg';
import imgNathan from '../../assets/man-silliouet-pasfoto.jpg';
import imgShirin from '../../assets/vrouw-silliouet-pasfoto.jpg';

export default function FontysDiscover() {
    const [currentStory, setCurrentStory] = useState(0);

    const stories = [
        {
            title: "Nathan's Journey",
            text: "Als ICT student ontdekte ik mijn passie voor UI/UX design tijdens een minor project.",
            image: imgNathan
        },
        {
            title: "Myron's Experience",
            text: "Door Fontys Discover vond ik geweldige stageplekken en maakte ik verbinding met bedrijven.",
            image: imgMyron
        },
        {
            title: "Shirin's Story",
            text: "De campus events hielpen me om nieuwe vrienden te maken en mijn netwerk uit te breiden.",
            image: imgShirin
        }
    ];

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-5xl mx-auto border-2 border-black p-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Fontys discover</h1>
                </div>

                {/* Info Box */}
                <div className="border-2 border-black p-12 mb-8 text-center">
                    <p className="text-lg">Hier komt informatie over fontys</p>
                </div>

                {/* Three Column Section */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {stories.map((story, index) => (
                        <div
                            key={index}
                            className="border-2 border-black p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                        >
                            <img
                                src={story.image}
                                alt={story.title}
                                className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 flex-shrink-0"
                            />
                            <div className="text-left">
                                <h3 className="font-bold text-sm mb-2">{story.title}</h3>
                                <p className="text-xs leading-relaxed text-gray-700">
                                    {story.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Buttons */}
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={() => alert('Navigating to Expense Tracker...')}
                        className="flex-1 border-2 border-black py-3 text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                        EXPENSE TRACKER
                    </button>
                    <button
                        onClick={() => alert('Navigating to Fontys Discover...')}
                        className="flex-1 border-2 border-black py-3 text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                        FONTYS DISCOVER
                    </button>
                </div>

            </div>
        </div>
    );
}