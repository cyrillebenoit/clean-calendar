import './App.css';

function getYearDays(year) {
    const date = new Date(year, 0, 1);
    const days = [];
    while (date.getFullYear() === year) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function DayBox(props) {
    const {highlight, grey, day, invisible} = props;


    return <div
        className={'day ' + (highlight ? ' highlight ' : ' ') + (grey ? ' grey ' : ' ') + (invisible ? ' invisible ' : ' ')}>{day.getDate()}</div>;
}

function QuarterBox({quarter}) {
    return <div className={'quarter-cell'}>Q{quarter + 1}</div>;
}

function MonthBox({month}) {
    let months = [
        'Jan',
        'Fév',
        'Mar',
        'Avr',
        'Mai',
        'Jui',
        'Jui',
        'Aoû',
        'Sep',
        'Oct',
        'Nov',
        'Déc',
    ]
    return <div className={'month-cell'}>{months[month]}</div>
}

function App() {
    const year = 2023;
    const days = getYearDays(year);
    const rows = [];

    let added = 0;
    let i = 0;
    let row = [];

    // first day offset
    for (let j = (days[0].getDay() + 7 - 1) % 7; j > 0; j--) {
        const movingDate = new Date(days[0])
        movingDate.setDate(movingDate.getDate() - j)
        row.push(movingDate)
        i++;
    }

    for (let day of days) {
        row.push(day);
        if (++i % 14 === 0) {
            added += 14;
            rows.push(row);
            row = [];
            i = 0;
        }
    }

    // end of year offset
    if (added !== days.length) {
        for (let j = 0; j < 14 - i; j++) {
            const movingDate = new Date(days[days.length - 1])
            movingDate.setDate(movingDate.getDate() + j + 1)
            row.push(movingDate)
        }
        rows.push(row)
    }

    const headers = [
        'L',
        'M',
        'M',
        'J',
        'V',
        'S',
        'D',
        'L',
        'M',
        'M',
        'J',
        'V',
        'S',
        'D',
    ]

    return (
        <div className={'container'}>
            <div className={'year-name'}>{year}</div>
            <table className={'calendar'}>
                <tr className={'calendar-head'}>
                    <th/>
                    <th/>
                    {headers.map((h, i) => <th className={'day-head'} key={i}>{h}</th>)}
                </tr>
                {rows.map((r, i) => {
                    let month = r.find(e => e.getDate() === 1 && e.getFullYear() === year);
                    let newMonth = month !== undefined;
                    console.log(i, newMonth)
                    let number = month && month.getMonth() / 3;
                    let newQuarter = newMonth ? Math.floor(number) === number : false;
                    return <tr className={'calendar-row'} key={i}>
                        <td className={'no-padding'}>{newQuarter && <QuarterBox quarter={Math.floor(number)}/>}</td>
                        <td className={'no-padding left-columns'}>{newMonth &&
                            <MonthBox month={month.getMonth()}/>}</td>
                        {
                            r.map((d, j) => <td className={'day-cell'} key={j}><DayBox highlight={d.getDate() === 1}
                                                                                       invisible={d.getFullYear() !== year}
                                                                                       grey={d.getDay() === 6 || d.getDay() === 0}
                                                                                       day={d}/></td>)
                        }
                    </tr>
                })}
            </table>
        </div>
    );
}

export default App;
