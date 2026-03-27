import React from 'react';

/**
 * Advanced Skeleton Component
 * Uses CSS variables for staggered animation timing and refined radial gradients 
 * for a more realistic "shimmer" light sweep.
 */
const Skeleton = ({ className = '', variant = 'rect', index = 0 }) => {
    const baseClasses = "relative overflow-hidden bg-slate-50 border border-slate-200/40";

    // Custom styles for controlled staggered animation based on index
    const style = {
        '--delay': `${index * 0.1}s`,
    };

    return (
        <div
            className={`${baseClasses} ${className}`}
            style={style}
        >
            <div className="absolute inset-0 -translate-x-full animate-[advancedShimmer_2s_infinite_linear] [animation-delay:var(--delay)]
             bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />
        </div>
    );
};

const Skeleton_ = () => {
    return (
        <div className="flex h-screen w-full bg-[#fcfdfe] text-slate-900 antialiased overflow-hidden">
            {/* Advanced Shimmer Keyframes */}
            <style>{`
        @keyframes advancedShimmer {
          0% { transform: translateX(-100%); opacity: 0.5; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0.5; }
        }
      `}</style>

            {/* Sidebar Navigation */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-6 shrink-0">
                <div className="flex items-center gap-3 mb-10">
                    <Skeleton className="w-9 h-9 rounded-xl" index={0} />
                    <Skeleton className="w-28 h-5 rounded-lg" index={1} />
                </div>

                <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="w-16 h-2.5 rounded-xl opacity-40 mb-2" index={2} />
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="w-full h-10 rounded-xl" index={i + 3} />
                        ))}
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="w-20 h-2.5 rounded-xl opacity-40 mb-2" index={6} />
                        {[...Array(2)].map((_, i) => (
                            <Skeleton key={i} className="w-full h-10 rounded-xl" index={i + 7} />
                        ))}
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" index={9} />
                    <div className="space-y-2">
                        <Skeleton className="w-24 h-3 rounded-full" index={10} />
                        <Skeleton className="w-16 h-2 rounded-full opacity-50" index={11} />
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6 md:p-10">

                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div className="space-y-3">
                        <Skeleton className="w-64 h-9 rounded-xl" index={0} />
                        <Skeleton className="w-40 h-3 rounded-full opacity-40" index={1} />
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-10 h-10 rounded-full" index={2} />
                        <Skeleton className="w-36 h-10 rounded-xl" index={3} />
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl space-y-5 shadow-sm shadow-slate-200/50">
                            <Skeleton className="w-10 h-10 rounded-xl" index={i} />
                            <div className="space-y-2">
                                <Skeleton className="w-16 h-2.5 rounded-full opacity-40" index={i + 1} />
                                <Skeleton className="w-28 h-8 rounded-lg" index={i + 2} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-end h-80 px-4">
                            {[...Array(12)].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="w-full mx-1 rounded-t-lg"
                                    style={{ height: `${20 + Math.random() * 60}%` }}
                                    index={i}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between px-2">
                            {[...Array(6)].map((_, i) => <Skeleton key={i} className="w-12 h-2 rounded-full opacity-30" index={i} />)}
                        </div>
                    </div>
                    <Skeleton className="h-[22rem] rounded-[2.5rem]" index={5} />
                </div>

                {/* Table Section */}
                <section className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm shadow-slate-200/50">
                    <div className="px-8 py-7 border-b border-slate-50 flex justify-between items-center">
                        <Skeleton className="w-48 h-6 rounded-lg" index={0} />
                        <div className="flex gap-2">
                            <Skeleton className="w-8 h-8 rounded-lg" index={1} />
                            <Skeleton className="w-8 h-8 rounded-lg" index={2} />
                        </div>
                    </div>

                    <div className="px-8">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`flex items-center justify-between py-6 ${i !== 4 ? 'border-b border-slate-100/50' : ''}`}>
                                <div className="flex items-center gap-5">
                                    <Skeleton className="w-11 h-11 rounded-xl" index={i} />
                                    <div className="space-y-2.5">
                                        <Skeleton className="w-44 h-3.5 rounded-full" index={i + 1} />
                                        <Skeleton className="w-28 h-2.5 rounded-full opacity-40" index={i + 2} />
                                    </div>
                                </div>
                                <div className="hidden md:flex gap-12">
                                    <Skeleton className="w-24 h-3 rounded-full opacity-60" index={i + 3} />
                                    <Skeleton className="w-20 h-3 rounded-full opacity-60" index={i + 4} />
                                </div>
                                <Skeleton className="w-16 h-7 rounded-full" index={i + 5} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Skeleton_;