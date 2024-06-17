import style from './Home.module.less'

function Home() {
    return (
        <div className={style.home}>
            <ExtraHoverImage/>
        </div>
    );
}

function ExtraHoverImage() {
    const mask = (
        <div className={style.background}
        >
            <h1>TECGUI BLOG</h1>
            <h2>技术创造未来</h2>
        </div>
    );

    return (
        <div>
            {mask}
            <div>
                <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg"
                     className="transition duration-300 ease-in-out delay-150">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                            <stop offset="5%" stop-color="#0693e3"></stop>
                            <stop offset="95%" stop-color="#0052d9"></stop>
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0,600 L 0,150 C 88.99521531100481,117.39712918660287 177.99043062200963,84.79425837320574 285,91 C 392.0095693779904,97.20574162679426 517.0334928229664,142.2200956937799 601,152 C 684.9665071770336,161.7799043062201 727.8755980861245,136.32535885167462 814,150 C 900.1244019138755,163.67464114832538 1029.4641148325359,216.47846889952152 1141,223 C 1252.5358851674641,229.52153110047848 1346.267942583732,189.76076555023923 1440,150 L 1440,600 L 0,600 Z"
                        stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.53"
                        className="transition-all duration-300 ease-in-out delay-150 path-0"></path>
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                            <stop offset="5%" stop-color="#0693e3"></stop>
                            <stop offset="95%" stop-color="#0052d9"></stop>
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0,600 L 0,350 C 113.90430622009566,356.12440191387554 227.80861244019133,362.24880382775115 319,363 C 410.1913875598087,363.75119617224885 478.66985645933016,359.12918660287085 566,369 C 653.3301435406698,378.87081339712915 759.5119617224879,403.2344497607656 853,415 C 946.4880382775121,426.7655502392344 1027.2822966507179,425.933014354067 1123,413 C 1218.7177033492821,400.066985645933 1329.358851674641,375.03349282296654 1440,350 L 1440,600 L 0,600 Z"
                        stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1"
                        className="transition-all duration-300 ease-in-out delay-150 path-1"></path>
                </svg>
            </div>
        </div>

    );
}

// <Image
//     src={background}
//     style={{width: '100vw', height: '100vh'}}
//     overlayContent={mask}
//     overlayTrigger="hover"
// />
export default Home;
