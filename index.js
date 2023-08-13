// C:\d-files\gradious\React\Pranay-React-Assignment1\index.js

var contests;
window.onload = async function () {
    try {
        const res = await fetch("https://kontests.net/api/v1/all");
        //for get    js object is not required{header:, method....}


        if (!res.ok) {
            throw new Error('error in fetching contest details');
        }

        contests = await res.json();
        ReactDOM.render(<Page />, document.getElementById("root"));
        // render after fetching contest details

    }
    catch (e) {
        console.log(e);
    }

};

function getTimeUntilStart(start_time) {
    const now = new Date();
    const startTime = new Date(start_time);
    const timeDiff = startTime - now;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `starts in ${days} days ${hours} hrs ${minutes} mins`;
}

function getTimeUntilEnd(end_time) {
    const now = new Date();
    const endTime = new Date(end_time);
    const timeDiff = endTime - now;

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `ends in ${hours} hrs ${minutes} mins`;
}


function Card({ contest, duration }) {
    return (
        <div className="card">
            <div className="card-image">
                <img src={`./images/${contest.site}.png`} alt={contest.site} />
            </div>
            <div className="card-details">
                <p className="title-style" style={{ fontSize: "20px", fontWeight: "bold", textDecoration: "none" }}>
                    <a href={contest.url} style={{ fontSize: "150%", fontWeight: "bold", textDecoration: "none" }} target="_blank">{contest.name}</a>
                </p>
                <p>{duration}</p>
            </div>
        </div>
    );
}
function Ongoing() {
    // console.log("ongoing call")
    const ongoing = contests.filter(contest =>
        contest.status === "CODING" && parseInt(contest.duration) < 7201
        //contests with 2hrs duration only
    );
    // console.log("ongoing contests are...", ongoing)

    return (
        <div>
            <ul>
                {
                    (ongoing.length == 0) ? <p>No Ongoing Contests..</p> :
                        ongoing.map((contest, index) => (
                            <li key={index}>
                                <Card contest={contest} duration={getTimeUntilEnd(contest.end_time)} />
                            </li>
                        ))
                }
            </ul>
        </div>
    );
}

function Upcoming() {
    // console.log("UPCOMING CALL")
    const upcoming = contests.filter((contest) =>{
        const now = new Date();
        const startTime = new Date(contest.start_time);
        return contest.status === "BEFORE" && now<startTime;
    });

    return (
        <div>
            <ul>
                {
                    (upcoming.length == 0) ? <p>No Upcoming Contests..</p> :
                        upcoming.map((contest, index) => (
                            <li key={index}>
                                <Card contest={contest} duration={getTimeUntilStart(contest.start_time)} />
                            </li>
                        ))
                }
            </ul>
        </div>
    );
}

function Header() {
    return (
        <header >
            <nav className="header" >
                <img src="./images/logo.png" height="100%" className="header-logo" />
                <h1 style={{fontSize:"200%", fontFamily:"arial", fontWeight:"bold"}}>Contest Countdown</h1>
                <ul className="header-list">
                    <li className="list-item">About Us</li>
                    <li className="list-item">Contact Us</li>
                </ul>
            </nav>
        </header>
    )
}
function MainBody() {
    // console.log("main body is called")
    return (
        <div>
            <h1>Ongoing Contests</h1>
            <Ongoing />
            <h1>Upcoming Contests</h1>
            <Upcoming />
        </div>

    )
}
function Footer() {
    return (
        <footer className="footer">
            <small>© ContestCountdown 2024  |  All Rights Reserved..!</small>
        </footer>

    )
}
function Page() {

    return (
        <div className="container">
            <div className="inner-container">
                <Header />
                <MainBody />
                <Footer />
            </div>
        </div>

    )
}

