import React, { useState, useEffect } from "react";


export const useDate = (events, nav, eventForDate) => {
    const [dateDisplay, setDateDisplay] = useState('');
    const [days, setDays] = useState([]);

    useEffect(() => {
        const dt = new Date();

        dt.setMonth(dt.getMonth() + nav);

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const paddingDays = firstDayOfMonth.getDay();

        setDateDisplay(`${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`);

        const daysArr = [];
        for(let i = 1; i <= paddingDays + daysInMonth; i++) {
            const dayString = new Date(year, month, i - paddingDays).toLocaleDateString();

            if (i > paddingDays) {
                daysArr.push({
                    value: i - paddingDays,
                    event: eventForDate(dayString),
                    isCurrentDay: i - paddingDays === day && nav === 0,
                    date: dayString,
                });
            } else {
                daysArr.push({
                    value: 'padding',
                    event: null,
                    isCurrentDay: false,
                    date: '',
                });
            }
        }

        setDays(daysArr);

    }, [events, nav]);

    return {
        days,
        dateDisplay,
    };
};