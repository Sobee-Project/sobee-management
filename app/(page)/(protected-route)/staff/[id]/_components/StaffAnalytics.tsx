import React from "react"

const StaffAnalytics = () => {
    const renderAnalytic = (title: string, value: string) => {
        return (
            <div className='flex justify-between overflow-hidden rounded-md border p-4 md:flex-wrap'>
                <p className='line-clamp-1 text-slate-500/70'>{title}</p>
                <h3 className='line-clamp-1 text-2xl font-semibold'>{value}</h3>
            </div>
        )
    }
    return (
        <div className='flex-1 rounded-lg bg-white p-4 shadow-md'>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 xl:gap-5 2xl:grid-cols-3 2xl:gap-7'>
                {renderAnalytic("Total Working Days", "100")}
                {renderAnalytic("Total Hours Worked", "800")}
                {renderAnalytic("Total Days Off", "5")}
                {renderAnalytic("Total salary", "400.000.000 VND")}
            </div>
        </div>
    )
}

export default StaffAnalytics
